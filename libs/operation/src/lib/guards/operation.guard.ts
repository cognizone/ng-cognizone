import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { OperationGroupDescription } from '../models/operation';
import { OperationUtils } from '../services/operation-utils.service';
import { OperationsService } from '../services/operations.service';

@Injectable({
  providedIn: 'root',
})
export class OperationGuard {
  private operationsService = inject(OperationsService);
  private operationUtils = inject(OperationUtils);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const { path, operationId } = route.data.operationPath as { path: OperationGroupDescription[]; operationId: string };

    const operation = this.operationUtils.getOperation(this.operationsService.groups, path, operationId);

    return operation?.enabled ?? false;
  }
}
