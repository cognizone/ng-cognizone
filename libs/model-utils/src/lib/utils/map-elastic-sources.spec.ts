/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ElasticSearchResponse } from '../models';
import { mapElasticSources } from './map-elastic-sources';

describe('mapElasticSources', () => {
  const response: ElasticSearchResponse<{ data: { uri: string } }> = require('../../test/elastic-search-response-1.json');
  const firstUri = 'https://fedlex.data.admin.ch/vocabulary/legal-taxonomy/10027';

  it('should map sources', () => {
    const mapped = mapElasticSources(response, source => source.data.uri);
    expect(mapped.hits.hits.length).toBe(response.hits.hits.length);
    expect(mapped.hits.hits[0]._source).toBe(firstUri);
  });
});
