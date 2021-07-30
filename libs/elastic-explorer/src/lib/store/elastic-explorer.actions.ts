import { Pagination } from '@cognizone/legi-shared/list-paginator';
import { Dictionary, ElasticAggregation } from '@cognizone/model-utils';

import { ElasticInfo } from '../models/elastic-info';
import { Filters } from '../models/filters';
import { FullModel } from '../models/full-model';

export class SetData {
  static readonly type: string = '[ElasticExplorer] set data';

  constructor(public models: FullModel[], public total: number, public aggregations: Dictionary<ElasticAggregation>) {}
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
