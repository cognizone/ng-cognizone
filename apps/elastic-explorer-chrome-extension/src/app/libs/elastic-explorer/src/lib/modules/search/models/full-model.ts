import { ElasticHit } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlatGraph } from '@cognizone/json-model';

export interface FullModel {
  hit: ElasticHit<unknown>;
  jsonModelFlatGraph?: JsonModelFlatGraph;
  jsonModel?: JsonModel;
}
