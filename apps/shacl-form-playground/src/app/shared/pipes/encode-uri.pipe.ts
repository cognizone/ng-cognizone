import { Pipe, PipeTransform } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { UriEncoder } from '@shfp/core';

@Pipe({
  name: 'encodeUri',
})
export class EncodeUriPipe implements PipeTransform {
  constructor(private uriEncoder: UriEncoder) {}

  transform(value: string | JsonModel): string {
    const uri = typeof value === 'string' ? value : value['@id'];
    return this.uriEncoder.encode(uri);
  }
}
