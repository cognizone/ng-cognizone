import { Many } from '../../models';
import { manyToArray } from '../../utils';
import { BoolQuery, BoolQueryInner } from './bool-query';
import { ElasticQuery } from './elastic-query';
import { MinimumShouldMatch } from './minimum-should-match';

export class BoolQueryBuilder {
  constructor(private state: BoolQueryInner = {}) {}

  must(queries: Many<ElasticQuery>, options?: BoolSubqueriesOptions): BoolQueryBuilder {
    return this.#changeSubQuery('must', queries, options);
  }

  mustNot(queries: Many<ElasticQuery>, options?: BoolSubqueriesOptions): BoolQueryBuilder {
    return this.#changeSubQuery('must_not', queries, options);
  }

  filter(queries: Many<ElasticQuery>, options?: BoolSubqueriesOptions): BoolQueryBuilder {
    return this.#changeSubQuery('filter', queries, options);
  }

  should(queries: Many<ElasticQuery>, options?: BoolSubqueriesOptions): BoolQueryBuilder {
    return this.#changeSubQuery('should', queries, options);
  }

  minimumShouldMatch(value: MinimumShouldMatch | undefined): BoolQueryBuilder {
    return new BoolQueryBuilder({ ...this.state, minimum_should_match: value });
  }

  build(): BoolQuery {
    return { bool: this.state };
  }

  #changeSubQuery(
    key: 'must' | 'should' | 'filter' | 'must_not',
    queries: Many<ElasticQuery>,
    options?: BoolSubqueriesOptions
  ): BoolQueryBuilder {
    const old = this.state[key];
    const newValue = !old || options?.override ? queries : [...manyToArray(old), ...manyToArray(queries)];
    const newState = { ...this.state, [key]: newValue };

    return new BoolQueryBuilder(newState);
  }
}

export interface BoolSubqueriesOptions {
  override?: boolean;
}
