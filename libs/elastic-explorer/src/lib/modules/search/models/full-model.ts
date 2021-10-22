import { ElasticHit } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlatGraph } from '@cognizone/ng-application-profile';

export interface FullModel {
  hit: ElasticHit<unknown>;
  jsonModelFlatGraph?: JsonModelFlatGraph;
  jsonModel?: JsonModel;
}
