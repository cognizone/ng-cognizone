import { SH } from '@cognizone/lod-core';

import { ShNodeKindConcreteValue, ShNodeKindValue } from '../models/hanami.model';

export function getConcreteNodeKinds(nodeKind: ShNodeKindValue): ShNodeKindConcreteValue[] {
  switch (nodeKind) {
    case SH.BlankNodeOrIRI:
      return [SH.BlankNode, SH.IRI];
    case SH.BlankNodeOrLiteral:
      return [SH.BlankNode, SH.Literal];
    case SH.IRIOrLiteral:
      return [SH.IRI, SH.Literal];
    default:
      return [nodeKind];
  }
}
