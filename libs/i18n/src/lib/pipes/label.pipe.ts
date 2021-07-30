import { Pipe, PipeTransform } from '@angular/core';
import { CzLabel, Nil } from '@cognizone/model-utils';

import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'czLabel',
})
export class LabelPipe implements PipeTransform {
  constructor(private i18n: I18nService) {}

  transform(value: Nil<CzLabel>, lang?: string): string | null {
    if (value == null) return null;
    return this.i18n.czLabelToString(value, lang);
  }
}
