import { ExpandedJsonLdContainer, getOneValue, isBlankNodeUri } from '@cognizone/json-ld/core';
import { SH } from '@cognizone/lod';

import { PathMode, ShInversePathNode, ShPropertyShape } from '../models';

// move to new ShaclHelper?
export function getPathDescriptor(propertyShapeUri: string, graph: ExpandedJsonLdContainer): PathDescriptor {
  const propertyShape = graph.nodes[propertyShapeUri] as ShPropertyShape | undefined;

  const value = getOneValue<string>(propertyShape?.[SH.path]);
  if (!value || !propertyShape) return { mode: 'unknown' };

  let path: string | undefined;
  let mode: PathMode | undefined;

  if (isBlankNodeUri(value)) {
    const blankNode = graph.nodes[value];
    if (isInversePathNode(blankNode)) {
      path = getOneValue((blankNode as ShInversePathNode)[SH.inversePath]);
      mode = 'inverse';
    }
  } else {
    path = getOneValue<string>(propertyShape[SH.path]);
    mode = 'predicate';
  }
  if (path && mode) return { path, mode };
  return { mode: 'unknown' };
}

function isInversePathNode(value: unknown): value is ShInversePathNode {
  return typeof value === 'object' && value != null && (value as ShInversePathNode)[SH.inversePath] != null;
}

export type PathDescriptor =
  | {
      path: string;
      mode: PathMode;
    }
  | { path?: string; mode: 'unknown' };
