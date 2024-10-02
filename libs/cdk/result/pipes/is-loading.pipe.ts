import { Pipe, PipeTransform } from '@angular/core';
import { AsyncResult, ResultLoading } from '@cognizone/model-utils';

@Pipe({
  name: 'isLoading',
  standalone: true,
})
export class IsLoadingPipe implements PipeTransform {
  transform(value: AsyncResult): value is ResultLoading {
    return value.type === 'loading';
  }
}
