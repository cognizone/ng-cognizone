import { Pipe, PipeTransform } from '@angular/core';
import { AsyncResult, ResultError } from '@cognizone/model-utils';

@Pipe({
  name: 'isError',
  standalone: true,
})
export class IsErrorPipe implements PipeTransform {
  transform(value: AsyncResult): value is ResultError<unknown> {
    return value.type === 'error';
  }
}
