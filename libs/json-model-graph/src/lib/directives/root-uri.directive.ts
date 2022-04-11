import { Directive, Input } from '@angular/core';
import { JsonModel, Uri } from '@cognizone/json-model';

import { UrisStoreService, GraphWrapper, GraphWrapperFactory, NodeWrapper } from '../services';

@Directive({
  selector: '[czRootUri]',
  providers: [UrisStoreService],
})
export class RootUriDirective {
  @Input('czRootUri')
  set rootUri(uri: string) {
    this.urisStoreService.rootUri = uri;
    this.urisStoreService.nodeUri = uri;
  }

  get rootUri(): string {
    return this.urisStoreService.rootUri;
  }

  constructor(private graphWrapperFactory: GraphWrapperFactory, private urisStoreService: UrisStoreService) {}

  /**
   * @deprecated use `UrisStoreService::getWrapper` instead to the same effect
   */
  getWrapper(): GraphWrapper {
    return this.graphWrapperFactory.getWrapper(this.rootUri);
  }

  /**
   * @deprecated most likely used by no-one, will be removed at v4
   */
  getNodeWrapper<T extends JsonModel>(nodeUri: Uri<T>): NodeWrapper<T> {
    return this.graphWrapperFactory.getNodeWrapper(this.rootUri, nodeUri);
  }
}
