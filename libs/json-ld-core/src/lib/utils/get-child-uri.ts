import { Many } from '@cognizone/model-utils';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getChildrenUris } from './get-children-uris';

/**
 * Pure function to get the first child node URI by following a property path.
 *
 * @param jsonLd - The expanded JSON-LD container
 * @param nodeUri - The URI of the node to traverse from
 * @param path - Single property URI or array of property URIs to follow
 * @returns The first child node URI, or undefined if no children found
 */
export function getChildUri(jsonLd: ExpandedJsonLdContainer, nodeUri: string, path: Many<string>): string | undefined {
  return getChildrenUris(jsonLd, nodeUri, path, false)[0];
}
