import { Many, Primitive } from '@cognizone/model-utils';
import { isJsonLdValueReference, JsonLdValueLiteral, JsonLdValue } from '../models/json-ld';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getRawValues } from './get-raw-values';

/**
 * Pure function to get literal values from a property path.
 *
 * @param jsonLd - The expanded JSON-LD container
 * @param nodeUri - The URI of the node to traverse from
 * @param path - Single property URI or array of property URIs to follow
 * @returns Array of primitive values
 */
export function getValues<T extends Primitive>(jsonLd: ExpandedJsonLdContainer, nodeUri: string, path: Many<string>): T[] {
  return getRawValues<JsonLdValue>(jsonLd, nodeUri, path).map((value: JsonLdValue) => {
    // Handle reference values (extract the URI)
    if (isJsonLdValueReference(value)) {
      return value['@id'] as T;
    }
    // Handle literal values (extract the primitive value)
    return (value as unknown as JsonLdValueLiteral)['@value'] as T;
  });
}
