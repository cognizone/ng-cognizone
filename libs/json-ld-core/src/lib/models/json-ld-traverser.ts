import { Many, manyToArray, Primitive } from '@cognizone/model-utils';
import { getAllRawValues, getAllValues } from '../utils';
import { AnyJsonLdNode, isJsonLdValueReference, JsonLdNode, JsonLdValue, JsonLdValueLiteral } from './json-ld';
import { ExpandedJsonLdContainer } from './json-ld-container';

export class JsonLdTraverser {
  constructor(private readonly options: TraverserOptions) {}

  getNodeTraverser(uri: string): JsonLdNodeTraverser {
    return new JsonLdNodeTraverser(this.options, uri);
  }
}

export class JsonLdNodeTraverser {
  constructor(private readonly options: TraverserOptions, public readonly uri: string) {}

  getNodes(predicateUri: string): JsonLdNodeTraverser[] {
    const node = (this.options.jsonLd.nodes[this.uri] ?? { '@id': this.uri, '@type': [] }) as AnyJsonLdNode;
    const values = node[predicateUri] ?? [];
    return getAllValues(values, this.options.jsonLd, 'reference').map(uri => new JsonLdNodeTraverser(this.options, uri as string));
  }

  getNode(predicateUri: Many<string>): JsonLdNodeTraverser | undefined {
    const uris = manyToArray(predicateUri);
    if (!uris.length) return undefined;
    // eslint-disable-next-line
    let node: JsonLdNodeTraverser | undefined = this;
    for (const uri of uris) {
      node = node.getNodes(uri)[0];
      if (!node) return undefined;
    }
    return node;
  }

  getAttributes<T extends Primitive>(predicateUri: Many<string>): T[] {
    return this.getRawAttributes(predicateUri).map(value => {
      if (isJsonLdValueReference(value)) {
        return value['@id'] as T;
      }
      return (value as unknown as JsonLdValueLiteral)['@value'] as T;
    });
  }

  getAttribute<T extends Primitive>(predicateUri: Many<string>): T | undefined {
    return this.getAttributes(predicateUri)[0] as T | undefined;
  }

  getRawAttributes<T extends JsonLdValue>(predicateUri: Many<string>): T[] {
    const uris = manyToArray(predicateUri);
    if (!uris.length) return [];
    const lastUri = uris[uris.length - 1];
    // eslint-disable-next-line
    let nodeTraverser: JsonLdNodeTraverser | undefined = this;
    if (uris.length > 1) {
      const nodePath = uris.slice(0, -1);
      nodeTraverser = this.getNode(nodePath);
    }

    const node = (nodeTraverser?.unwrap() ?? { '@id': this.uri }) as AnyJsonLdNode;
    const values = node[lastUri] ?? [];
    return getAllRawValues(values, this.options.jsonLd) as T[];
  }

  getRawAttribute<T extends JsonLdValue>(predicateUri: Many<string>): T | undefined {
    return this.getRawAttributes(predicateUri)[0] as T | undefined;
  }

  unwrap(): JsonLdNode {
    return this.options.jsonLd.nodes[this.uri];
  }
}

export interface TraverserOptions {
  jsonLd: ExpandedJsonLdContainer;
}
