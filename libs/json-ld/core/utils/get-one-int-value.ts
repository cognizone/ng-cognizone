import { Primitive, manyToOne } from '@cognizone/model-utils';
import { JsonLdValueLiteral } from '../models';

export function getOneIntValue(values: JsonLdValueLiteral<Primitive>[] | undefined): number | undefined {
  const rawValue = manyToOne(values)?.['@value'];
  if (rawValue == null) return undefined;
  if (typeof rawValue === 'number') return rawValue;
  return parseInt(rawValue as string);
}
