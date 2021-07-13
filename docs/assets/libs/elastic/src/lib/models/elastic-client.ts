import { ElasticSearchResponse } from '@cognizone/model-utils';
import { Observable } from 'rxjs';

import { ElasticQuery } from './elastic-query';

export interface IElasticClient {
  search(query: ElasticQuery): Observable<ElasticSearchResponse<unknown>>;
  searchOne(query: ElasticQuery): Observable<unknown>;
}
