import { Pipe, PipeTransform } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { UriHelper } from '@cognizone/shacl/core';

@Pipe({
  name: 'isNew',
})
export class IsNewPipe implements PipeTransform {
  constructor(private uriHelper: UriHelper) {}

  transform(value: string | JsonModel): boolean {
    return this.uriHelper.isNew(value);
  }
}
