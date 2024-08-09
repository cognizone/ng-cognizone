/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, NgZone } from '@angular/core';
import { Many, notNil } from '@cognizone/model-utils';
import { Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import { produce } from 'immer';
import { get, set } from 'lodash-es';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { RDF } from '@cognizone/lod-core';
import {
  ExpandedJsonLdContainer,
  getAllValueDescriptors,
  getAllValues,
  JsonLdNode,
  JsonLdValue,
  RdfListElement,
} from '@cognizone/json-ld-core';
import { JsonLdService } from '@cognizone/json-ld/ng-core';

import { GraphStatus } from '../models';
import { RemoveGraph, Reset, SetGraph, UpdateNode } from '../store/graph.actions';
import { GRAPH_STATE_TOKEN, GraphStateModel } from '../store/graph.state';

@Injectable({
  providedIn: 'root',
})
export class JsonLdStoreService {
  state$: Observable<GraphStateModel> = this.store.select(GRAPH_STATE_TOKEN);

  private copyCount = 0;
  private _state!: GraphStateModel;

  get state(): GraphStateModel {
    // performance of this.store.selectSnapshot are pretty bad in comparison
    return this._state;
  }

  constructor(private store: Store, private logger: Logger, private ngZone: NgZone, private jsonLdService: JsonLdService) {
    this.logger = this.logger.extend('JsonLdStoreService');
    this.ngZone.runOutsideAngular(() => {
      this.state$.subscribe(state => (this._state = state));
    });
  }

  hasGraph(rootUri: string): boolean {
    return this.state.graphs[rootUri] != null;
  }

  getGraph<T extends ExpandedJsonLdContainer>(rootUri: string): Observable<T> {
    return this.state$.pipe(
      map(state => state.graphs[rootUri]?.graph as T),
      filter(notNil),
      distinctUntilChanged()
    );
  }

  getGraphStatus(rootUri: string): Observable<GraphStatus | undefined> {
    return this.state$.pipe(
      map(state => state.graphs[rootUri]?.status),
      distinctUntilChanged()
    );
  }

  getNode<T extends JsonLdNode>(rootUri: string, nodeUri: string): Observable<T> {
    return this.getGraph(rootUri).pipe(
      map(graph => graph?.nodes?.[nodeUri] as T),
      filter(notNil),
      distinctUntilChanged()
    );
  }

  getGraphSnapshot(rootUri: string): ExpandedJsonLdContainer {
    return this.state.graphs[rootUri].graph;
  }

  hasGraphSnapshot(rootUri: string): boolean {
    return !!this.state.graphs[rootUri];
  }

  getNodeSnapshot<T extends JsonLdNode>(rootUri: string, nodeUri: string): T {
    return this.getGraphSnapshot(rootUri).nodes[nodeUri] as T;
  }

  getLinkedGraphSnapshot<T extends JsonLdNode>(rootUri: string): T {
    return this.jsonLdService.getProxy<T>(this.state.graphs[rootUri].graph, rootUri);
  }

  update(...args: UpdateOptions): void {
    this.store.dispatch(new UpdateNode(...args));
  }

  setGraph(graph: ExpandedJsonLdContainer, rootUri: string, graphStatus?: GraphStatus): Observable<unknown> {
    return this.store.dispatch(new SetGraph(graph, rootUri, graphStatus));
  }

  reset(): Observable<void> {
    return this.store.dispatch(new Reset());
  }

  copyGraph(sourceUri: string, targetUri: string = `${sourceUri}-copy-${++this.copyCount}`): string {
    const graph = this.getGraphSnapshot(sourceUri);
    const copy = produce(graph, draft => {
      draft.nodes[targetUri] = draft.nodes[sourceUri];
      delete draft.nodes[sourceUri];
      draft.nodes[targetUri]['@id'] = targetUri;
    });

    this.store.dispatch(new SetGraph(copy, targetUri));

    return targetUri;
  }

  removeGraph(rootUri: string): void {
    this.store.dispatch(new RemoveGraph(rootUri));
  }

  getDefinition(rootUri: string): unknown {
    return this.state.definitions[rootUri];
  }

  removeAttribute<T extends JsonLdNode>(node: T, attributeKey: keyof T): T {
    return produce(node, (draft: Record<keyof T, JsonLdValue[]>) => {
      delete draft[attributeKey];
    });
  }

  addReference<T extends JsonLdNode, U extends JsonLdNode>(
    rootUri: string,
    node: T,
    referenceKey: keyof T,
    referenceUri: string | undefined,
    referenceType: Many<string> | undefined,
    isList: boolean
  ): string {
    const graph = this.getGraphSnapshot(rootUri);

    let reference: U;
    if (referenceUri && graph.nodes[referenceUri]) {
      reference = graph.nodes[referenceUri] as U;
    } else {
      reference = this.jsonLdService.createNode(referenceType, referenceUri);
      this.update(rootUri, [reference]);
    }

    this.addValue({ rootUri, nodeUri: node['@id'], propertyPath: referenceKey as string, value: { '@id': reference['@id'] }, isList });

    return reference['@id'];
  }

  addInverseReference<T extends JsonLdNode>(
    rootUri: string,
    nodeUri: string | undefined,
    referenceKey: keyof T,
    referenceUri: string,
    referenceType: Many<string> | undefined,
    isList: boolean
  ): string {
    const graph = this.getGraphSnapshot(rootUri);
    let reference: T;
    if (nodeUri && graph.nodes[nodeUri]) {
      reference = graph.nodes[nodeUri] as T;
    } else {
      reference = this.jsonLdService.createNode(referenceType, nodeUri);
      this.update(rootUri, [reference]);
    }

    this.addValue({ rootUri, nodeUri: reference['@id'], propertyPath: referenceKey as string, value: { '@id': referenceUri }, isList });

    return reference['@id'];
  }

  removeNode(rootUri: string, nodeUri: string): void {
    const graph = this.getGraphSnapshot(rootUri);

    const updatedGraph = produce(graph, draft => {
      delete draft.nodes[nodeUri];

      Object.values(draft.nodes).forEach(node => {
        Object.entries(node).forEach(([key, values]) => {
          if (key.startsWith('@')) return;
          if (!Array.isArray(values)) return;
          const allValues = getAllValues(values as unknown as JsonLdValue[], graph);
          for (let i = allValues.length - 1; i >= 0; i--) {
            if (allValues[i] === nodeUri) {
              (node[key as keyof typeof node] as unknown as JsonLdValue[]).splice(i, 1);
            }
          }
        });
      });
    });

    this.setGraph(updatedGraph, rootUri, 'touched');
  }

  addValue({ rootUri, nodeUri, propertyPath, value, options, isList }: AddValueOptions): void {
    const graph = this.getGraphSnapshot(rootUri);
    const node = graph.nodes[nodeUri];
    let targetNodeUri = nodeUri;
    let path = [propertyPath];

    const values = [...getAllValueDescriptors(node, propertyPath as keyof JsonLdNode, graph)];

    const lastValue = values[values.length - 1];
    const isFirst = lastValue?.path.includes(RDF.first);
    const listIndex = lastValue?.path.findIndex(v => v === '@list') ?? -1;
    const updatedNodes: JsonLdNode[] = [];
    if (isFirst) {
      targetNodeUri = lastValue.nodeUri;
      path = [RDF.rest, '0', '@list'];
    } else if (listIndex > -1) {
      targetNodeUri = lastValue.nodeUri;
      path = lastValue.path.slice(0, listIndex + 1);
    } else if (isList) {
      //creating the start of the list
      const listNode = this.jsonLdService.createBlankNode() as RdfListElement;
      listNode[RDF.first] = [value];
      listNode[RDF.rest] = [{ '@list': [] }];
      value = { '@id': listNode['@id'] };
      updatedNodes.push(listNode);
    }

    updatedNodes.push(
      produce(graph.nodes[targetNodeUri], draft => {
        let arr = get(draft, path) as JsonLdValue[];
        if (!arr) {
          arr = [];
          set(draft, path, arr);
        }
        arr.push(value);
      })
    );

    this.update(rootUri, updatedNodes, options);
  }
}

interface AddValueOptions {
  rootUri: string;
  nodeUri: string;
  propertyPath: string;
  value: JsonLdValue;
  isList: boolean;
  options?: UpdateOptions[2];
}

export type UpdateOptions = ConstructorParameters<typeof UpdateNode>;
