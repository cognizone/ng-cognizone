import { inject, Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { map, Observable, startWith } from 'rxjs';

// eslint-disable-next-line @nx/enforce-module-boundaries -- needed for sub entries in lib
import { getOneValue, JsonLdNode, JsonLdValue, JsonLdValueLang } from '@cognizone/json-ld-core';
@Injectable({
  providedIn: 'root',
})
export class JsonLdLabelService {
  private i18nService: TranslocoService = inject(TranslocoService);
  // TODO find out why injecting this fails while in angular 18 app
  // private i18nService: I18nService = inject(I18N_SERVICE);

  getLabel(node: JsonLdNode, propertyKey: string, lang: string = this.i18nService.getActiveLang()): string {
    const values = node[propertyKey as keyof JsonLdNode] as unknown as JsonLdValue[];
    if (!values || values.length === 0) return '';

    const simpleLang = lang.split('-')[0];
    const sorted = [...values].sort((a, b) => {
      if ('@language' in a) return 1;
      if ('@language' in b) return -1;
      return 0;
    });
    const value = (sorted as JsonLdValueLang[]).find(v => v['@language'] === lang || v['@language'] === simpleLang)?.['@value'];

    return value ?? getOneValue(sorted) ?? '';
  }

  selectLabel(node: JsonLdNode, propertyKey: string): Observable<string> {
    return this.i18nService.langChanges$.pipe(
      startWith(this.i18nService.getActiveLang()),
      map(lang => this.getLabel(node, propertyKey, lang))
    );
  }
}
