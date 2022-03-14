import { Pipe, PipeTransform } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

@Pipe({
  name: 'manyToArray',
})
export class ManyToArrayPipe implements PipeTransform {
  transform<T>(value: Many<T>): T[] {
    return manyToArray(value);
  }
}
