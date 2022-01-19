import { ElasticSearchResponse } from '../models';

/**
 * Aggregate all `_source` in all `hits` of an {@link ElasticResponse} in a single array
 *
 * @param response The json returned by a _search elastic call
 */
export function extractSourcesFromElasticResponse<T>(response: ElasticSearchResponse<T>): T[] {
  return response.hits.hits.map(hit => hit._source);
}
