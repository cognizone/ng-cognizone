import { inject, Injectable } from '@angular/core';
import {
  ExpandedJsonLdContainer,
  getAllNodes,
  getAllValues,
  getAllValuesGen,
  getOneIntValue,
  getOneNode,
  getOneValue,
  isOfType,
  JsonLdValue,
} from '@cognizone/json-ld-core';
import { JsonLdService } from '@cognizone/json-ld/ng-core';
import { HANAMI, RDFS, SH } from '@cognizone/lod-core';
import { Many, manyToArray, notNil } from '@cognizone/model-utils';
import { TtlCache, TtlCacheFactory } from '@cognizone/ng-core';
import {
  getConcreteNodeKindsOfPropertyShape,
  getPathDescriptor,
  HanamiNodeEditor,
  HanamiPurpose,
  LinkingStrategy,
  pathsPointingToPropertyShapes,
  RdfsClass,
  ShNodeShape,
  ShPropertyShape,
  ShShape,
} from '@cognizone/shacl-core';
import { Memoizer } from '../models';

@Injectable({ providedIn: 'root' })
export class ShaclShapesGraphHelperFactory {
  private jsonLdService = inject(JsonLdService);
  private helperCache: TtlCache<ExpandedJsonLdContainer, ShaclShapesGraphHelper> = inject(TtlCacheFactory).create({
    ttl: 5000,
  });

  create(shapesGraph: ExpandedJsonLdContainer, purpose: Many<HanamiPurpose>): ShaclShapesGraphHelper {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (this.helperCache.has(shapesGraph)) return this.helperCache.get(shapesGraph)!;
    const helper = new ShaclShapesGraphHelper(this.jsonLdService, shapesGraph, purpose);
    this.helperCache.set(shapesGraph, helper);
    return helper;
  }
}

export class ShaclShapesGraphHelper {
  nodeShapeUris: string[] = [];
  propertyShapeUris: string[] = [];
  propertyShapeUrisByPath: Record<string, string[] | undefined> = {};
  nodeShapeUrisByTargetClass: Record<string, string[] | undefined> = {};
  nodeShapeUrisByTargetNode: Record<string, string[] | undefined> = {};
  nodeShapeUrisByTargetObjectsOf: Record<string, string[] | undefined> = {};
  hasTargetObjectsOf = false;
  propertyPathWithShNode: string[] = [];
  hasShNode = false;
  nodeShapeUrisByTargetSubjectsOf: Record<string, string[] | undefined> = {};
  classUrisAndAncestors: Record<string, string[]> = {};
  private memoizer = new Memoizer();

  constructor(
    private readonly jsonLdService: JsonLdService,
    public readonly shapesGraph: ExpandedJsonLdContainer,
    public readonly purpose: Many<HanamiPurpose>
  ) {
    this.initMemoized();
    this.buildCache();
  }

