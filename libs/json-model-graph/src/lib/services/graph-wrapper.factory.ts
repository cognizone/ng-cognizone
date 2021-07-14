import { Injectable } from '@angular/core';
import { JsonModel, JsonModelService } from '@cognizone/ng-application-profile';

import { GraphWrapper } from './graph-wrapper';
import { GraphService } from './graph.service';
import { NodeWrapper } from './node-wrapper';

@Injectable({ providedIn: 'root' })
export class GraphWrapperFactory {
  constructor(private graphService: GraphService, private jsonModelService: JsonModelService) {}

  getWrapper(rootUri: string, apName: string): GraphWrapper {
    return new GraphWrapper(this.graphService, this.jsonModelService, rootUri, apName);
  }

  getNodeWrapper<T extends JsonModel>(rootUri: string, nodeUri: string): NodeWrapper<T> {
    return new NodeWrapper<T>(this.graphService, rootUri, nodeUri);
  }
}
