import { Primitive } from '@cognizone/model-utils';
import { RDF } from '@cognizone/lod';
import {
  ExpandedJsonLdContainer,
  isJsonLdList,
  isJsonLdValueReference,
  isRdfListElement,
  JsonLdList,
  JsonLdNode,
  JsonLdValue,
  RdfListElement,
  ValueDescriptor,
} from '../models';

export function getAllValues<T extends Primitive = Primitive>(
  values: JsonLdValue[] | undefined,
  graph: ExpandedJsonLdContainer,
  type: ValuesOfType = 'any'
): T[] {
  return [...getAllValuesGen<T>(values, graph, type)];
}

export function* getAllValuesGen<T extends Primitive = Primitive>(
  values: JsonLdValue[] | undefined,
  graph: ExpandedJsonLdContainer,
  type: ValuesOfType = 'any'
): Generator<T> {
  if (!values) return;

  for (let value of values) {
    if (isJsonLdValueReference(value)) {
      const node = graph.nodes[value['@id']];
      if (node) value = node;
    }
    if (isRdfListElement(value)) {
      yield* getAllValuesGen<T>(value[RDF.first], graph, type);
      yield* getAllValuesGen<T>(value[RDF.rest], graph, type);
      continue;
    }
    if (isJsonLdList(value)) {
      yield* getAllValuesGen<T>(value['@list'], graph, type);
      continue;
    }

    if (isJsonLdValueReference(value)) {
      yield value['@id'] as T;
    } else if (type === 'any') {
      yield value['@value'] as T;
    }
  }
}

// TODO move to data shacl helper and handle inverse paths?
export function* getAllValueDescriptors<T extends Primitive = Primitive, U extends JsonLdNode = JsonLdNode>(
  node: U | undefined,
  propertyPath: keyof U,
  graph: ExpandedJsonLdContainer
): Generator<ValueDescriptor> {
  if (!node) return;
  yield* _getAllValueDescriptors<T, U>(node, propertyPath, graph, node['@id']);
}

function* _getAllValueDescriptors<T extends Primitive = Primitive, U extends JsonLdList | JsonLdNode | RdfListElement = JsonLdNode>(
  node: U,
  propertyPath: keyof U,
  graph: ExpandedJsonLdContainer,
  containerUri: string,
  path: string[] = []
): Generator<ValueDescriptor<T>> {
  const values = node[propertyPath] as unknown as JsonLdValue[];
  if (!values || !Array.isArray(values)) return;

  for (let i = 0; i < values.length; i++) {
    let value = values[i];
    const valuePath = [...path, propertyPath as string, i.toString()];
    if (isJsonLdValueReference(value)) {
      const childNode = graph.nodes[value['@id']];
      if (childNode) value = childNode;
    }
    if (isRdfListElement(value)) {
      yield* _getAllValueDescriptors<T, RdfListElement>(value, RDF.first, graph, value['@id']);
      yield* _getAllValueDescriptors<T, RdfListElement>(value, RDF.rest, graph, value['@id']);
      continue;
    }
    if (isJsonLdList(value)) {
      yield* _getAllValueDescriptors<T, JsonLdList>(value, '@list', graph, containerUri, valuePath);
      continue;
    }
    if (isJsonLdValueReference(value)) {
      yield {
        rawValue: value,
        value: value['@id'] as T,
        nodeUri: containerUri,
        type: 'reference',
        path: [...valuePath, '@id'],
      };
      continue;
    } else {
      yield {
        rawValue: value,
        value: value['@value'] as T,
        nodeUri: containerUri,
        type: 'literal',
        path: [...valuePath, '@value'],
      };
    }
  }
}

type ValuesOfType = 'any' | 'reference';
