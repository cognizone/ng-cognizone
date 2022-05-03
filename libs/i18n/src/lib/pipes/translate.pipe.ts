import { Pipe, PipeTransform } from '@angular/core';
import { CzLabel } from '@cognizone/model-utils';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'czTranslate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(value: CzLabel, params?: {}, lang?: string): string {
    return this.i18nService.translate(value, params, lang);
  }
}
