import { inject, Pipe, PipeTransform } from '@angular/core';
import { I18N_SERVICE, I18nService } from '@cognizone/i18n';
// eslint-disable-next-line @nx/enforce-module-boundaries -- needed for sub entries in lib
import { getOneValue, JsonLdNode, JsonLdValue, JsonLdValueLang } from '@cognizone/json-ld-core';

@Pipe({
  name: 'jsonLdLabel',
  standalone: true,
})
export class JsonLdLabelPipe implements PipeTransform {
  private i18nService: I18nService = inject(I18N_SERVICE);

  transform(node: JsonLdNode, propertyKey: string): string {
    const values = node[propertyKey as keyof JsonLdNode] as unknown as JsonLdValue[];
    if (!values || values.length === 0) return '';
    const sorted = [...values].sort((a, b) => {
      if ('@language' in a) return 1;
      if ('@language' in b) return -1;
      return 0;
    });
    const value = (sorted as JsonLdValueLang[]).find(v => v['@language'] === this.i18nService.getActiveLang())?.['@value'];

    return value ?? getOneValue(sorted) ?? '';
  }
}
