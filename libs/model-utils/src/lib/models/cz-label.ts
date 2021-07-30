import { getLangStringValue, LangString, LangStringSimple } from './lang-string';
import { Nil } from './nil';

/**
 * Union type that encompass all the usual types we use for labels
 */
export type CzLabel = LangString | LangStringSimple | string;

/**
 * same as {@link getLangStringValue} but also return label as-is if it's already a string
 */
export function czLabelToString(label: Nil<CzLabel>, lang: string, fallbackLangs: string[] = []): string | undefined {
  if (label == null) return undefined;
  if (typeof label === 'string') return label;
  return getLangStringValue(label, lang, fallbackLangs);
}
