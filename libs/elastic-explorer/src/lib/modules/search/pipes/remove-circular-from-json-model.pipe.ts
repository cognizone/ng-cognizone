import { Pipe, PipeTransform } from '@angular/core';
import { isJsonModel, JsonModel } from '@cognizone/json-model';
import produce from 'immer';

// FIXME still buggy

@Pipe({
  name: 'removeCircularFromJsonModel',
})
export class RemoveCircularFromJsonModelPipe implements PipeTransform {
  transform(value: JsonModel): JsonModel {
    return produce(value, draft => {
      this._transform(draft, new Set());
    });
  }

  private _transform<T>(model: T, alreadySeen: Set<string>): void {
    if (!isJsonModel(model)) return;
    alreadySeen.add(model['@id']);
    Object.entries(model).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.filter(isJsonModel).forEach(v => this._transform(v, alreadySeen));
      } else if (isJsonModel(value)) {
        if (alreadySeen.has(value['@id'])) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (model as any)[key] = `[Circular] ${value['@id']}`;
        } else {
          alreadySeen.add(value['@id']);
        }
      }
    });
  }
}
