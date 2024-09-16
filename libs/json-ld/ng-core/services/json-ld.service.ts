/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import {
  ExpandedJsonLdContainer,
  isJsonLdValueLiteral,
  isJsonLdValueReference,
  JsonLdGraph,
  JsonLdGraphCz,
  JsonLdNode,
  JsonLdValue,
} from '@cognizone/json-ld-core';
import { UriGenerator } from '@cognizone/lod';
import { RDF, XSD } from '@cognizone/lod-core';
import { Many, manyToArray } from '@cognizone/model-utils';
import { produce } from 'immer';
import * as jsonldLib from 'jsonld';

@Injectable({
  providedIn: 'root',
})
export class JsonLdService {
  private uriGenerator = inject(UriGenerator);

  async expand<T>(jsonLd: JsonLdGraph | JsonLdGraphCz, options?: ExpandOptions): Promise<ExpandedJsonLdContainer<T>> {
    // TODO move this logic after expansion
    if ('data' in jsonLd) {
      let hasIt = false;
      Object.values(jsonLd.data).forEach((node: any) => {
        if (node['@type']) return;
        if (node['rdf:type']) {
          hasIt = true;
          node['@type'] = manyToArray(node['rdf:type']).map(type => (typeof type === 'string' ? type : type['@id']));
          delete node['rdf:type'];
        }
      });
      if (hasIt) {
        console.warn('Found some nodes with rdf:type instead of @type, this is not supported');
      }
    }
    let nodesList = (await jsonldLib.expand(jsonLd as any)) as JsonLdNode[];
    if (options?.flatten) {
      nodesList = (await jsonldLib.flatten(nodesList as any)) as unknown as JsonLdNode[];
    }

    const container: ExpandedJsonLdContainer<T> = {
      nodes: nodesList.reduce((acc, node) => {
        acc[node['@id']] = node;
        return acc;
      }, {} as ExpandedJsonLdContainer['nodes']),
    };
    if ('facets' in jsonLd) {
      container.facets = jsonLd.facets as T;
    }
    return container;
  }

  async collapse(jsonLd: ExpandedJsonLdContainer): Promise<any> {
    jsonLd = this.preCollapseCleaning(jsonLd);
    return jsonldLib.compact(Object.values(jsonLd.nodes) as any, {});
  }

  isOfType(node: JsonLdNode | Many<string>, type: string): boolean {
    const types =
      typeof node === 'object' && '@type' in node ? node['@type'] : manyToArray(node).map(t => (typeof t === 'string' ? t : undefined));
    return types.some(t => t === type);
  }

  isOfTypeGuard<T extends JsonLdNode>(node: JsonLdNode, type: string): node is T {
    return this.isOfType(node, type);
  }

  createNode<T extends JsonLdNode>(type: Many<string> | undefined, uri: string = this.uriGenerator.create(type)): T {
    const obj = { '@id': uri } as T;
    if (type) obj['@type'] = manyToArray(type);
    return obj;
  }

  createBlankNode(type?: Many<string> | undefined): JsonLdNode {
    return this.createNode(type, this.uriGenerator.create(type, { isBlankNode: true }));
  }

  // TODO generalize facets?
  nodeToGraph(node: JsonLdNode): ExpandedJsonLdContainer {
    return {
      nodes: {
        [node['@id']]: node,
      },
      facets: {
        hanami: {
          rootUri: node['@id'],
        },
      },
    };
  }

  // TODO lazy keys
  getProxy<T extends JsonLdNode>(jsonLd: ExpandedJsonLdContainer, nodeUri: string, proxyCache: { [uri: string]: JsonLdNode } = {}): T {
    if (proxyCache[nodeUri]) return proxyCache[nodeUri] as T;
    const node = jsonLd.nodes[nodeUri];
    // eslint-disable-next-line @typescript-eslint/no-this-alias -- needed to access this in the proxy
    const service = this;

    const dummyObj = {} as any;

    Object.assign(dummyObj, node);

    const proxiedProperties = new Set<string>();

    return (proxyCache[nodeUri] = new Proxy(dummyObj, {
      get(target, p) {
        if (typeof p === 'symbol' || p.startsWith('@')) return target[p as keyof typeof node];
        if (proxiedProperties.has(p)) return target[p as keyof typeof node];
        const values = node[p as keyof typeof node] as unknown as JsonLdValue[] | undefined;
        if (!values) return undefined;

        target[p as keyof typeof node] = values.map(v => {
          if (isJsonLdValueReference(v)) {
            const uri = v['@id'];
            return jsonLd.nodes[uri] ? service.getProxy(jsonLd, uri, proxyCache) : v;
          }

          return v;
        });
        proxiedProperties.add(p);
        return target[p as keyof typeof node];
      },
    }) as T);
  }

  private preCollapseCleaning(jsonLd: ExpandedJsonLdContainer): ExpandedJsonLdContainer {
    return produce(jsonLd, draft => {
      Object.values(draft.nodes).forEach(node => {
        Object.entries(node).forEach(([propertyKey, values]) => {
          if (propertyKey.startsWith('@') || !Array.isArray(values)) return;
          values.forEach((v: unknown) => {
            if (isJsonLdValueLiteral(v) && '@type' in v && '@language' in v && !!v['@language']) {
              delete v['@type'];
            } else if (isJsonLdValueLiteral(v) && v['@type'] === RDF.langString && (!('@language' in v) || !v['@language'])) {
              v['@type'] = XSD.string;
            }
          });
        });
      });
    });
  }
}

export interface ExpandOptions {
  flatten?: boolean;
}
