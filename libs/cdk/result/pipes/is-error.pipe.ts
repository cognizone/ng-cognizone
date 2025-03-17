import { Pipe, PipeTransform } from '@angular/core';
import { Result, Nil, ResultError } from '@cognizone/model-utils';

@Pipe({
  name: 'isError',
  standalone: true,
})
export class IsErrorPipe implements PipeTransform {
  transform(value: Nil<Result>): value is ResultError<unknown> {
    return value?.type === 'error';
  }
}
