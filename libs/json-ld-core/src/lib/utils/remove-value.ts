import { produce } from 'immer';
import { ExpandedJsonLdContainer, JsonLdNode, ValueDescriptor } from '../models';

export function removeValue(valueDescriptor: ValueDescriptor, graph: ExpandedJsonLdContainer): JsonLdNode {
  const nodeUri = valueDescriptor.nodeUri;
  const [, attrIndex, ...path] = [...valueDescriptor.path].reverse();
  path.reverse();

  return produce(graph.nodes[nodeUri], draft => {
    const arr = recursiveGet(draft, path) as unknown[];
    const index = parseInt(attrIndex);
    if (index > -1) {
      arr.splice(index, 1);
    }
  });
}

function recursiveGet(obj: unknown, path: string[]): unknown {
  if (path.length === 0) {
    return obj;
  }
  if (obj == null || typeof obj !== 'object') return undefined;
  const [head, ...tail] = path;
  return recursiveGet(obj[head as keyof typeof obj], tail);
}
