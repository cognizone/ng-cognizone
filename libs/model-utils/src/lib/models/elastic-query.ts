/**
 * This aims to describe an elastic search query, but it can be quite limitative for now
 * @deprecated use the one from `@cognizone/elastic` instead
 */
export interface ElasticQuery {
  from?: number;
  size?: number;
  track_total_hits?: boolean;
  query: {
    bool?: {
      filter: unknown[];
      must: unknown[];
      must_not: unknown[];
      should: unknown[];
      minimum_should_match?: number;
    };
    match?: object;
  };
  aggs?: { [key: string]: AggregationQuery };
  sort?: { [field: string]: ElasticSort };
}

/**
 * @ignore
 */
export type AggregationQuery =
  | {
      terms: {
        field: string;
        size: number;
      };
    }
  | unknown;

/**
 * @ignore
 */
export interface ElasticSort {
  order: 'desc' | 'asc';
  missing?: '_last' | '_first';
  unmapped_type?: string;
  mode?: 'max' | 'min' | 'sum' | 'avg' | 'median';
}

/**
 * Create a basic structure for an {@link ElasticQuery}
 * @deprecated
 */
export function createElasticQuery(): ElasticQuery {
  return {
    query: {
      bool: {
        filter: [],
        must: [],
        must_not: [],
        should: []
      }
    },
    aggs: {}
  };
}
