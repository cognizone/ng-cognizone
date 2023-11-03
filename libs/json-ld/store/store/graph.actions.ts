import { Many } from '@cognizone/model-utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- needed for sub entries in lib
import { ExpandedJsonLdContainer, JsonLdNode } from '@cognizone/json-ld/core';

import { GraphStatus } from '../models/graph-status';

export class SetGraph {
  static readonly type: string = '[JsonLdStore] set graph';

  constructor(public graph: ExpandedJsonLdContainer, public graphUri: string, public status: GraphStatus = 'pristine') {}
}

export class RemoveGraph {
  static readonly type: string = '[JsonLdStore] remove graph';

  constructor(public rootUri: string) {}
}

export class UpdateNode {
  static readonly type: string = '[JsonLdStore] update node';

  constructor(public rootUri: string, public nodes: Many<JsonLdNode>, public options?: { silent?: boolean }) {}
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class Reset {
  static readonly type: string = '[JsonLdStore] reset';
}
