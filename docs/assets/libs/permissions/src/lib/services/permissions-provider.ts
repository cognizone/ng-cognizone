import { InjectionToken } from '@angular/core';
import { Completable } from '@cognizone/model-utils';

export interface PermissionsProvider {
  getPermissions(): Completable<string[]>;
}

export const PERMISSIONS_PROVIDER_TOKEN = new InjectionToken<PermissionsProvider>('PermissionsProvider');
