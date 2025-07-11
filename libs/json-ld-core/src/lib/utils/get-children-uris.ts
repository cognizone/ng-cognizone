import { Many, manyToArray } from '@cognizone/model-utils';
import { AnyJsonLdNode } from '../models/json-ld';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getAllValues } from '.';

/**
 * Pure function to get child node URIs by following a property path.
 *
 * @param jsonLd - The expanded JSON-LD container
 * @param nodeUri - The URI of the node to traverse from
 * @param path - Single property URI or array of property URIs to follow
 * @param wide - If true, returns all values; if false, returns only the first value
 * @returns Array of child node URIs
 */
export function getChildrenUris(jsonLd: ExpandedJsonLdContainer, nodeUri: string, path: Many<string>, wide: boolean = true): string[] {
  const node = jsonLd.nodes[nodeUri] as AnyJsonLdNode;
  const uris = manyToArray(path);
  if (!node || !uris.length) return [];

  const [localUri, ...rest] = uris;
  let values = node[localUri] ?? [];
  if (!wide) {
    values = values.slice(0, 1);
  }

  const childUris = getAllValues<string>(values, jsonLd, 'reference');

  if (rest.length) {
    // Recursively traverse the remaining path
    return childUris.reduce((acc, uri) => {
      acc.push(...getChildrenUris(jsonLd, uri, rest, wide));
      return acc;
    }, [] as string[]);
  }

  return childUris;
}
