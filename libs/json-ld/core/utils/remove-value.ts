import produce from 'immer';
import { get } from 'lodash-es';
import { ExpandedJsonLdContainer, JsonLdNode, ValueDescriptor } from '../models';

export function removeValue(valueDescriptor: ValueDescriptor, graph: ExpandedJsonLdContainer): JsonLdNode {
  const nodeUri = valueDescriptor.nodeUri;
  const [, attrIndex, ...path] = [...valueDescriptor.path].reverse();
  path.reverse();

  return produce(graph.nodes[nodeUri], draft => {
    const arr = get(draft, path) as unknown[];
    const index = parseInt(attrIndex);
    if (index > -1) {
      arr.splice(index, 1);
    }
  });
}
