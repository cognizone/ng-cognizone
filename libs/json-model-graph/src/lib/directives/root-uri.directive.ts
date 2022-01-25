import { Directive, Input } from '@angular/core';
import { JsonModel, Uri } from '@cognizone/json-model';

import { GraphWrapper } from '../services/graph-wrapper';
import { GraphWrapperFactory } from '../services/graph-wrapper.factory';
import { NodeWrapper } from '../services/node-wrapper';

@Directive({
  selector: '[czRootUri]',
})
export class RootUriDirective {
  @Input('czRootUri')
  rootUri!: string;

  @Input()
  apName!: string;

  constructor(private graphWrapperFactory: GraphWrapperFactory) {}

  getWrapper(): GraphWrapper {
    return this.graphWrapperFactory.getWrapper(this.rootUri, this.apName);
  }

  getNodeWrapper<T extends JsonModel>(nodeUri: Uri<T>): NodeWrapper<T> {
    return this.graphWrapperFactory.getNodeWrapper(this.rootUri, nodeUri);
  }
}
