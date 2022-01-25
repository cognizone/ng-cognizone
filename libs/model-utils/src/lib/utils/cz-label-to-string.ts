import { CzLabel, Nil } from '../models';
import { manyToOne } from './many-to-one';

/**
 * Extract from a {@link CzLabel} the label in a corresponding `lang`. If not
 * found, it will try to extract the label of one of the fallback languages.
 * It is to be noted that even if the label is a string[] with multiple values,
 * only the 0th element will be taken.
 *
 * @param langString The lang string from which we want to extract a label
 * @param lang The preferred lang to get the label for
 * @param fallbackLangs ordered list of fallback languages
 */
export function czLabelToString(label: Nil<CzLabel>, lang: string, fallbackLangs: string[] = []): string | undefined {
  if (label == null) return undefined;
  if (typeof label === 'string') return label;

  const allLangs = [lang, ...fallbackLangs];

  for (const language of allLangs) {
    const value = manyToOne(label[language]);
    if (value) return value;
  }

  return undefined;
}
