import { Many, Primitive } from '@cognizone/model-utils';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getValues } from './get-values';

/**
 * Pure function to get the first literal value from a property path.
 *
 * @param jsonLd - The expanded JSON-LD container
 * @param nodeUri - The URI of the node to traverse from
 * @param path - Single property URI or array of property URIs to follow
 * @returns The first value, or undefined if no values found
 */
export function getValue<T extends Primitive>(jsonLd: ExpandedJsonLdContainer, nodeUri: string, path: Many<string>): T | undefined {
  return getValues<T>(jsonLd, nodeUri, path)[0];
}
