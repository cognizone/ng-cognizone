import { Primitive } from '@cognizone/model-utils';
import { JsonLdValue } from './json-ld';

export interface ValueDescriptor<T extends Primitive = Primitive> {
  value: T;
  rawValue: JsonLdValue;
  type: 'blankNode' | 'literal' | 'reference';
  nodeUri: string;
  path: string[];
}
