import { Injectable } from '@angular/core';
import { getLangStringValue, LangString, LangStringSimple, Nil } from '@cognizone/model-utils';
import { TranslocoService } from '@ngneat/transloco';

@Injectable()
export class I18nService {
  constructor(private transloco: TranslocoService) {}

  getActiveSimpleLang(): string {
    return this.toSimpleLang(this.transloco.getActiveLang());
  }

  translate(value: Nil<LangString | LangStringSimple | string>, lang?: string): Nil<string> {
    if (!value) return undefined;
    if (typeof value === 'string') return this.transloco.translate(value, undefined, lang);

    const activeLang = this.toSimpleLang(lang ? lang : this.transloco.getActiveLang());
    const fallbacks = (this.transloco.getAvailableLangs() as string[]).map(lang => this.toSimpleLang(lang));

    return getLangStringValue(value, activeLang, fallbacks);
  }

  private toSimpleLang(lang: string): string {
    return lang.split('-')[0];
  }
}
