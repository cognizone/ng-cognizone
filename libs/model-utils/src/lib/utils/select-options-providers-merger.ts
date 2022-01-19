import { combineLatest, from, Observable } from 'rxjs';
import { filter, first, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { GetSelectOptionsParams, Nil, SelectOption, SelectOptionGroup, SelectOptionsProvider } from '../models';
import { notNil } from './not-nil';

/**
 * Merges multiple SelectOptionsProvider together to form a unified one.
 *
 * @deprectated
 */
export class SelectOptionsProvidersMerger<T> implements SelectOptionsProvider<T> {
  constructor(private providers: SelectOptionsProvider<T>[]) {}

  /**
   * see {@link SelectOptionsProvider}
   */
  getOptions(query: Nil<string>, params: GetSelectOptionsParams): Observable<(SelectOption<T> | SelectOptionGroup<T>)[]> {
    const obs = this.providers.map(provider => provider.getOptions(query, params));
    return combineLatest(obs).pipe(map(allOptions => allOptions.reduce((acc, curr) => [...acc, ...curr], [])));
  }

  /**
   * see {@link SelectOptionsProvider}
   */
  getValueOption(value: T): Observable<SelectOption<T>> {
    return from(this.providers).pipe(
      mergeMap(provider => provider.hasOptionFor(value).pipe(map(hasOption => (hasOption ? provider : null)))),
      filter(notNil),
      first(),
      switchMap(provider => provider.getValueOption(value)),
      first()
    );
  }

  /**
   * see {@link SelectOptionsProvider}
   */
  hasOptionFor(value: T): Observable<boolean> {
    return from(this.providers).pipe(
      mergeMap(provider => provider.hasOptionFor(value)),
      toArray(),
      map(hasOptions => hasOptions.some(hasOption => hasOption))
    );
  }
}
