import { inject, Injectable } from '@angular/core';
import {
  ExpandedJsonLdContainer,
  getAllValues,
  getAllValuesGen,
  getOneIntValue,
  getOneNode,
  isBlankNodeUri,
  isOfType,
  JsonLdService,
} from '@cognizone/json-ld/core';
import { HANAMI, SH } from '@cognizone/lod';
import { Many } from '@cognizone/model-utils';

import { DEFAULT_LINKING_STRATEGY, HanamiNodeEditor, HanamiPurpose, LinkingStrategy, ShNodeShape, ShPropertyShape } from '../models';
import { getConcreteNodeKindsOfPropertyShape } from '../utils';
import { ShaclShapesGraphHelper, ShaclShapesGraphHelperFactory } from './shacl-shapes-graph-helper.service';

@Injectable({ providedIn: 'root' })
export class ShaclDataGraphHelperFactory {
  private jsonLdService = inject(JsonLdService);
  private shaclShapesGraphHelperFactory = inject(ShaclShapesGraphHelperFactory);

  create(graph: ExpandedJsonLdContainer, shapes: ExpandedJsonLdContainer, purpose: Many<HanamiPurpose>): ShaclDataGraphHelper {
    return new ShaclDataGraphHelper(this.jsonLdService, graph, shapes, purpose, this.shaclShapesGraphHelperFactory);
  }
}

// TODO memoize based on graph structure? So embed GraphInfoProvider?
export class ShaclDataGraphHelper {
  private shaclShapesGraphHelper!: ShaclShapesGraphHelper;
  private targetObjectsOfShapesByNodeUri: Record<string, ShNodeShape[]> = {};
  private shNodeByNodeUri: Record<string, ShNodeShape[]> = {};
  private subjectPredicateObject: { [subjectUri: string]: { [propertyPath: string]: string[] } } = {};
  private objectPredicateSubject: { [objectUri: string]: { [propertyPath: string]: string[] } } = {};

  constructor(
    private jsonLdService: JsonLdService,
    private dataGraph: ExpandedJsonLdContainer,
    public shapesGraph: ExpandedJsonLdContainer,
    public purpose: Many<HanamiPurpose>,
    private shaclShapesGraphHelperFactory: ShaclShapesGraphHelperFactory
  ) {
    this.setShapesGraph(shapesGraph, true);
  }

  setDataGraph(dataGraph: ExpandedJsonLdContainer): void {
    if (dataGraph === this.dataGraph) return;
    this.clearComputationalCache();
    this.computeComputationalCache(dataGraph);
    this.dataGraph = dataGraph;
  }

  setShapesGraph(shapesGraph: ExpandedJsonLdContainer, force = false): void {
    if (!force && shapesGraph === this.shapesGraph) return;
    this.shapesGraph = shapesGraph;
    this.shaclShapesGraphHelper = this.shaclShapesGraphHelperFactory.create(shapesGraph, this.purpose);
  }

