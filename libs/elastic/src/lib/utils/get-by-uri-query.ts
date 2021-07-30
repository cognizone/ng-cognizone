import { ElasticQuery } from '../models/elastic-query';

export function getByUriQuery(uri: string, isKeyword: boolean = true): ElasticQuery {
  return {
    size: 1,
    query: {
      bool: {
        must: { term: { [`data.uri${isKeyword ? '.keyword' : ''}`]: uri } },
      },
    },
  };
}
