import { Injectable } from '@angular/core';
import { Thunk, extractThunkValue } from '@cognizone/model-utils';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private state: FeatureFlagState = {};

  isFeatureEnabled(feature: string): boolean {
    const flag = this.state[feature];
    if (flag == null) return false;
    return extractThunkValue(flag);
  }

  resetFlags(): void {
    this.state = {};
  }

  registerFeatureFlag(feature: string, flag: Thunk<boolean>): void {
    this.state = {
      ...this.state,
      [feature]: flag,
    };
  }
}

export interface FeatureFlagState {
  [key: string]: Thunk<boolean>;
}
