import { inject, Pipe, PipeTransform } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries -- needed for sub entries in lib
import { JsonLdNode } from '@cognizone/json-ld-core';
import { JsonLdLabelService } from './json-ld-label.service';

@Pipe({
  name: 'jsonLdLabel',
  standalone: true,
})
export class JsonLdLabelPipe implements PipeTransform {
  private jsonLdLabelService: JsonLdLabelService = inject(JsonLdLabelService);

  transform(node: JsonLdNode, propertyKey: string): string {
    return this.jsonLdLabelService.getLabel(node, propertyKey);
  }
}
