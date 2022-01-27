import { Injectable, Optional, SkipSelf } from '@angular/core';

import { GraphWrapper } from './graph-wrapper';
import { GraphWrapperFactory } from './graph-wrapper.factory';

@Injectable()
export class GraphFormContextService {
  get rootUri(): string {
    return this._rootUri ?? this.parent?.rootUri;
  }

  set rootUri(uri: string) {
    this._rootUri = uri;
  }

  nodeUri!: string;
  private _rootUri!: string;

  constructor(
    private graphWrapperFactory: GraphWrapperFactory,
    @Optional()
    @SkipSelf()
    private parent?: GraphFormContextService
  ) {}

  getWrapper(): GraphWrapper {
    if (!this.rootUri) throw new Error('Cannot generate a wrapper with rootUri being Nil');
    return this.graphWrapperFactory.getWrapper(this.rootUri);
  }
}
