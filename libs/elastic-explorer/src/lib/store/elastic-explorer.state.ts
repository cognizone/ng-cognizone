import { Injectable } from '@angular/core';
import { Pagination } from '@cognizone/legi-shared/list-paginator';
import { Dictionary, ElasticAggregation } from '@cognizone/model-utils';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { ElasticInfo } from '../models/elastic-info';
import { ElasticState } from '../models/elastic-state';
import { Filters } from '../models/filters';
import { FullModel } from '../models/full-model';
import {
  SetData,
  SetElasticInfo,
  SetElasticQuery,
  SetElasticState,
  SetFilters,
  SetIndices,
  SetManualMode,
  SetPagination,
} from './elastic-explorer.actions';

export interface ElasticExplorerStateModel {
  models: FullModel[];
  total: number;
  filters: Filters;
  pagination: Pagination;
  aggregations: Dictionary<ElasticAggregation>;
  elasticInfo: ElasticInfo;
  indices: string[];
  manualMode: boolean;
  elasticQuery: {};
  elasticState?: ElasticState;
}

export const ELASTIC_EXPLORER_STATE_TOKEN = new StateToken<ElasticExplorerStateModel>('elasticExplorer');

@State({
  name: ELASTIC_EXPLORER_STATE_TOKEN,
  defaults: {
    indices: [],
    models: [],
    total: 0,
    filters: {},
    aggregations: {},
    pagination: {
      from: 0,
      size: 10,
    },
    elasticInfo: {
      index: null,
      url: null,
    },
    manualMode: false,
    elasticQuery: {},
  },
})
@Injectable()
export class ElasticExplorerState {
  @Action(SetData)
  setData({ patchState }: StateContext<ElasticExplorerStateModel>, { models, total, aggregations }: SetData): void {
    patchState({ models, total, aggregations });
  }

  @Action(SetFilters)
  setFilters({ patchState, getState }: StateContext<ElasticExplorerStateModel>, { filters }: SetFilters): void {
    const { pagination } = getState();
    patchState({ filters, pagination: { ...pagination, from: 0 } });
  }

  @Action(SetPagination)
  setPagination({ patchState }: StateContext<ElasticExplorerStateModel>, { pagination }: SetPagination): void {
    patchState({ pagination });
  }

  @Action(SetElasticInfo)
  setElasticInfo({ patchState, getState }: StateContext<ElasticExplorerStateModel>, { elasticInfo }: SetElasticInfo): void {
    const currentUrl = getState().elasticInfo.url;
    if (currentUrl !== null && currentUrl !== elasticInfo.url) {
      elasticInfo = { ...elasticInfo, index: null };
    }
    patchState({ elasticInfo });
  }

  @Action(SetIndices)
  setIndices({ patchState }: StateContext<ElasticExplorerStateModel>, { indices }: SetIndices): void {
    patchState({ indices });
  }

  @Action(SetManualMode)
  setManualMode({ patchState }: StateContext<ElasticExplorerStateModel>, { manualMode }: SetManualMode): void {
    patchState({ manualMode });
  }

  @Action(SetElasticQuery)
  setElasticQuery({ patchState }: StateContext<ElasticExplorerStateModel>, { elasticQuery }: SetElasticQuery): void {
    patchState({ elasticQuery: elasticQuery });
  }

  @Action(SetElasticState)
  setElasticState({ patchState }: StateContext<ElasticExplorerStateModel>, { elasticState }: SetElasticState): void {
    patchState({ elasticState });
  }
}
