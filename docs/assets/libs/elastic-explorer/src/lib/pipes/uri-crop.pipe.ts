import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uriCrop'
})
export class UriCropPipe implements PipeTransform {
  transform(value: string, enabled: boolean = true): string {
    return value;
    // return value ? value.replace(/^http(s)?\:\/\/[\w\.]+\//, '') : '';
  }
}
