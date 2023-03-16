/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ElasticSearchResponse } from '../models';
import { extractSourcesFromElasticResponse } from './extract-sources-from-elastic-response';

describe('extractSourcesFromElasticResponse', () => {
  const response: ElasticSearchResponse<{ data: { uri: string } }> = require('../../test/elastic-search-response-1.json');
  const firstUri = 'https://fedlex.data.admin.ch/vocabulary/legal-taxonomy/10027';

  it('should extract sources', () => {
    const sources = extractSourcesFromElasticResponse(response);
    expect(sources.length).toBe(response.hits.hits.length);
    expect(sources[0].data.uri).toBe(firstUri);
  });
});
