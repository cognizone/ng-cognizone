import { Injectable } from '@angular/core';
import { manyToArray } from '@cognizone/model-utils';
import { JsonModel, JsonModelFlatGraph, JsonModelService } from '@cognizone/ng-application-profile';
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
    let newState = produce(ctx.getState(), draft => {
      draft.apName[graph.rootUri] = apName;
      draft.graphs[graph.rootUri] = { graph, status: 'pristine' };
    });
    // Done outside of immer because linked graphs can be circular, which immer doesn't like
    const linkedGraph = this.jsonModelService.fromFlatGraph(newState.graphs[graph.rootUri].graph, apName);
    newState = { ...newState, linkedGraphs: { ...newState.linkedGraphs, [graph.rootUri]: linkedGraph } };

    ctx.setState(newState);
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
    let newState = produce(ctx.getState(), draft => {
      allNodes.forEach(node => {
        draft.graphs[rootUri].graph.models[node['@id']] = node;
      });

      draft.graphs[rootUri].status = 'touched';
    });

    // Done outside of immer because linked graphs can be circular, which immer doesn't like
    const linkedGraph = this.jsonModelService.fromFlatGraph(newState.graphs[rootUri].graph, newState.apName[rootUri]);
    newState = { ...newState, linkedGraphs: { ...newState.linkedGraphs, [rootUri]: linkedGraph } };

    ctx.setState(newState);
  }

  @Action(Reset)
  reset({ setState }: StateContext<GraphStateModel>): void {
    setState({ graphs: {}, linkedGraphs: {}, apName: {} });
  }
}
