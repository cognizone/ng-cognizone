import { Many } from '@cognizone/model-utils';

export interface ResourceRaw {
  uri: string;
  type: Many<string>;
  references?: { [referenceKey: string]: Many<string> }; // value is one or multiple uris
  attributes?: { [attributeKey: string]: ResourceAttributeRaw };
}

export type ResourceAttributeRaw = { [dataType: string]: Many<unknown> };

export interface Resource<T extends object = {}> {
  uri: string;
  type: Many<string>;
  references: { [referenceKey: string]: Many<string> }; // value is one or multiple uris
  attributes: { [P in keyof T]: ResourceAttribute<T[P]> };
}

export interface ResourceAttribute<T> {
  value: T;
  dataType: string;
}
