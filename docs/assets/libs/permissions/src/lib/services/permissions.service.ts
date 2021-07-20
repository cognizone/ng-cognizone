import { Inject, Injectable } from '@angular/core';
import { Many, manyToArray, Nil } from '@cognizone/model-utils';
import { from, isObservable, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { PERMISSIONS_PROVIDER_TOKEN, PermissionsProvider } from './permissions-provider';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  permissions$: Observable<string[]> = this.getPermissions();

  constructor(@Inject(PERMISSIONS_PROVIDER_TOKEN) private permissionsProvider: PermissionsProvider) {}

  hasPermissions(permissions: Nil<Many<string>>): Observable<boolean> {
    if (!permissions) return of(true);
    if (Array.isArray(permissions) && permissions.length === 0) return of(true);
    return this.permissions$.pipe(map(allPermissions => manyToArray(permissions).some(permission => allPermissions.includes(permission))));
  }

  private getPermissions(): Observable<string[]> {
    const permissions = this.permissionsProvider.getPermissions();
    if (Array.isArray(permissions)) {
      return of(permissions);
    } else if (isObservable(permissions)) {
      return permissions.pipe(shareReplay(1));
    }
    return from(permissions);
  }
}
