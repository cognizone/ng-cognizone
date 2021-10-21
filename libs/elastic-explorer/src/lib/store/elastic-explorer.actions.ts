import { Pagination } from '@cognizone/legi-shared/list-paginator';
import { ElasticSearchResponse } from '@cognizone/model-utils';

import { ElasticInfo } from '../models/elastic-info';
import { ElasticState } from '../models/elastic-state';
import { Filters } from '../models/filters';
import { FullModel } from '../models/full-model';
import { ViewType } from '../models/view-type';

export class SetData {
  static readonly type: string = '[ElasticExplorer] set data';

  constructor(public response: ElasticSearchResponse<FullModel>) {}
}

export class ResetData {
  static readonly type: string = '[ElasticExplorer] reset data';
}

export class SetFilters {
  static readonly type: string = '[ElasticExplorer] set filters';

  constructor(public filters: Filters) {}
}

export class SetPagination {
  static readonly type: string = '[ElasticExplorer] set pagination';

  constructor(public pagination: Pagination) {}
}

export class SetElasticInfo {
  static readonly type: string = '[ElasticExplorer] set elastic info';

  constructor(public elasticInfo: ElasticInfo) {}
}

export class SetIndices {
  static readonly type: string = '[ElasticExplorer] set indices';

  constructor(public indices: string[]) {}
}

export class SetManualMode {
  static readonly type: string = '[ElasticExplorer] set manual mode';

  constructor(public manualMode: boolean) {}
}

export class SetElasticQuery {
  static readonly type: string = '[ElasticExplorer] set elastic query';

  constructor(public elasticQuery: {}) {}
}

export class SetElasticState {
  static readonly type: string = '[ElasticExplorer] set elastic state';

  constructor(public elasticState?: ElasticState) {}
}

export class SetViewType {
  static readonly type: string = '[ElasticExplorer] set view type';

  constructor(public viewType: ViewType) {}
}