  isAttribute(nodeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeUri, propertyPath);
    if (!property) return false;
    return this.shaclShapesGraphHelper.isPropertyAttribute(property);
  }

  isReference(nodeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeUri, propertyPath);
    if (!property) return false;
    return this.shaclShapesGraphHelper.isPropertyReference(property);
  }

  isSingle(nodeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeUri, propertyPath);
    return getOneIntValue(property?.[SH.maxCount]) === 1;
  }

  isRequired(nodeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeUri, propertyPath);
    const minCount = getOneIntValue(property?.[SH.minCount]);
    return minCount ? minCount >= 1 : false;
  }

  getPropertiesPaths(nodeUri: string): string[] {
    return this.getNodeShapes(nodeUri).reduce((acc, nodeShape) => {
      acc.push(...this.shaclShapesGraphHelper.getPropertiesPathsOfNodeShape(nodeShape));
      return acc;
    }, [] as string[]);
  }

  getNodeShapes(nodeUri: string): ShNodeShape[] {
    const node = this.dataGraph.nodes[nodeUri];
    if (!node) return [];

    // The same NodeShape might be targeted multiple times
    return Array.from(
      new Set([
        ...this.shaclShapesGraphHelper.getNodeShapesForTypes(node['@type']),
        ...this.shaclShapesGraphHelper.getNodeShapesForTargetNode(nodeUri),
        ...this.getNodeShapesForTargetObjectsOf(nodeUri),
        ...this.getNodeShapesForShNode(nodeUri),
      ])
    );
  }

  getPropertyShape(nodeUri: string, propertyPath: string): ShPropertyShape | undefined {
    const nodeShapes = this.getNodeShapes(nodeUri);

    for (const nodeShape of nodeShapes) {
      const pS = this.shaclShapesGraphHelper.getPropertyShapeInNodeShape(nodeShape, propertyPath);
      if (pS) return pS;
    }

    return undefined;
  }

  isPointingToExternalReference(propertyShapeUri: string): boolean {
    const propertyShape = this.shapesGraph.nodes[propertyShapeUri] as ShPropertyShape;
    const editor = getOneNode(propertyShape[HANAMI.editor], this.shapesGraph);

    if (editor && this.jsonLdService.isOfTypeGuard<HanamiNodeEditor>(editor, HANAMI.NodeEditor)) {
      const linkingStrategy = getAllValues<LinkingStrategy>(editor[HANAMI.linkingStrategy], this.shapesGraph);
      return linkingStrategy.length === 1 && linkingStrategy[0] === HANAMI.ExternalReferenceLinkingStrategy;
    }

    return false;
  }

  hasForm(nodeUri: string): boolean {
    return this.hasAtLeastOneNonExternalReference(nodeUri) ? this.getPropertiesPaths(nodeUri).length > 0 : false;
  }

  private hasAtLeastOneNonExternalReference(nodeUri: string): boolean {
    const allLinkingStrategies = new Set<LinkingStrategy>();

    for (const [propertyPath, subjects] of Object.entries(this.objectPredicateSubject[nodeUri] ?? {})) {
      for (const subjectUri of subjects) {
        const propertyShape = this.getPropertyShape(subjectUri, propertyPath);
        if (!propertyShape) continue;

        const editor = getOneNode(propertyShape[HANAMI.editor], this.shapesGraph);
        let linkingStrategies = isOfType<HanamiNodeEditor>(editor, HANAMI.NodeEditor)
          ? getAllValues<LinkingStrategy>(editor[HANAMI.linkingStrategy], this.shapesGraph)
          : [DEFAULT_LINKING_STRATEGY];
        if (!linkingStrategies.length) {
          linkingStrategies = [DEFAULT_LINKING_STRATEGY];
        }

        linkingStrategies.forEach(lS => allLinkingStrategies.add(lS));
      }
    }

    return allLinkingStrategies.size !== 1 || !allLinkingStrategies.has(HANAMI.ExternalReferenceLinkingStrategy);
  }

  private getNodeShapesForTargetObjectsOf(nodeUri: string): ShNodeShape[] {
    if (!this.shaclShapesGraphHelper.hasTargetObjectsOf) return [];
    if (this.targetObjectsOfShapesByNodeUri[nodeUri]) return this.targetObjectsOfShapesByNodeUri[nodeUri];

    const propertyPaths = Object.keys(this.objectPredicateSubject[nodeUri] ?? {});

    return (this.targetObjectsOfShapesByNodeUri[nodeUri] = propertyPaths.reduce((acc, propertyPath) => {
      const nodeShapeUris = this.shaclShapesGraphHelper.nodeShapeUrisByTargetObjectsOf[propertyPath];
      nodeShapeUris?.forEach(nodeShapeUri => {
        acc.push(this.shapesGraph.nodes[nodeShapeUri]);
      });
      return acc;
    }, [] as ShNodeShape[]));
  }

  private getNodeShapesForShNode(nodeUri: string): ShNodeShape[] {
    if (!this.shaclShapesGraphHelper.hasShNode) return [];
    if (this.shNodeByNodeUri[nodeUri]) return this.shNodeByNodeUri[nodeUri];

    const expectedNodeKind = isBlankNodeUri(nodeUri) ? SH.BlankNode : SH.IRI;
    const nodeShapesUris = new Set<string>();

    Object.entries(this.objectPredicateSubject[nodeUri] ?? {}).forEach(([propertyPath, subjects]) => {
      if (!this.shaclShapesGraphHelper.propertyPathWithShNode.includes(propertyPath)) return;
      subjects.forEach(subjectUri => {
        const mainPropertyShape = this.getPropertyShape(subjectUri, propertyPath);
        if (!mainPropertyShape) return;

        const allShapes = this.shaclShapesGraphHelper.getConsolidatedPropertyShapesSortedBySpecificity(mainPropertyShape['@id']);
        for (const pS of allShapes) {
          if (!getConcreteNodeKindsOfPropertyShape(pS, this.shapesGraph).includes(expectedNodeKind)) continue;
          for (const nodeShapeUri of getAllValuesGen<string>(pS[SH.node], this.shapesGraph)) {
            nodeShapesUris.add(nodeShapeUri);
          }
        }
      });
    });

    return (this.shNodeByNodeUri[nodeUri] = Array.from(nodeShapesUris).map(uri => this.shapesGraph.nodes[uri]));
  }

  // TODO handle data diff?
  private computeComputationalCache(newDataGraph: ExpandedJsonLdContainer): void {
    const addToMap = (map: Record<string, Record<string, string[]>>, key1: string, key2: string, value: string) => {
      map[key1] ??= {};
      map[key1][key2] ??= [];
      map[key1][key2].push(value);
    };

    Object.values(newDataGraph.nodes).forEach(node => {
      Object.entries(node).forEach(([propertyPath, values]) => {
        // only caching relevant properties
        if (propertyPath.startsWith('@')) return;
        const subjectUri = node['@id'];
        for (const objectUri of getAllValuesGen(values, newDataGraph, 'reference')) {
          if (typeof objectUri === 'string') {
            addToMap(this.objectPredicateSubject, objectUri, propertyPath, subjectUri);
            addToMap(this.subjectPredicateObject, subjectUri, propertyPath, objectUri);
          }
        }
      });
    });
  }

  private clearComputationalCache(): void {
    this.targetObjectsOfShapesByNodeUri = {};
    this.shNodeByNodeUri = {};
    this.subjectPredicateObject = {};
    this.objectPredicateSubject = {};
  }
}
