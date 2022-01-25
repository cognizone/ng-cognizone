import { Many } from '@cognizone/model-utils';

/**
 * @description intermediary model used internally to convert JsonModel to
 * TypedResourceGraph (and the other way around)
 */
export interface ResourceGraph {
  data: Resource;
  included: Resource[];
  facets?: {};
}

/**
 * @description intermediary model used internally to convert JsonModel to
 * TypedResourceGraph (and the other way around)
 */
export interface Resource<T extends object = {}> {
  uri: string;
  type: Many<string>;
  references: { [referenceKey: string]: Many<string> }; // value is one or multiple uris
  attributes: { [P in keyof T]: ResourceAttribute<T[P]> };
}

/**
 * @description intermediary model used internally to convert JsonModel to
 * TypedResourceGraph (and the other way around)
 */
export interface ResourceAttribute<T> {
  value: T;
  dataType: string;
}
