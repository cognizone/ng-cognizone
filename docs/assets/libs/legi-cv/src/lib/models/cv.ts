import { LangString, LangStringSimple } from '@cognizone/model-utils';
import { isJsonModel, isOfType } from '@cognizone/ng-application-profile';

import { Concept } from './concept';

export type CvArray = Concept[];
export type CvDictionary = { [uri: string]: Concept };
export type Cv = CvArray | CvDictionary;

export interface ConceptGroup<T extends Concept = Concept> {
  label?: string | LangString | LangStringSimple;
  concepts: T[];
}

export function getAllConcepts<T extends Concept>(concepts: (T | ConceptGroup<T>)[]): T[] {
  const allConcepts: T[] = [];
  concepts.forEach(option => {
    if ('@id' in option) {
      allConcepts.push(option);
    } else {
      allConcepts.push(...option.concepts);
    }
  });
  return allConcepts;
}

export function groupConcepts<T extends Concept>(concepts: (T | ConceptGroup<T>)[]): ConceptGroup<T>[] {
  const allGroups: ConceptGroup<T>[] = [];
  let lastDynamicGroup: ConceptGroup<T> | undefined;
  for (const concept of concepts) {
    if (isConcept(concept)) {
      if (!lastDynamicGroup) {
        lastDynamicGroup = { concepts: [] };
        allGroups.push(lastDynamicGroup);
      }
      lastDynamicGroup.concepts.push(concept);
    } else {
      lastDynamicGroup = undefined;
      allGroups.push(concept);
    }
  }
  return allGroups;
}

export function areConcepts<T extends Concept>(concepts: (T | ConceptGroup<T>)[]): concepts is T[] {
  return concepts.every(isConcept);
}

export function isConcept(o: unknown): o is Concept {
  return isJsonModel(o) && isOfType(o, 'Concept');
}