import { Many } from '../../models';
import { ElasticQuery } from './elastic-query';
import { MinimumShouldMatch } from './minimum-should-match';

export interface BoolQuery extends ElasticQuery {
  bool: BoolQueryInner;
}

export interface BoolQueryInner {
  must?: Many<ElasticQuery>;
  filter?: Many<ElasticQuery>;
  must_not?: Many<ElasticQuery>;
  should?: Many<ElasticQuery>;
  minimum_should_match?: MinimumShouldMatch;
}
