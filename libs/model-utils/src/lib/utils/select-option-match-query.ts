import { Nil, SelectOption } from '../models';
import { manyToArray } from './many-to-array';

/**
 * This will (naively) check that on the labels of the given option matches the query.
 */
export function selectOptionMatchQuery<T>(option: SelectOption<T>, query: Nil<string>): boolean {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  const allLabels = [];
  if (typeof option.label === 'string') {
    allLabels.push(option.label);
  } else {
    Object.values(option.label).forEach(labels => allLabels.push(...manyToArray(labels)));
  }
  return allLabels.some(label => label.toLowerCase().includes(lowerQuery));
}
