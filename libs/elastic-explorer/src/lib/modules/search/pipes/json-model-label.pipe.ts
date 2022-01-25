import { Pipe, PipeTransform } from '@angular/core';
import { CzLabel } from '@cognizone/model-utils';
import { isJsonModel, JsonModel } from '@cognizone/json-model';

@Pipe({
  name: 'jsonModelLabel',
})
export class JsonModelLabelPipe implements PipeTransform {
  private lookFor: string[] = ['title', 'prefLabel', 'label', 'description'];

  transform(value: JsonModel): CzLabel {
    for (const q of this.lookFor) {
      if (!isJsonModel(value)) break;
      let key = Object.keys(value).find(k => k === q);
      if (!key) key = Object.keys(value).find(k => k.includes(q));
      if (key) {
        const label = value[key as keyof JsonModel];
        return (typeof label === 'string' ? { en: label } : label) as CzLabel;
      }
    }

    return '';
  }
}
