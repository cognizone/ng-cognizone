import { Injectable } from '@angular/core';
import { I18nService } from '@cognizone/i18n';
import { CzLabel } from '@cognizone/model-utils';

//@ts-ignore didn't find a better way to handle this yet, everything else failed
import Handlebars from 'handlebars/dist/handlebars.min.js';

@Injectable({
  providedIn: 'root',
})
export class HandlebarService {
  constructor(private i18nService: I18nService) {}

  compileTemplate(template: string): Function {
    Handlebars.registerHelper('date', (date: Date) => {
      if (!date) return '';
      return date.toLocaleDateString(this.i18nService.getActiveLocale(), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    });
    Handlebars.registerHelper('label', (label: CzLabel) => {
      if (!label) return '';
      // FIXME hardcoded lang
      return this.i18nService.czLabelToString(label, undefined, ['fr']);
    });
    return Handlebars.compile(template);
  }
}
