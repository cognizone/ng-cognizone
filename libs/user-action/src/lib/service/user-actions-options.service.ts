import { Inject, Injectable, Optional } from '@angular/core';

import { USER_ACTIONS_MODULE_OPTIONS_TOKEN, UserActionsModuleOptions } from '../model/user-action-module-options';

@Injectable()
export class UserActionOptionsService {
  constructor(@Optional() @Inject(USER_ACTIONS_MODULE_OPTIONS_TOKEN) private options: UserActionsModuleOptions) {}

  getOptions(): UserActionsModuleOptions {
    return this.options;
  }

  setOptions(value: UserActionsModuleOptions): void {
    this.options = value;
  }
}
