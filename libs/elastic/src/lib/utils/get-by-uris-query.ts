import { ElasticQuery } from '../models/elastic-query';

export function getByUrisQuery(uris: string[], isKeyword: boolean = true): ElasticQuery {
  return {
    size: uris.length,
    query: {
      bool: {
        must: {
          terms: { [`data.uri${isKeyword ? '.keyword' : ''}`]: uris },
        },
      },
    },
  };
}
