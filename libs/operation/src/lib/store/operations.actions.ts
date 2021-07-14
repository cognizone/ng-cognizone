import { OperationGroup, OperationGroupDescription } from '../models/operation';

export class SetOperationGroups {
  static readonly type: string = '[Operations] set operation groups';

  constructor(public groups: OperationGroup[]) {}
}

export class RemoveOperationGroup {
  static readonly type: string = '[Operations] remove operation group';

  constructor(public description: OperationGroupDescription) {}
}

export class UpdateOperationGroups {
  static readonly type: string = '[Operations] update operation group';

  constructor(public groups: OperationGroup[]) {}
}

export class ToggleDebugEnabled {
  static readonly type: string = '[Operations] toggle debug enabled';
}
