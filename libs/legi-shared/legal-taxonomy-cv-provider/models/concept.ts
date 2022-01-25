import { LangString } from '@cognizone/model-utils';
import { JsonModel, JsonModelType } from '@cognizone/json-model';

export interface Concept extends JsonModel {
  '@type': JsonModelType<'Concept'>;
  hiddenLabel?: LangString;
  created?: LangString;
  deprecated?: boolean;
  prefLabel?: LangString;
  narrower?: Concept[];
  altLabel?: LangString;
  definition?: LangString;
  idSystematique?: string;
  iso_639_3?: string;
  status?: string;
  subject?: string[];
  notationTypeId?: string;
  notationTypeGroup?: string;
  broader?: string;
  broaderTransitive?: string[];
  order?: number;
}
