import { manyToOne } from '@cognizone/model-utils';

import { isJsonLdValueLiteral, JsonLdValue } from '../models';

export function getOneIntValue(values: JsonLdValue[] | undefined): number | undefined {
  const value = manyToOne(values);
  if (!value || !isJsonLdValueLiteral(value)) return undefined;
  const rawValue = value['@value'];
  if (rawValue == null) return undefined;
  if (typeof rawValue === 'number') return rawValue;
  return parseInt(rawValue as string);
}
