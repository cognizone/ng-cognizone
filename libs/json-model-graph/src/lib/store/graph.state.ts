import { Injectable } from '@angular/core';
import { manyToArray } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlatGraph, JsonModelService } from '@cognizone/json-model';
import { Logger } from '@cognizone/ng-core';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import produce from 'immer';

import { GraphStatus } from '../models/graph-status';

import { RemoveGraph, Reset, SetGraph, UpdateNode } from './graph.actions';

interface GraphContainer {
  graph: JsonModelFlatGraph;
  status: GraphStatus;
}

export interface GraphStateModel {
  graphs: {
    [uri: string]: GraphContainer;
  };
  linkedGraphs: {
    [uri: string]: JsonModel;
  };
  apName: {
    [uri: string]: string;
  };
}

export const GRAPH_STATE_TOKEN = new StateToken<GraphStateModel>('cz_graph');

@State({
  name: GRAPH_STATE_TOKEN,
  defaults: {
    graphs: {},
    linkedGraphs: {},
    apName: {},
  },
})
@Injectable()
export class GraphState {
  constructor(private jsonModelService: JsonModelService, private logger: Logger) {
    this.logger = this.logger.extend('GraphState');
  }

  @Action(SetGraph)
  setGraph(ctx: StateContext<GraphStateModel>, { graph, apName }: SetGraph): void {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.apName[graph.rootUri] = apName;
        draft.graphs[graph.rootUri] = { graph, status: 'pristine' };
        const linkedGraph = this.jsonModelService.fromFlatGraph(draft.graphs[graph.rootUri].graph, apName);
        draft.linkedGraphs[graph.rootUri] = linkedGraph;
      })
    );
  }

  @Action(RemoveGraph)
  removeGraph(ctx: StateContext<GraphStateModel>, { rootUri }: RemoveGraph): void {
    ctx.setState(
      produce(ctx.getState(), draft => {
        delete draft.graphs[rootUri];
        delete draft.linkedGraphs[rootUri];
        delete draft.apName[rootUri];
      })
    );
  }

  @Action(UpdateNode)
  updateNode(ctx: StateContext<GraphStateModel>, { rootUri, nodes }: UpdateNode): void {
    const allNodes = manyToArray(nodes);

    ctx.setState(
      produce(ctx.getState(), draft => {
        allNodes.forEach(node => {
          draft.graphs[rootUri].graph.models[node['@id']] = node;
        });

        draft.graphs[rootUri].status = 'touched';
        const linkedGraph = this.jsonModelService.fromFlatGraph(draft.graphs[rootUri].graph, draft.apName[rootUri]);
        draft.linkedGraphs[rootUri] = linkedGraph;
      })
    );
  }

  @Action(Reset)
  reset({ setState }: StateContext<GraphStateModel>): void {
    setState({ graphs: {}, linkedGraphs: {}, apName: {} });
  }
}
