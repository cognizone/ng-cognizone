import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ElasticRawClient } from '@cognizone/elastic';
import { Logger } from '@cognizone/ng-core';

import { UserActionOptionsService } from './user-actions-options.service';

@Injectable()
export class UserActionClient extends ElasticRawClient {
  get baseUrl(): string {
    return this.optionsService.getOptions().baseUrl;
  }

  get index(): string {
    return this.optionsService.getOptions().index;
  }

  constructor(http: HttpClient, logger: Logger, private optionsService: UserActionOptionsService) {
    super(http, logger.extend('UserActionClient'));
  }
}
