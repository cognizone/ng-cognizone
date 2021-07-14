import { Many } from '@cognizone/model-utils';
import { JsonModelFlat, JsonModelFlatGraph } from '@cognizone/ng-application-profile';

import { GraphStatus } from '../models/graph-status';

export class SetGraph {
  static readonly type: string = '[Graph] set graph';
  constructor(public graph: JsonModelFlatGraph, public apName: string, public status: GraphStatus = 'pristine') {}
}

export class RemoveGraph {
  static readonly type: string = '[Graph] remove graph';
  constructor(public rootUri: string) {}
}

export class UpdateNode {
  static readonly type: string = '[Graph] update node';
  constructor(public rootUri: string, public nodes: Many<JsonModelFlat>) {}
}

export class Reset {
  static readonly type: string = '[Graph] reset';
}
