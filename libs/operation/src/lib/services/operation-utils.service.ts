import { Injectable } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

import { Operation, OperationGroup, OperationGroupDescriptionLike, toOperationGroupDescription } from '../models/operation';

@Injectable({ providedIn: 'root' })
export class OperationUtils {
  getGroup(groups: Many<OperationGroup>, path: Many<OperationGroupDescriptionLike>): OperationGroup | undefined {
    const [current, ...rest] = manyToArray(path).map(toOperationGroupDescription);
    const group = manyToArray(groups).find(g => {
      const uriCondition = current.uri ? current.uri === g.uri : true;
      return g.id === current.id && uriCondition;
    });
    if (!group) return undefined;
    if (rest.length === 0) return group;

    return this.getGroup(group.groups ?? [], rest);
  }

  getOperation(groups: Many<OperationGroup>, path: Many<OperationGroupDescriptionLike>, operationId: string): Operation | undefined {
    const group = this.getGroup(groups, path);
    return group?.operations?.find(o => o.id === operationId);
  }
}
