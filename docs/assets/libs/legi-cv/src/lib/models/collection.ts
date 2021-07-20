import { LangString } from '@cognizone/model-utils';
import { JsonModel, JsonModelType } from '@cognizone/ng-application-profile';

import { Concept } from './concept';

export interface Collection<T extends Concept = Concept> extends JsonModel {
  '@type': JsonModelType<'Collection'>;
  prefLabel?: LangString;
  member: T[];
}
