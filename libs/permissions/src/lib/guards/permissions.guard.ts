import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Many, Nil } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { PermissionsService } from '../services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsGuard  {
  constructor(private permissionsService: PermissionsService) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const permission = next.data.permission as Nil<Many<string>>;
    return this.permissionsService.hasPermissions(permission).pipe(first());
  }
}
