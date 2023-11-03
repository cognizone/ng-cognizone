import { Pipe, PipeTransform } from '@angular/core';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- needed for sub entries in lib
import { getOneValue, JsonLdNode, JsonLdValue } from '@cognizone/json-ld/core';

@Pipe({
  name: 'jsonLdGetValue',
  standalone: true,
})
export class JsonLdGetValuePipe implements PipeTransform {
  transform(node: JsonLdNode, propertyKey: string): string {
    const values = node[propertyKey as keyof JsonLdNode] as unknown as JsonLdValue[];
    return getOneValue(values) ?? '';
  }
}
