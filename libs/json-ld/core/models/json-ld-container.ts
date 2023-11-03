import { JsonLdNode } from './json-ld';

export interface ExpandedJsonLdContainer<T = unknown> {
  nodes: { [uri: string]: JsonLdNode };
  facets?: T;
}
