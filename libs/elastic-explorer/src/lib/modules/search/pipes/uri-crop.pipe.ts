import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uriCrop',
})
export class UriCropPipe implements PipeTransform {
  transform(value: string): string {
    return value;
  }
}
