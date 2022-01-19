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
