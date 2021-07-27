import { Observable } from 'rxjs';
import { CzLabel } from '@cognizone/model-utils';

export abstract class I18nService {
  /**
   * @returns the currently active lang in the app, in a short format (so like
   * 'en', not 'en-BE'), in an Observable
   */
  abstract selectActiveSimpleLang(): Observable<string>;

  /**
   * @returns the currently active lang in the app, in a short format (so like
   * 'en', not 'en-BE')
   */
  abstract getActiveSimpleLang(): string;

  /**
   * @returns the currently active lang in the app, in a short ('en') or long
   * ('en-BE') format, wrapped in an Observable.
   */
  abstract selectActiveLang(): Observable<string>;

  /**
   * @returns the currently active lang in the app, in a short ('en') or long
   * ('en-BE') format.
   */
  abstract getActiveLang(): string;

  /**
   *
   * @returns the translation associated to the given `key`, using `params` and
   * in the corresponding `lang`
   */
  abstract translate<T = unknown>(key: CzLabel, params?: {}, lang?: string): T;

  /**
   *
   * @returns the translation associated to the given `key`, using `params` and
   * in the corresponding `lang`, as an Observable, in case the translation file
   * is not yet loaded, or if the `lang` changes (if not given)
   */
  abstract selectTranslate<T = unknown>(key: CzLabel, params?: {}, lang?: string): Observable<T>;
}
