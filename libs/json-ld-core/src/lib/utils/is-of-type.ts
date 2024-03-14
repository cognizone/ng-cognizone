import { JsonLdNode } from '../models';
import { isJsonLdNode } from './is-json-ld-node';

export function isOfType<T extends JsonLdNode = JsonLdNode>(value: unknown, type: string): value is T {
  return isJsonLdNode(value) && value['@type']?.includes(type);
}

export function isOfTypeCurr<T extends JsonLdNode = JsonLdNode>(typeUri: string): (value: unknown) => value is T {
  return ((value: unknown) => isOfType<T>(value, typeUri)) as (value: unknown) => value is T;
}
