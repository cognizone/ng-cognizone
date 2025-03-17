import { ElasticQuery } from './elastic-query';

export interface ElasticDslQuery<T extends ElasticQuery = ElasticQuery> {
  from?: number;
  size?: number;
  query?: T;
  aggs?: unknown;
  highlight?: unknown;
  sort?: unknown[];
}
