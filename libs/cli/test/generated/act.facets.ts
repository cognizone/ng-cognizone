import { LangStringSimple } from '@cognizone/model-utils';

export interface ActFacets {
  sortingDate?: string;
  draft?: ActFacetsDraft;
  theme?: ActFacetsTheme;
  taxonomyId?: string;
  memorialLabel?: LangStringSimple;
  memorialPage?: {
    [langUri: string]: number;
  };
  title?: LangStringSimple;
  titleAlternative?: LangStringSimple;
  titleShort?: LangStringSimple;
  typeDocumentBroader?: string;
}

export interface ActFacetsDraft {
  parliamentDraftId: string[];
}
export interface ActFacetsTheme {
  themeUri: string;
  themeId: string;
}
