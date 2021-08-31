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
