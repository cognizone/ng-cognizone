import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '@cognizone/model-utils';

@Pipe({
  name: 'getSuccess',
  standalone: true,
})
export class GetSuccessPipe implements PipeTransform {
  transform<T>(value: Result<T>): T | undefined {
    return value.type === 'success' ? value.content : undefined;
  }
}
