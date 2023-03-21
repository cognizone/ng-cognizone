import { Many } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlat, JsonModelFlatGraph, JsonModelService, Uri } from '@cognizone/json-model';
import produce from 'immer';
import { Observable } from 'rxjs';

import { GraphService } from './graph.service';

export class GraphWrapper {
  constructor(private graphService: GraphService, private jsonModelService: JsonModelService, public rootUri: string) {}

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
    const context = this.getGraphSnapshot().context;
    return this.jsonModelService.createNewJsonModel(types, this.getDefinition(), context) as JsonModelFlat<T>;
  }

  update(...nodes: JsonModel[]): void {
    this.graphService.update(this.rootUri, ...nodes);
  }

  setReference<T extends JsonModel, U extends JsonModel>(
    node: T,
    referenceKey: keyof T,
    referenceUri: string | undefined,
    referenceType: string
  ): [T, U] {
    const graph = this.getGraphSnapshot();

    let reference: U;
    if (referenceUri && graph.models[referenceUri]) {
      reference = graph.models[referenceUri] as U;
    } else {
      reference = this.createNewJsonModel(referenceType) as U;
      reference['@id'] = referenceUri ?? reference['@id'];
    }
    const updatedNode = produce(node, (draft: Record<keyof T, unknown>) => {
      draft[referenceKey] = reference['@id'];
    });
    return [updatedNode, reference];
  }

  addReference<T extends JsonModel, U extends JsonModel>(
    node: T,
    referenceKey: keyof T,
    referenceUri: string | undefined,
    referenceType: string
  ): [T, U] {
    const graph = this.getGraphSnapshot();

    let reference: U;
    if (referenceUri && graph.models[referenceUri]) {
      reference = graph.models[referenceUri] as U;
    } else {
      reference = this.createNewJsonModel(referenceType) as U;
      reference['@id'] = referenceUri ?? reference['@id'];
    }

    const updatedNode = produce(node, (draft: Record<keyof T, unknown[]>) => {
      if (!draft[referenceKey]) draft[referenceKey] = [];
      draft[referenceKey].push(reference['@id']);
    });

    return [updatedNode, reference];
  }

  getDefinition(): unknown {
    return this.graphService.getDefinition(this.rootUri);
  }
}
