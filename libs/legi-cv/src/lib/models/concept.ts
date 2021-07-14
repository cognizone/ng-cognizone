import { LangString } from '@cognizone/model-utils';
import { JsonModel, JsonModelType } from '@cognizone/ng-application-profile';

import { ConceptScheme } from './concept-scheme';

export interface Concept extends JsonModel {
  '@type': JsonModelType<'Concept'>;
  inScheme?: ConceptScheme<this>;
  hiddenLabel?: LangString;
  created?: LangString;
  deprecated?: boolean;
  prefLabel?: LangString;
  narrower?: Concept[];
  altLabel?: LangString;
  definition?: LangString;
  status?: string;
  broader?: string;
  broaderTransitive?: string[];
  order?: number;
}
