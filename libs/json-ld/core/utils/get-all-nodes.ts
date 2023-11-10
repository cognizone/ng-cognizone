import { ExpandedJsonLdContainer, JsonLdNode, JsonLdValue } from '../models';
import { getAllValuesGen } from './get-all-values';

export function* getAllNodes<T extends JsonLdNode = JsonLdNode>(
  values: JsonLdValue[] | undefined,
  graph: ExpandedJsonLdContainer
): Generator<T> {
  for (const uri of getAllValuesGen<string>(values, graph)) {
    if (typeof uri !== 'string' || !graph.nodes[uri]) continue;
    yield graph.nodes[uri] as T;
  }
}
