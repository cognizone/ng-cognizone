import { Many } from './many';

export interface TypedResource {
  uri: string;
  type: Many<string>;
  references?: { [referenceKey: string]: Many<string> }; // value is one or multiple uris
  attributes?: { [attributeKey: string]: TypedResourceAttribute };
}

export type TypedResourceAttribute = { [dataType: string]: Many<unknown> };
