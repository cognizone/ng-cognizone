import { Injectable } from '@angular/core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';

import { OperationGroup } from '../models/operation';

import { RemoveOperationGroup, SetOperationGroups, ToggleDebugEnabled, UpdateOperationGroups } from './operations.actions';

export interface OperationsStateModel {
  groups: OperationGroup[];
  debugEnabled: boolean;
}

export const OPERATIONS_STATE_TOKEN = new StateToken<OperationsStateModel>('cz_operations');

@State({
  name: OPERATIONS_STATE_TOKEN,
  defaults: {
    groups: [],
    debugEnabled: false,
  },
})
@Injectable()
export class OperationsState {
  @Action(SetOperationGroups)
  setOperationGroups(ctx: StateContext<OperationsStateModel>, { groups }: SetOperationGroups): void {
    ctx.patchState({ groups });
  }

  @Action(RemoveOperationGroup)
  removeOperationGroup(ctx: StateContext<OperationsStateModel>, { description }: RemoveOperationGroup): void {
    const groups = ctx.getState().groups.filter(g => {
      if (description.uri) {
        return !(g.id === description.id && g.uri === description.uri);
      }
      return g.id !== description.id;
    });
    ctx.patchState({ groups });
  }

  @Action(UpdateOperationGroups)
  updateOperationGroups(ctx: StateContext<OperationsStateModel>, { groups }: UpdateOperationGroups): void {
    const filteredGroups = ctx.getState().groups.filter(g =>
      groups.some(sub => {
        if (sub.uri) {
          return !(g.id === sub.id && g.uri === sub.uri);
        }
        return g.id !== sub.id;
      })
    );
    ctx.patchState({ groups: [...filteredGroups, ...groups] });
  }

  @Action(ToggleDebugEnabled)
  toggleDebugEnabled(ctx: StateContext<OperationsStateModel>): void {
    const debugEnabled = !ctx.getState().debugEnabled;
    ctx.patchState({ debugEnabled });
  }
}
