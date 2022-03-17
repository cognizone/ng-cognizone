import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { DataError } from '../models/data-error';
import { AddErrors, SetElasticQuery, SetErrors, SetJsonSchema } from './data-validation.actions';

export interface DataValidationStateModel {
  errors: DataError[];
  elasticQuery: {};
  jsonSchema: {};
}

export const DATA_VALIDATION_STATE_TOKEN = new StateToken<DataValidationStateModel>('dataValidation');

@State({
  name: DATA_VALIDATION_STATE_TOKEN,
  defaults: {
    errors: [],
    jsonSchema: {
      title: 'Typed Resource Schema',
      description: 'A typed resource schema',
      type: 'object',
      required: ['uri', 'type'],
      properties: {
        uri: { type: 'string' },
        type: { type: ['string', 'array'] },
        references: { type: 'object' },
        attributes: { type: 'object' },
      },
      additionalProperties: false,
    },
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

  @Action(SetJsonSchema)
  setJsonSchema({ patchState }: StateContext<DataValidationStateModel>, { jsonSchema }: SetJsonSchema): void {
    patchState({
      jsonSchema,
    });
  }
}
