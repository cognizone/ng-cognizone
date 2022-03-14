import { JsonModel } from '@cognizone/json-model';
import { ShaclHelperDefinition } from '@cognizone/shacl/core';

export interface DetailsData {
  definition: ShaclHelperDefinition;
  graph: JsonModel;
}
