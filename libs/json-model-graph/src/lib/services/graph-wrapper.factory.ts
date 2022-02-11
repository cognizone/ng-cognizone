import { Injectable } from '@angular/core';
import { JsonModel, JsonModelService } from '@cognizone/json-model';

import { GraphWrapper } from './graph-wrapper';
import { GraphService } from './graph.service';
import { NodeWrapper } from './node-wrapper';

@Injectable({ providedIn: 'root' })
export class GraphWrapperFactory {
  constructor(private graphService: GraphService, private jsonModelService: JsonModelService) {}

  getWrapper(rootUri: string): GraphWrapper {
    return new GraphWrapper(this.graphService, this.jsonModelService, rootUri);
  }

  getNodeWrapper<T extends JsonModel>(rootUri: string, nodeUri: string): NodeWrapper<T> {
    return new NodeWrapper<T>(this.graphService, rootUri, nodeUri);
  }
}
