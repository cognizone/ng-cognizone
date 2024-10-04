import { Pipe, PipeTransform } from '@angular/core';

// eslint-disable-next-line @nx/enforce-module-boundaries -- needed for sub entries in lib
import { ExpandedJsonLdContainer, getAllValues, JsonLdNode, JsonLdValue } from '@cognizone/json-ld-core';
import { Nil } from '@cognizone/model-utils';

@Pipe({
  name: 'jsonLdGetAllValues',
  standalone: true,
})
export class JsonLdGetAllValuesPipe implements PipeTransform {
  transform(node: Nil<JsonLdNode>, propertyKey: string, graph: ExpandedJsonLdContainer): string[] {
    const values = node?.[propertyKey as keyof JsonLdNode] as unknown as JsonLdValue[];
    return getAllValues<string>(values, graph) ?? [];
  }
}
