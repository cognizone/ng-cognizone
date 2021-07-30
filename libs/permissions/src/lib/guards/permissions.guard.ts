import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Many, Nil } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { PermissionsService } from '../services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard implements CanActivate {
  constructor(private permissionsService: PermissionsService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const permission = next.data.permission as Nil<Many<string>>;
    return this.permissionsService.hasPermissions(permission).pipe(first());
  }
}
