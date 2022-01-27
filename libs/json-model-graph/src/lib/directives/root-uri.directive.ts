import { Directive, Input } from '@angular/core';
import { JsonModel, Uri } from '@cognizone/json-model';

import { GraphFormContextService } from '../services';
import { GraphWrapper } from '../services/graph-wrapper';
import { GraphWrapperFactory } from '../services/graph-wrapper.factory';
import { NodeWrapper } from '../services/node-wrapper';

@Directive({
  selector: '[czRootUri]',
  providers: [GraphFormContextService],
})
export class RootUriDirective {
  @Input('czRootUri')
  set rootUri(uri: string) {
    this.graphFormContextService.rootUri = uri;
    this.graphFormContextService.nodeUri = uri;
  }

  get rootUri(): string {
    return this.graphFormContextService.rootUri;
  }

  constructor(private graphWrapperFactory: GraphWrapperFactory, private graphFormContextService: GraphFormContextService) {}

  getWrapper(): GraphWrapper {
    return this.graphWrapperFactory.getWrapper(this.rootUri);
  }

  getNodeWrapper<T extends JsonModel>(nodeUri: Uri<T>): NodeWrapper<T> {
    return this.graphWrapperFactory.getNodeWrapper(this.rootUri, nodeUri);
  }
}
