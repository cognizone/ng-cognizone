import { Many } from '@cognizone/model-utils';
import { JsonLdValue } from '../models/json-ld';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getRawValues } from './get-raw-values';

/**
 * Pure function to get the first raw JSON-LD value from a property path.
 *
 * @param jsonLd - The expanded JSON-LD container
 * @param nodeUri - The URI of the node to traverse from
 * @param path - Single property URI or array of property URIs to follow
 * @returns The first raw JSON-LD value, or undefined if no values found
 */
export function getRawValue<T extends JsonLdValue>(jsonLd: ExpandedJsonLdContainer, nodeUri: string, path: Many<string>): T | undefined {
  return getRawValues<T>(jsonLd, nodeUri, path, false)[0];
}
