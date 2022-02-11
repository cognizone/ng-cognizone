import { Injectable } from '@angular/core';
import { notNil } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlat, JsonModelFlatGraph, JsonModelService } from '@cognizone/json-model';
import { Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import produce from 'immer';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

import { NodeRecipe } from '../models/node-recipe';
import { RemoveGraph, Reset, SetGraph, UpdateNode } from '../store/graph.actions';
import { GRAPH_STATE_TOKEN, GraphStateModel } from '../store/graph.state';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  state$: Observable<GraphStateModel> = this.store.select(GRAPH_STATE_TOKEN);

  private copyCount = 0;

  get state(): GraphStateModel {
    return this.store.selectSnapshot(GRAPH_STATE_TOKEN);
  }

  constructor(private store: Store, private logger: Logger, private jsonModelService: JsonModelService) {
    this.logger = this.logger.extend('GraphService');
  }

  hasGraph(rootUri: string): boolean {
    return this.state.graphs[rootUri] != null;
  }

  getGraph<T extends JsonModelFlatGraph>(rootUri: string): Observable<T> {
    return this.state$.pipe(
      map(state => state.graphs[rootUri]?.graph as T),
      filter(notNil),
      distinctUntilChanged()
    );
  }

  getNode<T extends JsonModel>(rootUri: string, nodeUri: string): Observable<JsonModelFlat<T>> {
    return this.getGraph(rootUri).pipe(
      map(graph => graph?.models?.[nodeUri] as JsonModelFlat<T>),
      filter(notNil),
      distinctUntilChanged()
    );
  }

  getGraphSnapshot<T extends JsonModelFlatGraph>(rootUri: string): T {
    return this.state.graphs[rootUri].graph as T;
  }

  getNodeSnapshot<T extends JsonModel>(rootUri: string, nodeUri: string): JsonModelFlat<T> {
    return this.getGraphSnapshot(rootUri).models[nodeUri] as JsonModelFlat<T>;
  }

  getLinkedGraph<T extends JsonModel>(rootUri: string): Observable<T> {
    return this.state$.pipe(
      map(state => state.linkedGraphs[rootUri] as T),
      distinctUntilChanged()
    );
  }

  getLinkedGraphSnapshot<T extends JsonModel>(rootUri: string): T {
    return this.state.linkedGraphs[rootUri] as T;
  }

  update(rootUri: string, ...models: JsonModelFlat[]): void {
    this.store.dispatch(new UpdateNode(rootUri, models));
  }

  setGraph<T extends JsonModel>(model: T, definition: unknown): Observable<unknown> {
    const flat = this.jsonModelService.toFlatGraph(model);
    return this.store.dispatch(new SetGraph(flat, definition));
  }

  reset(): Observable<void> {
    return this.store.dispatch(new Reset());
  }

  modifyNode<T extends JsonModel>(rootUri: string, nodeUri: string, recipe: NodeRecipe<T>): void {
    const updatedNode = produce(this.getNodeSnapshot<T>(rootUri, nodeUri), recipe);
    this.update(rootUri, updatedNode);
  }

  copyGraph(sourceUri: string, targetUri: string = `${sourceUri}-copy-${++this.copyCount}`): string {
    const graph = this.getGraphSnapshot(sourceUri);
    const copy = produce(graph, draft => {
      draft.rootUri = targetUri;
      draft.models[targetUri] = draft.models[sourceUri];
      delete draft.models[sourceUri];
      draft.models[targetUri]['@id'] = targetUri;
    });
    const definition = this.state.definitions[sourceUri];
    this.store.dispatch(new SetGraph(copy, definition));

    return targetUri;
  }

  removeGraph(rootUri: string): void {
    this.store.dispatch(new RemoveGraph(rootUri));
  }
}
