import { Pipe, PipeTransform } from '@angular/core';
import { PrefixCcService } from '@cognizone/json-model';

@Pipe({
  name: 'collapseUri',
})
export class CollapseUriPipe implements PipeTransform {
  constructor(private prefixCc: PrefixCcService) {}

  transform(value: string): unknown {
    return this.prefixCc.compactUri(value);
  }
}
