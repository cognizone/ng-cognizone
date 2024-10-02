import { Pipe, PipeTransform } from '@angular/core';
import { AsyncResult } from '@cognizone/model-utils';

@Pipe({
  name: 'getSuccess',
  standalone: true,
})
export class GetSuccessPipe implements PipeTransform {
  transform<T>(value: AsyncResult<T>): T | undefined {
    return value.type === 'success' ? value.content : undefined;
  }
}
