import { Injectable, Provider } from '@angular/core';
import { I18nService } from '@cognizone/i18n';
import { CzLabel, czLabelToString } from '@cognizone/model-utils';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class I18nTranslocoService extends I18nService {
  constructor(private transloco: TranslocoService) {
    super();
  }

  selectActiveSimpleLang(): Observable<string> {
    return this.selectActiveLang().pipe(map(lang => this.toSimpleLang(lang)));
  }

  getActiveSimpleLang(): string {
    return this.toSimpleLang(this.getActiveLang());
  }

  selectActiveLang(): Observable<string> {
    return this.transloco.langChanges$.pipe(
      startWith(this.getActiveLang()),
      map(() => this.getActiveLang())
    );
  }

  getActiveLang(): string {
    return this.transloco.getActiveLang();
  }

  translate<T = unknown>(value: CzLabel, params?: {}, lang?: string): T {
    if (!value) return undefined as T;
    if (typeof value === 'string') return this.transloco.translate(value, params, lang);

    return (czLabelToString(value, this.getActiveSimpleLang(), this.getAvailableSimpleLangs()) as unknown) as T;
  }

  czLabelToString(value: CzLabel, lang: string = this.getActiveSimpleLang()): string {
    return czLabelToString(value, lang, this.getAvailableSimpleLangs());
  }

  selectTranslate<T = unknown>(key: CzLabel, params?: {}, lang?: string): Observable<T> {
    if (lang) return of(this.translate(key, params, lang));

    return this.selectActiveLang().pipe(map(activeLang => this.translate(key, params, activeLang)));
  }

  getAvailableLangs(): string[] {
    // looking at the typing of Transloco, it should work, but it doesn't for some reason
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.transloco.getAvailableLangs() as any[]).map(lang => (typeof lang === 'string' ? lang : lang.id));
  }

  getAvailableSimpleLangs(): string[] {
    return this.getAvailableLangs().map(lang => this.toSimpleLang(lang));
  }

  private toSimpleLang(lang: string): string {
    return lang.split('-')[0];
  }
}

export const i18nTranslocoServiceProvider: Provider = {
  provide: I18nService,
  useClass: I18nTranslocoService
};
