import { ElasticQuery } from './elastic-query';

// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html
export interface MatchPhrasePrefixQuery extends ElasticQuery {
  match_phrase_prefix: {
    [field: string]: MatchPhrasePrefixQueryInner;
  };
}

export interface MatchPhrasePrefixQueryInner {
  query: string;
  analyzer?: string;
  max_expansions?: number;
  slop?: number;
  zero_terms_query?: 'none' | 'all';
}

export function matchPhrasePrefixQuery(
  field: string,
  query: string,
  options?: Omit<MatchPhrasePrefixQueryInner, 'query'> & { _name?: string }
): MatchPhrasePrefixQuery {
  const { _name, ...otherOptions } = options ?? {};
  return {
    _name: _name,
    match_phrase_prefix: {
      [field]: {
        query,
        ...otherOptions,
      },
    },
  };
}
