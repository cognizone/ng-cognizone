import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '@cognizone/model-utils';

@Pipe({
  name: 'unwrap',
  standalone: true,
})
export class UnwrapPipe implements PipeTransform {
  transform<T>(value: Result<T>, defaultValue: T): T {
    return value.type === 'ok' ? value.content : defaultValue;
  }
}
