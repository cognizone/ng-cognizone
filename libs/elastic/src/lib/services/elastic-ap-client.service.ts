import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticSearchResponse, extractOneSourceFromElasticResponse } from '@cognizone/model-utils';
import { ApplicationProfile } from '@cognizone/ng-application-profile';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ElasticApClient {
  constructor(private http: HttpClient) {}

  fetchById({ index, id, baseUrl, fetchMethod }: ElasticApClientFetchOptions): Observable<ApplicationProfile> {
    type Response = ElasticSearchResponse<{ json: string }>;
    let query$: Observable<Response>;

    if (fetchMethod === 'GET') {
      const url = `${baseUrl}/get-by-id/${index}/${id}`;
      query$ = this.http.get<Response>(url);
    } else {
      const url = `${baseUrl}/${index}/_search`;
      query$ = this.http.post<Response>(url, {
        query: {
          terms: {
            _id: [id],
          },
        },
      });
    }

    return query$.pipe(
      map(extractOneSourceFromElasticResponse),
      map(({ json }) => JSON.parse(json)),
      shareReplay(1)
    );
  }
}

export interface ElasticApClientFetchOptions {
  baseUrl: string;
  fetchMethod: 'GET' | 'POST';
  id: string;
  index: string;
}
