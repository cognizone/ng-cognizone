import { Injectable } from '@angular/core';
import { dateToDateString, Dictionary, ElasticAggregation } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserAction } from '../model/user-action';
import { UserActionClient } from './user-action-client.service';
import { UserActionOptionsService } from './user-actions-options.service';

@Injectable()
export class UserActionService {
  constructor(private client: UserActionClient, private optionsService: UserActionOptionsService) {}

  search(options: UserActionSearchOptions): Observable<{ actions: UserAction[]; total: number; possibleActionNames: string[] }> {
    const query = this.buildQuery(options);
    return this.client.searchRaw<UserAction>(query).pipe(
      map(res => ({
        actions: res.hits.hits.map(h => h._source),
        total: res.hits.total.value,
        possibleActionNames: this.getOptionsFromAggregations(res.aggregations),
      }))
    );
  }

  getOptionsFromAggregations(aggregation: Dictionary<ElasticAggregation>): string[] {
    const options: string[] = [];
    Object.values(aggregation).forEach(key => {
      key.buckets?.forEach(bucket => {
        options.push(Object.values(bucket)[0]);
      });
    });
    return options.filter(option => option);
  }

  private buildQuery(options: UserActionSearchOptions): {} {
    const query = {
      from: options.from,
      size: options.size,
      sort: [{ start: { missing: '_last', order: 'desc' } }],
      query: {
        bool: {
          must: [] as {}[],
          must_not: {
            term: { status: 'hidden' },
          },
        },
      },
      aggs: {
        action_path: {
          terms: {
            field: 'http.actionPath.keyword',
            size: 100,
          },
        },
        mthod_name: {
          terms: {
            field: 'methodName.keyword',
            size: 100,
          },
        },
        name: {
          terms: {
            field: 'name.keyword',
            size: 100,
          },
        },
      },
    };
    if (options.username) {
      query.query.bool.must.push({
        wildcard: { [`${this.optionsService.getOptions().userFullNameAttribute}.keyword`]: `*${options.username}*` },
      });
    }
    if (options.dateFrom) {
      query.query.bool.must.push({ range: { start: { gte: dateToDateString(options.dateFrom) } } });
    }
    if (options.dateTo) {
      query.query.bool.must.push({ range: { end: { lte: dateToDateString(options.dateTo) } } });
    }
    if (options.actionName && options.actionName.length >= 3) {
      const fields = {
        multi_match: {
          fields: ['name', 'http.actionPath', 'methodName'],
          query: options.actionName,
          boost: 1,
          type: 'phrase_prefix',
        },
      };
      query.query.bool.must.push(fields);
    }
    if (options.onlyErrors) {
      query.query.bool.must.push({ term: { success: false } });
    }

    return query;
  }
}

export interface UserActionSearchOptions {
  from?: number;
  size?: number;
  username?: string;
  dateFrom?: Date;
  dateTo?: Date;
  actionName?: string;
  onlyErrors?: boolean;
}
