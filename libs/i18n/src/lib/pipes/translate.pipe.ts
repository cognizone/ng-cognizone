import { inject, Pipe, PipeTransform } from '@angular/core';
import { CzLabel } from '@cognizone/model-utils';

import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'czTranslate',
})
export class TranslatePipe implements PipeTransform {
  private i18n: I18nService = inject(I18nService);

  transform(value: CzLabel, params?: {}, lang?: string): string {
    return this.i18n.translate(value, params, lang);
  }
}
