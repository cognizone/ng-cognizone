import { JsonLdNode } from '../models';

export function isJsonLdNode(o: unknown): o is JsonLdNode {
  return typeof o === 'object' && o != null && (o as JsonLdNode)['@id'] != null;
}
