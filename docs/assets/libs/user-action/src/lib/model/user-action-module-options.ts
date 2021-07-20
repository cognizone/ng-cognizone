import { InjectionToken } from '@angular/core';

import { UserAction } from './user-action';

export interface UserActionsModuleOptions {
  baseUrl: string;
  index: string;
  userFullNameAttribute: keyof UserAction;
  userIvAttribute: keyof UserAction;
}

export const USER_ACTIONS_MODULE_OPTIONS_TOKEN = new InjectionToken<UserActionsModuleOptions>('UserActionsModuleOptions');
