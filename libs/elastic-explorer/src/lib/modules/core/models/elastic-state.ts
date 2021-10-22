import { Nil, notNil } from '@cognizone/model-utils';
import { get, isEqual, uniqWith } from 'lodash-es';

export interface ElasticState {
  cluster_name: string;
  cluster_uuid: string;
  version: number;
  state_uuid: string;
  master_node: string;
  metadata: ElasticStateMetadata;
}

export interface ElasticStateMetadata {
  indices: MetadataIndices;
}

export interface MetadataIndices {
  [index: string]: IndexState;
}

export interface IndexState {
  mappings: {
    _doc: {
      properties: ElasticProperties;
    };
  };
}

interface ElasticProperties {
  [key: string]: ElasticPropertyType | { properties: ElasticProperties };
}

export type ElasticPropertyType = { type: 'keyword' } | { type: 'text'; fields: { [key: string]: ElasticPropertyType } };

export function getIndices(state: ElasticState): string[] {
  return Object.keys(state?.metadata?.indices ?? {});
}

export function getPropertyType(state: ElasticState, index: Nil<string>, path: string): ElasticPropertyType | undefined {
  const indices: string[] = [];
  if (index) {
    indices.push(index);
  } else {
    indices.push(...Object.keys(state?.metadata?.indices ?? {}));
  }
  const typeProperties = indices.map(ind => getIndexPropertyType(state, ind, path)).filter(notNil);

  const uniques = uniqWith(typeProperties, isEqual);

  if (uniques.length === 1) return uniques[0];
  return undefined;
}

export function getIndexPropertyType(state: ElasticState, index: string, path: string): ElasticPropertyType | undefined {
  const subPath = path
    .split('.')
    .map((value, i, arr) => (i < arr.length - 1 ? `${value}.properties` : value))
    .join('.');
  return get(state, `metadata.indices.${index}.mappings._doc.properties.${subPath}`);
}
