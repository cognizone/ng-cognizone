import { ElasticQuery } from './elastic-query';

export interface ElasticDslQuery {
  from?: number;
  size?: number;
  query?: ElasticQuery;
  aggs?: unknown;
  highlight?: unknown;
}
