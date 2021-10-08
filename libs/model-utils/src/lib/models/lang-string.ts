import { manyToOne } from './many';
import { Nil } from './nil';

/**
 * This represents an rdf:langString as usually indexed in our elastic. Each key
 * is a lang (usually simple, like 'en' or 'fr') and its corresponding value is
 * the label in that language. In here, there can be multiple values, that's why
 * it is a `string[]`. Also, keys could be more complex, like uri of the
 * languages for example.
 */
export interface LangString {
  [lang: string]: string[];
}

/**
 * Same as {@link LangString} but the value linked to a lang is unique.
 * We usually see those in facets.
 */
export interface LangStringSimple {
  [lang: string]: string;
}

/**
 * Extract from a {@link LangString} the label in a corresponding `lang`. If not
 * found, it will try to extract the label of one of the fallback languages.
 * If even there nothing is found, it will fallback to the first label found.
 * It is to be noted that even if the label is a string[] with multiple values,
 * only the 0th element will be taken.
 *
 * @param langString The lang string from which we want to extract a label
 * @param lang The preferred lang to get the label for
 * @param fallbackLangs ordered list of fallback languages
 */
export function getLangStringValue(
  langString: Nil<LangString | LangStringSimple>,
  lang: string,
  fallbackLangs: string[] = []
): string | undefined {
  if (!langString) return undefined;
  const allLangs = [lang, ...fallbackLangs];

  for (const language of allLangs) {
    const label = manyToOne(langString[language]);
    if (label) return label;
  }
  const firstLangAvailable = Object.keys(langString).pop();

  return firstLangAvailable ? manyToOne(langString[firstLangAvailable]) : undefined;
}
