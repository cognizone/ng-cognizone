import { Many, manyToArray } from '@cognizone/model-utils';
import { AnyJsonLdNode, JsonLdValue } from '../models/json-ld';
import { ExpandedJsonLdContainer } from '../models/json-ld-container';
import { getChildrenUris } from './get-children-uris';
import { getAllRawValues } from '.';

/**
 * Pure function to get raw JSON-LD values from a property path.
 *
 * @param jsonLd - The expanded JSON-LD container
 * @param nodeUri - The URI of the node to traverse from
 * @param path - Single property URI or array of property URIs to follow
 * @param wide - If true, returns all values; if false, returns only the first value
 * @returns Array of raw JSON-LD value objects
 */
export function getRawValues<T extends JsonLdValue>(
  jsonLd: ExpandedJsonLdContainer,
  nodeUri: string,
  path: Many<string>,
  wide: boolean = true
): T[] {
  const node = jsonLd.nodes[nodeUri] as AnyJsonLdNode;
  const uris = manyToArray(path);
  if (!node || !uris.length) return [];

  // Split the path: last element is the property to get values from, rest is the node path
  const propertyUri = uris[uris.length - 1];
  const nodePath = uris.slice(0, -1);

  // Get the target node URIs by traversing the node path (or use current node if no path)
  const targetNodeUris = nodePath.length ? getChildrenUris(jsonLd, nodeUri, nodePath, wide) : [nodeUri];

  // Collect raw values from all target nodes
  return targetNodeUris.reduce((acc, targetNodeUri) => {
    const targetNode = jsonLd.nodes[targetNodeUri] as AnyJsonLdNode;
    const rawValues = getAllRawValues(targetNode?.[propertyUri] ?? [], jsonLd) as T[];
    acc.push(...rawValues);
    return acc;
  }, [] as T[]);
}
