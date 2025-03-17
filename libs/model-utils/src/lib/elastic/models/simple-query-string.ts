import { Many } from '../../models';
import { manyToArray } from '../../utils/many-to-array';
import { ElasticQuery } from './elastic-query';
import { MinimumShouldMatch } from './minimum-should-match';

// https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html
export interface SimpleQueryStringQuery extends ElasticQuery {
  simple_query_string: SimpleQueryStringQueryInner;
}

export interface SimpleQueryStringQueryInner {
  query: string;
  fields?: string[];
  default_operator?: 'OR' | 'AND';
  analyze_wildcard?: boolean;
  analyzer?: string;
  auto_generate_synonyms_phrase_query?: boolean;
  flags?: string;
  fuzzy_max_expansions?: number;
  fuzzy_prefix_length?: number;
  fuzzy_transpositions?: boolean;
  lenient?: boolean;
  minimum_should_match?: MinimumShouldMatch;
  quote_field_suffix?: string;
  boost?: number;
}

export type SimpleQueryStringFlag =
  | 'ALL'
  | 'AND'
  | 'ESCAPE'
  | 'FUZZY'
  | 'NEAR'
  | 'NONE'
  | 'NOT'
  | 'OR'
  | 'PHRASE'
  | 'PRECEDENCE'
  | 'PREFIX'
  | 'SLOP'
  | 'WHITESPACE';

export function simpleQueryStringQuery(
  fields: string[] | undefined,
  query: string,
  options?: Omit<SimpleQueryStringQueryInner, 'query' | 'fields' | 'flags'> & { _name?: string; flags?: Many<SimpleQueryStringFlag> }
): SimpleQueryStringQuery {
  const { _name, flags, ...otherOptions } = options ?? {};
  return {
    _name: _name,
    simple_query_string: {
      query,
      fields,
      flags: manyToArray(flags).join('|') || undefined,
      ...otherOptions,
    },
  };
}
