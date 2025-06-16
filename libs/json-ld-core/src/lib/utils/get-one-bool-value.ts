import { manyToOne } from '@cognizone/model-utils';

import { isJsonLdValueLiteral, JsonLdValue } from '../models';

export function getOneBoolValue(values: JsonLdValue[] | undefined): boolean | undefined {
  const value = manyToOne(values);
  if (!value || !isJsonLdValueLiteral(value)) return undefined;
  const rawValue = value['@value'];
  if (rawValue == null) return undefined;
  if (typeof rawValue === 'boolean') return rawValue;
  return rawValue === 'true';
}
