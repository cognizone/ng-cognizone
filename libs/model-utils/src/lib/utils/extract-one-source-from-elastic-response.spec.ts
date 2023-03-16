/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ElasticSearchResponse } from '../models';
import { extractOneSourceFromElasticResponse } from './extract-one-source-from-elastic-response';

describe('extractOneSourceFromElasticResponse', () => {
  const response: ElasticSearchResponse<{ data: { uri: string } }> = require('../../test/elastic-search-response-1.json');
  const firstUri = 'https://fedlex.data.admin.ch/vocabulary/legal-taxonomy/10027';

  it('should extract one source', () => {
    const source = extractOneSourceFromElasticResponse(response);
    expect(source.data.uri).toBe(firstUri);
  });
});
