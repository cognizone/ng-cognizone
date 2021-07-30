import { Injectable } from '@angular/core';
import { selectProp } from '@cognizone/model-utils';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { OperationGroup, OperationGroupDescription } from '../models/operation';
import { RemoveOperationGroup, SetOperationGroups, ToggleDebugEnabled, UpdateOperationGroups } from '../store/operations.actions';
import { OPERATIONS_STATE_TOKEN, OperationsStateModel } from '../store/operations.state';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  get groups$(): Observable<OperationGroup[]> {
    return this.state$.pipe(selectProp('groups'));
  }

  get debugEnabled$(): Observable<boolean> {
    return this.state$.pipe(selectProp('debugEnabled'));
  }

  get groups(): OperationGroup[] {
    return this.store.selectSnapshot(OPERATIONS_STATE_TOKEN).groups;
  }

  constructor(private store: Store) {}

  setOperationGroups(groups: OperationGroup[]): void {
    this.store.dispatch(new SetOperationGroups(groups));
  }

  removeOperationGroup(description: OperationGroupDescription): void {
    this.store.dispatch(new RemoveOperationGroup(description));
  }

  updateOperationGroup(...groups: OperationGroup[]): void {
    if (!groups.length) return;
    this.store.dispatch(new UpdateOperationGroups(groups));
  }

  toggleDebugEnabled(): void {
    this.store.dispatch(new ToggleDebugEnabled());
  }

  private get state$(): Observable<OperationsStateModel> {
    return this.store.select(OPERATIONS_STATE_TOKEN);
  }
}
