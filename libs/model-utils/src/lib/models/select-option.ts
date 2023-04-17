import { Observable } from 'rxjs';

import { LangString, LangStringSimple } from './lang-string';
import { Nil } from './nil';
import { Pagination } from './pagination';

/**
 * Kind of an augmented KeyValue type to be used whenever we have case where a
 * user has to select an option, being it in a select, an autocomplete, etc.
 * This is mostly there in an effort of consistency, to have interoperable
 * libraries and data models.
 */
export interface SelectOption<T = string> {
  /**
   * The value associated to the SelectOption. In a given set, this should be unique.
   */
  value: T;
  /**
   * The label, used for presentational purposes
   */
  label: SelectOptionLabel;
  /**
   * Set tu true if this option is disabled, useful when needing to display historical values.
   */
  disabled?: boolean;
  /**
   * Can store whatever, placeholder for library to put whatever they need here.
   */
  data?: {};
}

/**
 * The label of a {@link SelectOption}
 */
export type SelectOptionLabel = LangString | LangStringSimple | string;

/**
 * For consistency, this interface is to be used when needing to use counts for {@link SelectOption}
 */
export interface SelectOptionCounts {
  [value: string]: number;
}

/**
 * Any service or other that provides an array of SelectOption should implement this interface for consistency and interoperability.
 */
export interface SelectOptionsProvider<T> {
  /**
   * Given the query, will return a filtered array of `SelectOption` that all matches.
   */
  getOptions(query: Nil<string>, params: GetSelectOptionsParams): Observable<(SelectOption<T> | SelectOptionGroup<T>)[]>;

  /**
   * Given a value, will return the SelectOption corresponding that value.
   */
  getValueOption(value: T): Observable<SelectOption<T>>;

  /**
   * Returns `true` if this provider has a `SelectOption` that is linked to the given value.
   */
  hasOptionFor(value: T): Observable<boolean>;
}

export interface GetSelectOptionsParams {
  counts?: Nil<SelectOptionCounts>;
  lang?: Nil<string>;
  pagination?: Pagination;
}

/**
 * Represents a group SelectOption, might be useful when having grouped options in selects for example
 */
export interface SelectOptionGroup<T = string> {
  /**
   * Label of the group
   */
  label?: SelectOptionLabel;

  /**
   * Options that are inside that group
   */
  options: SelectOption<T>[];
}