  isAttribute(nodeShapeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeShapeUri, propertyPath);
    if (!property) return false;
    return this.isPropertyAttribute(property);
  }

  isPropertyAttribute(propertyShape: ShPropertyShape): boolean {
    return (
      propertyShape[SH.datatype] != null ||
      this.isUntypedIri(propertyShape) ||
      !!this.getConsolidatedPropertyShapesSortedBySpecificity(propertyShape['@id'])?.some(subProperty => {
        if (subProperty['@id'] === propertyShape['@id']) return false;
        return this.isPropertyAttribute(subProperty);
      })
    );
  }

  isReference(nodeShapeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeShapeUri, propertyPath);
    return property ? this.isPropertyReference(property) : false;
  }

  isPropertyReference(propertyShape: ShPropertyShape): boolean {
    return (
      !!getAllValues(propertyShape?.[SH.class], this.shapesGraph).length ||
      !!propertyShape?.[HANAMI.selection] ||
      getConcreteNodeKindsOfPropertyShape(propertyShape, this.shapesGraph).includes(SH.BlankNode) ||
      !!this.getConsolidatedPropertyShapesSortedBySpecificity(propertyShape['@id']).some(subProperty => {
        if (subProperty['@id'] === propertyShape['@id']) return false;
        return this.isPropertyReference(subProperty);
      })
    );
  }

  isSingle(nodeShapeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeShapeUri, propertyPath);
    return getOneIntValue(property?.[SH.maxCount]) === 1;
  }

  isRequired(nodeShapeUri: string, propertyPath: string): boolean {
    const property = this.getPropertyShape(nodeShapeUri, propertyPath);
    const minCount = getOneIntValue(property?.[SH.minCount]);
    return minCount ? minCount >= 1 : false;
  }

  getPropertiesPaths(nodeShapeUri: string): string[] {
    const nodeShape = this.getNodeShape(nodeShapeUri);
    return nodeShape ? this.getPropertiesPathsOfNodeShape(nodeShape) : [];
  }

  getPropertiesPathsOfNodeShape(nodeShape: ShNodeShape): string[] {
    return this.getAllPropertyShapeInNodeShape(nodeShape).reduce((acc, propertyShapeUri) => {
      const { path } = getPathDescriptor(propertyShapeUri, this.shapesGraph);
      if (path && !acc.includes(path)) acc.push(path);
      return acc;
    }, [] as string[]);
  }

  getConcreteType(type: Many<string>): string | undefined {
    const candidates = manyToArray(type);
    for (const candidate of candidates) {
      const chain = this.classUrisAndAncestors[candidate];
      if (!chain) continue;

      if (chain.length === candidates.length && chain.every(uri => candidates.includes(uri))) {
        return chain[0];
      }
    }

    return undefined;
  }

  getPropertyShape(nodeShapeUri: string, propertyPath: string): ShPropertyShape | undefined {
    const propertyUri = propertyPath;
    const nodeShape = this.getNodeShape(nodeShapeUri);

    return this.getPropertyShapeInNodeShape(nodeShape, propertyUri);
  }

  getNodeShape(nodeShapeUri: string): ShNodeShape {
    return this.shapesGraph.nodes[nodeShapeUri];
  }

  getNodeShapesForTypes(allTypes: Many<string>): ShNodeShape[] {
    allTypes = manyToArray(allTypes);
    const typesWithShapes: string[] = [];

    const matcher = (type: string) => (nodeShapeUri: string) => this.nodeShapeUrisByTargetClass[type]?.includes(nodeShapeUri);

    const matchingShapes = allTypes.reduce((shapes, type) => {
      this.nodeShapeUris.filter(matcher(type)).forEach(shapeUri => {
        typesWithShapes.push(type);
        shapes.push(this.shapesGraph.nodes[shapeUri]);
      });

      return shapes;
    }, [] as ShNodeShape[]);
    if (matchingShapes.length <= 1) return [matchingShapes[0]].filter(notNil);

    const nonEmptyShapes = matchingShapes.filter(shape => !!shape[SH.property]?.length);
    if (nonEmptyShapes.length === 1) return [nonEmptyShapes[0]];

    const concreteType = this.getConcreteType(typesWithShapes) ?? this.getConcreteType(allTypes);
    return concreteType ? matchingShapes.filter(s => matcher(concreteType)(s['@id'])) : matchingShapes;
  }

  getNodeShapesForTargetNode(nodeUri: string): ShNodeShape[] {
    return (this.nodeShapeUrisByTargetNode[nodeUri] ?? []).map(uri => this.shapesGraph.nodes[uri]);
  }

  isUntypedIri(property: ShPropertyShape): boolean {
    if (getOneValue(property?.[SH.datatype]) === RDFS.Resource) return true;
    if (getOneValue(property?.[SH.datatype]) || getOneValue(property?.[SH.class])) return false;
    const nodeKind = getOneValue(property[SH.nodeKind]);
    if (!nodeKind) return false;
    return nodeKind === SH.IRI;
  }

  // TODO move to GraphInfoProvider?
  pointsToSubForm(nodeShapeUri: string, propertyShape: ShPropertyShape): boolean {
    if (this.isPropertyAttribute(propertyShape)) return false;

    const editor = getOneNode(propertyShape[HANAMI.editor], this.shapesGraph);
    if (editor && this.jsonLdService.isOfTypeGuard<HanamiNodeEditor>(editor, HANAMI.NodeEditor)) {
      const linkingStrategy = getOneValue<LinkingStrategy>(editor[HANAMI.linkingStrategy]);
      if (linkingStrategy === HANAMI.ExternalReferenceLinkingStrategy) {
        return false;
      }
    }

    const properties = this.getPropertiesPaths(nodeShapeUri);
    return properties.length > 0;
  }

  private getInheritanceChain(clazzUri: string | undefined, alreadySeen: string[] = []): string[] {
    if (!clazzUri || alreadySeen.includes(clazzUri)) return [];
    const clazz = this.shapesGraph.nodes[clazzUri] as RdfsClass;
    if (!clazz) return [clazzUri];
    const parentClass = getOneValue<string>(clazz[RDFS.subClassOf]);
    const parentChain = this.getInheritanceChain(parentClass, [...alreadySeen, clazz['@id']]);
    return [clazz['@id'], ...parentChain];
  }

  getPropertyShapeInNodeShape(nodeShape: ShNodeShape | undefined, propertyPath: string): ShPropertyShape | undefined {
    if (!nodeShape) return undefined;
    const propertyShapeUri = this.getAllPropertyShapeInNodeShape(nodeShape).find(property => {
      const { path } = getPathDescriptor(property, this.shapesGraph);
      if (!path) {
        return false;
      }

      return path === propertyPath;
    });
    return propertyShapeUri ? this.shapesGraph.nodes[propertyShapeUri] : undefined;
  }

  getAllPropertyShapeInNodeShape(nodeShape: ShNodeShape | undefined): string[] {
    if (!nodeShape) return [];
    const propertyShapeUris = getAllValues<string>(nodeShape[SH.property], this.shapesGraph).filter(shapeUri => this.isActive(shapeUri));
    const parentUri = getOneValue<string>(nodeShape[RDFS.subClassOf]);
    let parentProperties: string[] = [];
    if (parentUri && this.shapesGraph.nodes[parentUri]) {
      parentProperties = this.getAllPropertyShapeInNodeShape(this.shapesGraph.nodes[parentUri]).filter(
        parentProperty =>
          !propertyShapeUris.some(
            property => getPathDescriptor(property, this.shapesGraph).path === getPathDescriptor(parentProperty, this.shapesGraph).path
          )
      );
    }
    return [...propertyShapeUris, ...parentProperties];
  }

  getConsolidatedPropertyShapesSortedBySpecificity(propertyShapeUri: string): ShPropertyShape[] {
    const propertyShape = this.shapesGraph.nodes[propertyShapeUri] as ShPropertyShape;
    if (!propertyShape) return [];
    const allShapes = [];

    allShapes.push(...getAllNodes(propertyShape[SH.or], this.shapesGraph));

    const listShapeUri = getOneValue<string>(propertyShape[HANAMI.listOf]);
    if (listShapeUri) {
      allShapes.push(...this.getConsolidatedPropertyShapesSortedBySpecificity(listShapeUri));
    }
    if (allShapes.length === 0) return [propertyShape];
    return allShapes.sort((a, b) => this.getSpecificity(b['@id']) - this.getSpecificity(a['@id']));
  }

  getSpecificity(propertyShapeUri: string): number {
    const shape = this.shapesGraph.nodes[propertyShapeUri] as ShPropertyShape;
    let specificity = 0;

    if (shape[SH.datatype]) ++specificity;
    if (shape[SH.class]) specificity += shape[SH.class]?.length ?? 0;
    if (shape[SH.nodeKind]) ++specificity;

    return specificity;
  }

  private initMemoized(): void {
    this.getConcreteType = this.memoizer.memoize(this.getConcreteType.bind(this), type => [...manyToArray(type)].sort().join('@@'));
    this.getInheritanceChain = this.memoizer.memoize(this.getInheritanceChain.bind(this), type => type);
    this.getAllPropertyShapeInNodeShape = this.memoizer.memoize(this.getAllPropertyShapeInNodeShape.bind(this), nS => nS?.['@id']);
    this.getPropertyShapeInNodeShape = this.memoizer.memoize(this.getPropertyShapeInNodeShape.bind(this), (nS, propUri) =>
      !nS ? undefined : `${nS?.['@id']}@@${propUri}`
    );
    this.getPropertyShape = this.memoizer.memoize(this.getPropertyShape.bind(this), (nS, propUri) => `${nS}@@${propUri}`);
    this.getPropertiesPaths = this.memoizer.memoize(this.getPropertiesPaths.bind(this));
    this.pointsToSubForm = this.memoizer.memoize(this.pointsToSubForm.bind(this), (nodeUri, pS) => `${nodeUri}@@${pS['@id']}`);
    this.getPropertiesPathsOfNodeShape = this.memoizer.memoize(this.getPropertiesPathsOfNodeShape.bind(this), nS => nS['@id']);
    this.getNodeShapesForTypes = this.memoizer.memoize(this.getNodeShapesForTypes.bind(this), types => manyToArray(types).join('@@'));
  }

  private buildCache(): void {
    const addToMap = (map: Record<string, string[] | undefined>, key: string, value: string) => {
      map[key] ??= [];
      map[key]?.push(value);
    };

    const addClassUri = (classUri: string) => {
      if (this.classUrisAndAncestors[classUri]) return;
      const chain = this.getInheritanceChain(classUri);
      this.classUrisAndAncestors[classUri] = chain;
      chain.forEach(addClassUri);
    };

    const propertyShapeUris = new Set<string>();

    const addPropertyShapeUri = (propertyShapeUri: string) => {
      if (propertyShapeUris.has(propertyShapeUri)) return;
      propertyShapeUris.add(propertyShapeUri);
      if (!this.isActive(propertyShapeUri)) return;

      const propertyShape = this.shapesGraph.nodes[propertyShapeUri] as ShPropertyShape;
      if (!propertyShape) return;

      const { path } = getPathDescriptor(propertyShapeUri, this.shapesGraph);
      if (path) {
        addToMap(this.propertyShapeUrisByPath, path, propertyShapeUri);
      }

      for (const subPath of pathsPointingToPropertyShapes) {
        for (const childUri of getAllValuesGen<string>(
          propertyShape[subPath as unknown as keyof ShPropertyShape] as JsonLdValue[],
          this.shapesGraph
        )) {
          addPropertyShapeUri(childUri);
        }
      }
      for (const classUri of getAllValuesGen<string>(propertyShape[SH.class], this.shapesGraph)) {
        addClassUri(classUri);
      }

      let shNodeIndex = 0;
      for (const nodeShapeUri of getAllValuesGen<string>(propertyShape[SH.node], this.shapesGraph)) {
        if (!this.isActive(nodeShapeUri)) continue;
        if (!shNodeIndex && path && !this.propertyPathWithShNode.includes(path)) {
          this.propertyPathWithShNode.push(path);
        }
        addNodeShapeUri(nodeShapeUri);
        ++shNodeIndex;
      }
    };

    const addNodeShapeUri = (nodeShapeUri: string) => {
      if (!this.isActive(nodeShapeUri)) return;
      const node = this.shapesGraph.nodes[nodeShapeUri] as ShNodeShape;
      if (this.nodeShapeUris.includes(node['@id'])) return;
      this.nodeShapeUris.push(node['@id']);

      for (const propertyShapeUri of getAllValuesGen<string>(node[SH.property], this.shapesGraph)) {
        addPropertyShapeUri(propertyShapeUri);
      }

      for (const targetClass of getAllValuesGen<string>(node[SH.targetClass], this.shapesGraph)) {
        addToMap(this.nodeShapeUrisByTargetClass, targetClass, node['@id']);
        addClassUri(targetClass);
      }

      for (const targetNode of getAllValuesGen<string>(node[SH.targetNode], this.shapesGraph)) {
        addToMap(this.nodeShapeUrisByTargetNode, targetNode, node['@id']);
      }

      for (const targetObjectsOf of getAllValuesGen<string>(node[SH.targetObjectsOf], this.shapesGraph)) {
        this.hasTargetObjectsOf = true;
        addToMap(this.nodeShapeUrisByTargetObjectsOf, targetObjectsOf, node['@id']);
      }

      for (const targetSubjectsOf of getAllValuesGen<string>(node[SH.targetSubjectsOf], this.shapesGraph)) {
        addToMap(this.nodeShapeUrisByTargetSubjectsOf, targetSubjectsOf, node['@id']);
      }
    };

    Object.values(this.shapesGraph.nodes).forEach(node => {
      const isClass = isOfType(node, RDFS.Class);
      const isNodeShape = isOfType<ShNodeShape>(node, SH.NodeShape);
      const isPropertyShape = isOfType<ShPropertyShape>(node, SH.PropertyShape);

      if (isClass) {
        addClassUri(node['@id']);
        if (isNodeShape && this.isActive(node['@id'])) {
          addToMap(this.nodeShapeUrisByTargetClass, node['@id'], node['@id']);
        }
      }

      if (isNodeShape) {
        // is active done inside
        addNodeShapeUri(node['@id']);
      }

      if (isPropertyShape) {
        // is active done inside
        addPropertyShapeUri(node['@id']);
      }
    });

    this.propertyShapeUris = [...propertyShapeUris].sort();
    this.hasShNode = this.propertyPathWithShNode.length > 0;
  }

  private isActive(shapeUri: string): boolean {
    const shape = this.shapesGraph.nodes[shapeUri] as ShShape;
    if (!shape) return false;
    if (getOneValue<boolean>(shape[SH.deactivated])) return false;
    let purposes = getAllValues<HanamiPurpose>(shape[HANAMI.purpose], this.shapesGraph);
    if (!purposes.length) {
      purposes = [HANAMI.EditionPurpose, HANAMI.ValidationPurpose];
    }
    return manyToArray(this.purpose).some(purpose => purposes.includes(purpose));
  }
}
