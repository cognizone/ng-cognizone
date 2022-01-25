import { LangString } from '@cognizone/model-utils';
import { JsonModel, JsonModelType } from '@cognizone/json-model';

import { Collection } from './collection';
import { Concept } from './concept';

export interface ConceptScheme<T extends Concept = Concept> extends JsonModel {
  '@type': JsonModelType<'ConceptScheme'>;
  prefLabel?: LangString;
  altLabel?: LangString;
  description?: LangString;
  title?: LangString;
  hasTopConcept?: T[];
  hasMicroThesaurus?: Collection<T>[];
}
