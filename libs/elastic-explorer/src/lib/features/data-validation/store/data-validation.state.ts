import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { DataError } from '../models/data-error';
import { AddErrors, SetElasticQuery, SetErrors } from './data-validation.actions';

export interface DataValidationStateModel {
  errors: DataError[];
  elasticQuery: {};
}

export const DATA_VALIDATION_STATE_TOKEN = new StateToken<DataValidationStateModel>('dataValidation');

@State({
  name: DATA_VALIDATION_STATE_TOKEN,
  defaults: {
    errors: [],
    elasticQuery: {
      query: {
        bool: {
          must: [
            {
              exists: {
                field: 'data.uri',
              },
            },
          ],
        },
      },
    },
  },
})
@Injectable()
export class DataValidationState {
  @Action(SetErrors)
  setErrors({ patchState }: StateContext<DataValidationStateModel>, { errors }: SetErrors): void {
    patchState({
      errors,
    });
  }

  @Action(AddErrors)
  addErrors({ patchState, getState }: StateContext<DataValidationStateModel>, { errors }: AddErrors): void {
    patchState({
      errors: [...getState().errors, ...errors],
    });
  }

  @Action(SetElasticQuery)
  setElasticQuery({ patchState }: StateContext<DataValidationStateModel>, { elasticQuery }: SetElasticQuery): void {
    patchState({
      elasticQuery,
    });
  }
}
