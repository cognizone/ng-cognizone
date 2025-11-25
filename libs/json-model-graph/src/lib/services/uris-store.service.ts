import { inject, Injectable } from '@angular/core';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN } from '@cognizone/json-model';

import { GraphWrapper } from './graph-wrapper';
import { GraphWrapperFactory } from './graph-wrapper.factory';

@Injectable()
export class UrisStoreService {
  nodeUri!: string;
  private dataModelDefinitionHelper = inject(DATA_MODEL_DEFINITION_HELPER_TOKEN);
  private _rootUri!: string;
  private graphWrapperFactory = inject(GraphWrapperFactory);
  private parent = inject(UrisStoreService, { optional: true, skipSelf: true });

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


  getWrapper(): GraphWrapper {
    if (!this.rootUri) throw new Error('Cannot generate a wrapper with rootUri being Nil');
    return this.graphWrapperFactory.getWrapper(this.rootUri);
  }
}
