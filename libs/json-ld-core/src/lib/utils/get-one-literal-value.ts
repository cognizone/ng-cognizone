import { Primitive, manyToOne } from '@cognizone/model-utils';
import { JsonLdValueLiteral } from '../models';

export function getOneLiteralValue<U extends Primitive>(values: JsonLdValueLiteral<U>[] | undefined): U | undefined {
  return manyToOne(values)?.['@value'];
}
