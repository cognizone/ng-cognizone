import { Pipe, PipeTransform } from '@angular/core';
import { Nil } from '@cognizone/model-utils';

@Pipe({
  name: 'ellipsis',
})
export class EllipsisPipe implements PipeTransform {
  transform(value: Nil<string>, maxLength: number = 50): string {
    if (!value) return '';
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
  }
}
