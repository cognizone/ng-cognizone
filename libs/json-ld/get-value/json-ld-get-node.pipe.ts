import { Pipe, PipeTransform } from '@angular/core';
import { ExpandedJsonLdContainer, getOneNode, JsonLdNode, JsonLdValue } from '@cognizone/json-ld-core';
import { Nil } from '@cognizone/model-utils';

@Pipe({
  name: 'jsonLdGetNode',
  standalone: true,
})
export class JsonLdGetNodePipe implements PipeTransform {
  transform(node: Nil<JsonLdNode>, propertyKey: string, graph: ExpandedJsonLdContainer): JsonLdNode | undefined {
    const values = node?.[propertyKey as keyof JsonLdNode] as unknown as JsonLdValue[];
    return getOneNode(values, graph);
  }
}
