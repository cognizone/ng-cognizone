import { ExpandedJsonLdContainer, getAllNodes, getOneValue } from '@cognizone/json-ld/core';
import { HANAMI, SH } from '@cognizone/lod';
import { Nil } from '@cognizone/model-utils';

import { ShNodeKindConcreteValue, ShNodeKindValue, ShPropertyShape } from '../models';

export function getConcreteNodeKindsOfPropertyShape(
  propertyShape: Nil<ShPropertyShape>,
  shapesGraph: ExpandedJsonLdContainer
): ShNodeKindConcreteValue[] {
  if (!propertyShape) return [];
  const nodeKind = getOneValue<ShNodeKindValue>(propertyShape[SH.nodeKind]);

  if (nodeKind) {
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

  const computed = new Set<ShNodeKindConcreteValue>();

  if (getOneValue(propertyShape[SH.class])) {
    computed.add(SH.IRI);
    computed.add(SH.BlankNode);
  }
  if (getOneValue(propertyShape[HANAMI.selection])) computed.add(SH.IRI);
  if (getOneValue(propertyShape[SH.datatype])) computed.add(SH.Literal);

  if (propertyShape[SH.or]?.length) {
    for (const subProperty of getAllNodes(propertyShape[SH.or], shapesGraph)) {
      const subNodeKind = getConcreteNodeKindsOfPropertyShape(subProperty, shapesGraph);
      subNodeKind.forEach(kind => computed.add(kind));
    }
  }

  if (computed.size === 0) {
    computed.add(SH.BlankNode);
    computed.add(SH.IRI);
    computed.add(SH.Literal);
  }

  return Array.from(computed);
}
