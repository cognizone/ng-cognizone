import { manyToOne } from '@cognizone/model-utils';
import { JsonLdValueReference } from '../models';

export function getOneReferenceValue(values: JsonLdValueReference[] | undefined): string | undefined {
  return manyToOne(values)?.['@id'];
}
