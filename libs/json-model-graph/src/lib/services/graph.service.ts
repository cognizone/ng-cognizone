import { Injectable, NgZone } from '@angular/core';
import { notNil } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlat, JsonModelFlatGraph, JsonModelService } from '@cognizone/json-model';
import { Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import produce from 'immer';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, shareReplay } from 'rxjs/operators';

import { NodeRecipe } from '../models/node-recipe';
import { RemoveGraph, Reset, SetGraph, UpdateNode } from '../store/graph.actions';
import { GRAPH_STATE_TOKEN, GraphStateModel } from '../store/graph.state';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  state$: Observable<GraphStateModel> = this.store.select(GRAPH_STATE_TOKEN);

  private copyCount = 0;
  private linkedGraphsCache: { [rootUri: string]: Observable<JsonModel> } = {};
  private _state!: GraphStateModel;

  get state(): GraphStateModel {
    // performance of this.store.selectSnapshot are pretty bad in comparison
    return this._state;
  }

  constructor(private store: Store, private logger: Logger, private jsonModelService: JsonModelService, private ngZone: NgZone) {
    this.logger = this.logger.extend('GraphService');
    this.ngZone.runOutsideAngular(() => {
      this.state$.subscribe(state => (this._state = state));
    });
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
    const cache$ = this.linkedGraphsCache[rootUri];
    if (cache$) return cache$ as Observable<T>;

    return (this.linkedGraphsCache[rootUri] = this.state$.pipe(
      map(state => state.graphs[rootUri].graph),
      distinctUntilChanged(),
      map(() => this.getLinkedGraphSnapshot<T>(rootUri)),
      shareReplay(1)
    ));
  }

  getLinkedGraphSnapshot<T extends JsonModel>(rootUri: string): T {
    return this.jsonModelService.fromFlatGraph(this.state.graphs[rootUri].graph, this.state.definitions[rootUri]);
  }

  update(rootUri: string, ...models: JsonModelFlat[]): void {
    this.store.dispatch(new UpdateNode(rootUri, models));
  }

  setGraph<T extends JsonModel>(model: T, definition: unknown): Observable<unknown> {
    const flat = this.jsonModelService.toFlatGraph(model);
    return this.store.dispatch(new SetGraph(flat, definition));
  }

  reset(): Observable<void> {
    this.linkedGraphsCache = {};
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
    delete this.linkedGraphsCache[rootUri];
    this.store.dispatch(new RemoveGraph(rootUri));
  }

  getDefinition(rootUri: string): unknown {
    return this.state.definitions[rootUri];
  }
}
