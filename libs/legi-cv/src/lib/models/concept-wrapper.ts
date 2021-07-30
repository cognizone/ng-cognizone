import { CzLabel, czLabelToString, Sorter } from '@cognizone/model-utils';

import { Concept } from './concept';
import { GetCvParams } from './get-cv-params';

export interface ConceptWrapper<T extends Concept = Concept> {
  concept: T;
  label: CzLabel;
  score: number;
}

export type ConceptWrapperSorterFactory = (params: GetCvParams) => Sorter<ConceptWrapper>;

export const scoreConceptWrapperSorterFactory: ConceptWrapperSorterFactory = () => (a, b) => (b.score ?? 0) - (a.score ?? 0);

export const orderConceptWrapperSorterFactory: ConceptWrapperSorterFactory = () => (a, b) =>
  (a.concept.order ?? 0) - (b.concept.order ?? 0);

export const countConceptWrapperSorterFactory: ConceptWrapperSorterFactory = params => (a, b) => {
  const aCount = params.counts?.[a.concept['@id']] ?? 0;
  const bCount = params.counts?.[b.concept['@id']] ?? 0;
  return bCount - aCount;
};

export const labelConceptWrapperSorterFactory: ConceptWrapperSorterFactory = params => {
  const lang = params.lang;
  if (!lang) {
    console.warn('Trying to sort on label, but no lang was provided, skipping');
    return () => 0;
  }
  return (a, b) => {
    const aLabel = czLabelToString(a.label, lang);
    const bLabel = czLabelToString(b.label, lang);
    if (aLabel === bLabel) return 0;
    if (!aLabel) return -1;
    if (!bLabel) return 1;
    return aLabel.localeCompare(bLabel);
  };
};

export const uriConceptWrapperSorterFactory: ConceptWrapperSorterFactory = () => (a, b) =>
  a.concept['@id'].localeCompare(b.concept['@id'], undefined, { numeric: true });

export function composeConceptWrapperSorterFactories(sorterFactories: ConceptWrapperSorterFactory[]): ConceptWrapperSorterFactory {
  return params => {
    const sorters = sorterFactories.map(factory => factory(params));
    return (a, b) => {
      for (const sorter of sorters) {
        const sort = sorter(a, b);
        if (sort !== 0) return sort;
      }
      return 0;
    };
  };
}
