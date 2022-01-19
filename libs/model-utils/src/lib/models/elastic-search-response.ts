/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Describe the response of a search done on Elastic 7+, with `_source` in hits
 * being typed with `T`
 */
export interface ElasticSearchResponse<T> {
  took: number;
  timed_out: boolean;
  _shards: {
    total: number;
    successful: number;
    skipped: number;
    failed: number;
  };
  hits: {
    total: {
      value: number;
      relation: 'eq' | 'gte';
    };
    max_score: number | null;
    hits: ElasticHit<T>[];
  };
  aggregations: { [key: string]: ElasticAggregation };
}

/**
 * A hit in an elastic response, with `_source` being typed as `T`
 */
export interface ElasticHit<T> {
  _index: string;
  _type: string;
  _id: string;
  _score?: number;
  _source: T;
  sort?: number[]; // not sure if always numbers
}

/**
 * The content of an elastic aggregation done trough a _search call
 */
export interface ElasticAggregation {
  doc_count_error_upper_bound: number;
  sum_other_doc_count: number;
  buckets?: ElasticBucket[];
}

/**
 * A bucket that is inside an {@link ElasticAggregation}
 */
export interface ElasticBucket {
  key: number | string; // maybe unknown
  key_as_string?: string;
  doc_count: number;
}
