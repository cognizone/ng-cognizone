import { Many } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlat, JsonModelFlatGraph, JsonModelService, Uri } from '@cognizone/ng-application-profile';
import produce from 'immer';
import { Observable } from 'rxjs';

import { GraphService } from './graph.service';

export class GraphWrapper {
  constructor(
    private graphService: GraphService,
    private jsonModelService: JsonModelService,
    public rootUri: string,
    private apName: string
  ) {}

  getNode<T extends JsonModel>(nodeUri: Uri<T>): Observable<JsonModelFlat<T>> {
    return this.graphService.getNode<T>(this.rootUri, nodeUri);
  }

  getNodeSnapshot<T extends JsonModel>(nodeUri: Uri<T>): JsonModelFlat<T> {
    return this.graphService.getNodeSnapshot<T>(this.rootUri, nodeUri);
  }

  getGraph(): Observable<JsonModelFlatGraph> {
    return this.graphService.getGraph(this.rootUri);
  }

  getGraphSnapshot(): JsonModelFlatGraph {
    return this.graphService.getGraphSnapshot(this.rootUri);
  }

  getLinkedGraphSnapshot<T extends JsonModel>(): T {
    return this.graphService.getLinkedGraphSnapshot(this.rootUri);
  }

  createNewJsonModel<T extends JsonModel>(types: Many<string>): JsonModelFlat<T> {
    return this.jsonModelService.createNewJsonModel(types, this.apName, this.rootUri) as JsonModelFlat<T>;
  }

  update(...nodes: JsonModel[]): void {
    this.graphService.update(this.rootUri, ...nodes);
  }

  setReference<T extends JsonModel, U extends JsonModel>(
    node: T,
    referenceKey: keyof T,
    referenceUri: string,
    referenceType: string
  ): [T, U] {
    const graph = this.getGraphSnapshot();
    // tslint:disable-next-line: no-any doing funky stuff, cannot make it work with Draft<V> for some reason...
    const updatedNode = produce(node, (draft: any) => {
      draft[referenceKey] = referenceUri;
    });

    let reference: U;
    if (graph.models[referenceUri]) {
      reference = graph.models[referenceUri] as U;
    } else {
      reference = this.createNewJsonModel(referenceType) as U;
      reference['@id'] = referenceUri;
    }
    return [updatedNode, reference];
  }

  addReference<T extends JsonModel, U extends JsonModel>(
    node: T,
    referenceKey: keyof T,
    referenceUri: string,
    referenceType: string
  ): [T, U] {
    const graph = this.getGraphSnapshot();
    // tslint:disable-next-line: no-any doing funky stuff, cannot make it work with Draft<V> for some reason...
    const updatedNode = produce(node, (draft: any) => {
      if (!draft[referenceKey]) draft[referenceKey] = [];
      draft[referenceKey].push(referenceUri);
    });

    let reference: U;
    if (graph.models[referenceUri]) {
      reference = graph.models[referenceUri] as U;
    } else {
      reference = this.createNewJsonModel(referenceType) as U;
      reference['@id'] = referenceUri;
    }
    return [updatedNode, reference];
  }
}
