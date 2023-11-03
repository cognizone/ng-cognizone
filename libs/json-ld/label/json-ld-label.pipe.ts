import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '@cognizone/i18n';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- needed for sub entries in lib
import { getOneValue, JsonLdNode, JsonLdValue, JsonLdValueLang } from '@cognizone/json-ld/core';

@Pipe({
  name: 'jsonLdLabel',
  standalone: true,
})
export class JsonLdLabelPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(node: JsonLdNode, propertyKey: string): string {
    const values = node[propertyKey as keyof JsonLdNode] as unknown as JsonLdValue[];
    if (!values || values.length === 0) return '';
    const sorted = [...values].sort((a, b) => {
      if ('@language' in a) return 1;
      if ('@language' in b) return -1;
      return 0;
    });
    const value = (sorted as JsonLdValueLang[]).find(
      v => v['@language'] === this.i18nService.getActiveLang() || v['@language'] === this.i18nService.getActiveSimpleLang()
    )?.['@value'];

    return value ?? getOneValue(sorted) ?? '';
  }
}
