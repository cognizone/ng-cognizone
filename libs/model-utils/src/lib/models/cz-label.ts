import { LangString, LangStringSimple } from './lang-string';

/**
 * Union type that encompass all the usual types we use for labels
 */
export type CzLabel = LangString | LangStringSimple | string;
