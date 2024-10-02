import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';
import { Result } from '@cognizone/model-utils';
import { Observable } from 'rxjs';

import { FetchOptions } from '../models/fetch-options';

export abstract class Fetcher<T> {
  abstract fetch(options: FetchOptions<T>): Observable<Result<ExpandedJsonLdContainer>>;
}
