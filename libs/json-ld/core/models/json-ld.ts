import { RDF } from '@cognizone/lod';
import { IRI_PATTERN, Primitive } from '@cognizone/model-utils';

export type JsonLd = JsonLdGraph | JsonLdNode[];

export interface JsonLdGraph {
  '@graph': JsonLdNode[];
  '@context': JsonLdContext;
}

export interface JsonLdNode {
  '@id': string;
  '@type': string[];
}

export interface JsonLdBlankNode {
  '@id': string;
}

export type JsonLdValue<T extends Primitive = Primitive> = JsonLdList | JsonLdValueLang | JsonLdValueLiteral<T> | JsonLdValueReference;

export interface JsonLdValueLiteral<T extends Primitive = string> {
  '@value': T;
  '@type'?: string;
}

export interface JsonLdValueLang {
  '@value': string;
  '@language': string;
}

export interface JsonLdValueReference {
  '@id': string;
}

export interface JsonLdList {
  '@list': JsonLdValue[];
}

export interface JsonLdContext {}

export interface JsonLdGraphCz<T = unknown> {
  data: JsonLdNode[];
  '@context': JsonLdContext;
  facets?: T;
}

export type JsonLdNodeFlat<T = JsonLdNode> = {
  [key in keyof T]: T[key] extends JsonLdNode
    ? JsonLdValueReference
    : T[key] extends JsonLdNode | undefined
    ? JsonLdValueReference | undefined
    : T[key] extends JsonLdNode[]
    ? JsonLdValueReference[]
    : T[key] extends JsonLdNode[] | undefined
    ? JsonLdValueReference[] | undefined
    : T[key];
};

export function isJsonLdValueLiteral<T extends Primitive>(o: unknown): o is JsonLdValueLiteral<T> {
  return typeof o === 'object' && o != null && '@value' in o;
}

export function isJsonLdValueLang(o: JsonLdValue): o is JsonLdValueLang {
  return '@language' in o;
}

export function isJsonLdList(o: JsonLdValue): o is JsonLdList {
  return '@list' in o;
}

export function isJsonLdValueReference(o: unknown): o is JsonLdValueReference {
  return typeof o === 'object' && o != null && '@id' in o;
}

export interface RdfListElement extends JsonLdNode {
  [RDF.first]: JsonLdValue[];
  [RDF.rest]?: JsonLdValue[];
}

export function isRdfListElement(value: unknown): value is RdfListElement {
  return typeof value === 'object' && value !== null && '@id' in value && RDF.first in value;
}

export function isBlankNodeUri(id: string): boolean {
  return !!id && (id.startsWith('_:') || !id.match(IRI_PATTERN));
}

export function isBlankNode(node: unknown): node is JsonLdValueReference {
  return isJsonLdValueReference(node) && isBlankNodeUri(node['@id']);
}
