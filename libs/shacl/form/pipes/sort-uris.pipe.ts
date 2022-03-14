import { Pipe, PipeTransform } from '@angular/core';
import { UriHelper } from '@cognizone/shacl/core';

@Pipe({
  name: 'sortUris',
})
export class SortUrisPipe implements PipeTransform {
  constructor(private uriHelper: UriHelper) {}

  transform(value: string[]): string[] {
    return [...value].sort((a, b) => {
      const isNewA = this.uriHelper.isNew(a);
      const isNewB = this.uriHelper.isNew(b);
      if (isNewA === isNewB) {
        return a.localeCompare(b, undefined, { numeric: true });
      }
      if (this.uriHelper.isNew(a)) return 1;
      if (this.uriHelper.isNew(b)) return -1;
      return 0;
    });
  }
}
