import { Injectable } from '@angular/core';
import { Pagination } from '@cognizone/legi-shared/list-paginator';
import { Dictionary, ElasticAggregation, ElasticSearchResponse, extractSourcesFromElasticResponse } from '@cognizone/model-utils';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { Filters } from '../models/filters';
import { FullModel } from '../models/full-model';
import { ViewType } from '../models/view-type';
import { ResetData, SetData, SetElasticQuery, SetFilters, SetManualMode, SetPagination, SetViewType } from './elastic-explorer.actions';

export interface ElasticExplorerStateModel {
  models: FullModel[];
  total: number;
  filters: Filters;
  pagination: Pagination;
  aggregations: Dictionary<ElasticAggregation>;
  manualMode: boolean;
  elasticQuery: {};
  viewType: ViewType;
  elasticResponse?: ElasticSearchResponse<FullModel>;
}

export const ELASTIC_EXPLORER_STATE_TOKEN = new StateToken<ElasticExplorerStateModel>('elasticExplorer');

@State({
  name: ELASTIC_EXPLORER_STATE_TOKEN,
  defaults: {
    models: [],
    total: 0,
    filters: {},
    aggregations: {},
    pagination: {
      from: 0,
      size: 10,
    },
    manualMode: false,
    elasticQuery: {},
    viewType: 'table',
  },
})
@Injectable()
export class ElasticExplorerState {
  @Action(SetData)
  setData({ patchState }: StateContext<ElasticExplorerStateModel>, { response }: SetData): void {
    patchState({
      elasticResponse: response,
      models: extractSourcesFromElasticResponse(response),
      total: response.hits.total.value,
      aggregations: response.aggregations,
    });
  }

  @Action(ResetData)
  resetData({ patchState }: StateContext<ElasticExplorerStateModel>): void {
    patchState({ elasticResponse: undefined, models: [], total: 0, aggregations: {} });
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

  @Action(SetManualMode)
  setManualMode({ patchState }: StateContext<ElasticExplorerStateModel>, { manualMode }: SetManualMode): void {
    patchState({ manualMode });
  }

  @Action(SetElasticQuery)
  setElasticQuery({ patchState }: StateContext<ElasticExplorerStateModel>, { elasticQuery }: SetElasticQuery): void {
    patchState({ elasticQuery: elasticQuery });
  }

  @Action(SetViewType)
  setViewType({ patchState }: StateContext<ElasticExplorerStateModel>, { viewType }: SetViewType): void {
    patchState({ viewType });
  }
}
