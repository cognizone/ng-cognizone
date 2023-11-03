import { Many, manyToOne, Primitive } from '@cognizone/model-utils';
import { isJsonLdList, isJsonLdValueLang, isJsonLdValueLiteral, isJsonLdValueReference, JsonLdValue } from '../models';

// need further testing, doesn't work nicely with getOneValue([{'@value': 3} as JsonLdValueLiteral<number>])
// export function getOneValue<T extends JsonLdValue<U>, U extends Primitive>(values: T[] | undefined): T extends JsonLdValueLiteral<U> ? U | undefined : string | undefined {
export function getOneValue<T extends Primitive>(values: Many<JsonLdValue> | undefined): T | undefined {
  if (!values) return undefined;
  const first = manyToOne(values);
  if (!first) return undefined;

  if (typeof first === 'string') return first;
  if (isJsonLdList(first)) return getOneValue<T>(first['@list']);
  if (isJsonLdValueLang(first) || isJsonLdValueLiteral(first)) return first['@value'] as T;
  if (isJsonLdValueReference(first)) return first['@id'] as T;

  return undefined;
}
