import { ElasticQuery } from './elastic-query';

// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html
export interface RangeQuery extends ElasticQuery {
  range: {
    [field: string]: string | RangeQueryInner;
  };
}

export interface RangeQueryInner {
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  format?: string;
  relation?: 'INTERSECTS' | 'CONTAINS' | 'WITHIN';
  time_zone?: string;
  boost?: number;
}

export function rangeQuery(field: string, options: RangeQueryInner & { _name?: string }): RangeQuery {
  const { _name, ...otherOptions } = options;
  return {
    _name: _name,
    range: {
      [field]: {
        ...otherOptions,
      },
    },
  };
}
