import { ElasticSearchResponse } from '../models';

/**
 * Return a transformed {@link ElasticResponse} where all `_source` are transformed using the given `project` function
 *
 * @param response The json returned by a _search elastic call
 * @param project The projection function
 */
export function mapElasticSources<T, U>(response: ElasticSearchResponse<T>, project: (data: T) => U): ElasticSearchResponse<U> {
  return { ...response, hits: { ...response.hits, hits: response.hits.hits.map(hit => ({ ...hit, _source: project(hit._source) })) } };
}
