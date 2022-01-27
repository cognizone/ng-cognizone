import { Pipe, PipeTransform } from '@angular/core';
import { ShaclOptionsService } from '@cognizone/shacl/core';

@Pipe({
  name: 'addI18nPrefix',
})
export class AddI18nPrefixPipe implements PipeTransform {
  constructor(private shaclOptions: ShaclOptionsService) {}

  transform(value: string): string {
    if (!value) return value;
    return `${this.shaclOptions.getOptions().i18n.keywordsPrefix}.${value}`;
  }
}
