import { Concept } from './concept';

/**
 * @description should only be keys that point to string, string[], LangString or LangStringSimple
 */
export type ConceptFilterableKey = keyof Concept;
export type ConceptFilterableKeys = ConceptFilterableKey[];
