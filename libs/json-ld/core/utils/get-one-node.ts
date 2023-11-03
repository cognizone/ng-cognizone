import { ExpandedJsonLdContainer, JsonLdNode, JsonLdNodeFlat, JsonLdValue } from '../models';
import { getOneValue } from './get-one-value';

export function getOneNode<T extends JsonLdNode = JsonLdNode>(
  values: JsonLdValue[] | undefined,
  graph: ExpandedJsonLdContainer
): JsonLdNodeFlat<T> | undefined {
  if (!values) return;

  const uri = getOneValue<string>(values);
  return uri ? (graph.nodes[uri] as JsonLdNodeFlat<T>) : undefined;
}
