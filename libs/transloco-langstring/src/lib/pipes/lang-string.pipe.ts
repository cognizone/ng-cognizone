import { Pipe, PipeTransform } from '@angular/core';
import { getLangStringValue, LangString, LangStringSimple, Nil } from '@cognizone/model-utils';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'czLangString',
})
export class LangStringPipe implements PipeTransform {
  constructor(private transloco: TranslocoService) {}

  transform(value: Nil<LangString | LangStringSimple | string>, lang: string = this.transloco.getActiveLang()): Nil<string> {
    if (!value || typeof value === 'string') return value as string | undefined;
    return getLangStringValue(value, this.toShortLang(lang), this.getOtherLangs());
  }

  private toShortLang(lang: string): string {
    return lang.split('-')[0];
  }

  private getOtherLangs(): string[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const langs = this.transloco.getAvailableLangs() as any[];

    return langs.map(lang => (typeof lang === 'string' ? lang : lang.id)).map(lang => this.toShortLang(lang));
  }
}
