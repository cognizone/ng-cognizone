import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { DataModelDefinitionHelper, DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';

import { GraphWrapper } from './graph-wrapper';
import { GraphWrapperFactory } from './graph-wrapper.factory';

@Injectable()
export class UrisStoreService {
  get rootUri(): string {
    return this._rootUri ?? this.parent?.rootUri;
  }

  set rootUri(uri: string) {
    this._rootUri = uri;
  }

  get type(): string {
    const wrapper = this.getWrapper();
    const node = wrapper.getNodeSnapshot(this.nodeUri);
    return this.dataModelDefinitionHelper.getConcreteType(wrapper.getDefinition(), node['@type']);
  }

  nodeUri!: string;
  private _rootUri!: string;

  constructor(
    private graphWrapperFactory: GraphWrapperFactory,
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper,
    @Optional()
    @SkipSelf()
    private parent?: UrisStoreService
  ) {}

  getWrapper(): GraphWrapper {
    if (!this.rootUri) throw new Error('Cannot generate a wrapper with rootUri being Nil');
    return this.graphWrapperFactory.getWrapper(this.rootUri);
  }
}
