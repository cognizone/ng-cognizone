import { isBlankNode, isJsonLdValueLiteral, isJsonLdValueReference, JsonLdValue } from '@cognizone/json-ld/core';
import { SH } from '@cognizone/lod';

import { ShNodeKindConcreteValue } from '../models';

export function getConcreteNodeKindOfValue(value: JsonLdValue): ShNodeKindConcreteValue {
  if (isJsonLdValueLiteral(value)) return SH.Literal;

  if (isJsonLdValueReference(value)) {
    return isBlankNode(value) ? SH.BlankNode : SH.IRI;
  }

  throw new Error(`Cannot get concrete node kind of ${value}`);
}
