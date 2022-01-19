import { ElasticSearchResponse } from '../models';
import { extractSourcesFromElasticResponse } from './extract-sources-from-elastic-response';

/**
 * Extract the first `_source` of the first `hits` of an {@link ElasticResponse}
 *
 * @param response The json returned by a _search elastic call
 */
export function extractOneSourceFromElasticResponse<T>(response: ElasticSearchResponse<T>): T {
  return extractSourcesFromElasticResponse(response)[0];
}
