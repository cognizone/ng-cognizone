import { Primitive } from '@cognizone/model-utils';
import { RDF, RDFS, XSD } from '@cognizone/lod/core';
import { isJsonLdValueLang, isJsonLdValueReference, JsonLdValueLiteral } from '../models';

const maxInteger = 10 ** 21;

export function getValueLiteralType(value: JsonLdValueLiteral<Primitive>): string | undefined {
  if (value['@type']) return value['@type'];
  const v = value['@value'];
  if (typeof v === 'boolean') return XSD.boolean;
  if (typeof v === 'number') return v % 1 !== 0 || v >= maxInteger ? XSD.double : XSD.integer;
  if (isJsonLdValueLang(value)) return RDF.langString;
  if (isJsonLdValueReference(value)) return RDFS.Resource;
  if (typeof v === 'string') return XSD.string;
  return undefined;
}
