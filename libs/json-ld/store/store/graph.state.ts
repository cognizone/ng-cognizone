import { Injectable } from '@angular/core';
import { manyToArray } from '@cognizone/model-utils';
import { Action, State, StateContext, StateToken } from '@ngxs/store';
import { produce } from 'immer';
// eslint-disable-next-line @nx/enforce-module-boundaries -- needed for sub entries in lib
import { ExpandedJsonLdContainer } from '@cognizone/json-ld-core';

import { GraphStatus } from '../models/graph-status';
import { RemoveGraph, Reset, SetGraph, UpdateNode, UpdateStatus } from './graph.actions';

interface GraphContainer {
  graph: ExpandedJsonLdContainer;
  status: GraphStatus;
}

export interface GraphStateModel {
  graphs: {
    [uri: string]: GraphContainer;
  };
  definitions: {
    [uri: string]: unknown;
  };
}

export const GRAPH_STATE_TOKEN = new StateToken<GraphStateModel>('cz_json_ld');

@State({
  name: GRAPH_STATE_TOKEN,
  defaults: {
    graphs: {},
    definitions: {},
  },
})
@Injectable()
export class GraphState {
  @Action(SetGraph)
  setGraph(ctx: StateContext<GraphStateModel>, { graph, graphUri }: SetGraph): void {
    ctx.setState(
      produce(ctx.getState(), draft => {
        draft.graphs[graphUri] = { graph, status: 'pristine' };
      })
    );
  }

  @Action(UpdateStatus)
  updateStatus(ctx: StateContext<GraphStateModel>, { status, graphUri }: UpdateStatus): void {
    ctx.setState(
      produce(ctx.getState(), draft => {
        if (!draft.graphs[graphUri]) return;
        draft.graphs[graphUri].status = status;
      })
    );
  }

  @Action(RemoveGraph)
  removeGraph(ctx: StateContext<GraphStateModel>, { rootUri }: RemoveGraph): void {
    ctx.setState(
      produce(ctx.getState(), draft => {
        delete draft.graphs[rootUri];
        delete draft.definitions[rootUri];
      })
    );
  }

  @Action(UpdateNode)
  updateNode(ctx: StateContext<GraphStateModel>, { rootUri, nodes, options }: UpdateNode): void {
    const allNodes = manyToArray(nodes);

    ctx.setState(
      produce(ctx.getState(), draft => {
        allNodes.forEach(node => {
          draft.graphs[rootUri].graph.nodes[node['@id']] = node;
        });
        if (!options?.silent) {
          draft.graphs[rootUri].status = 'touched';
        }
      })
    );
  }

  @Action(Reset)
  reset({ setState }: StateContext<GraphStateModel>): void {
    setState({ graphs: {}, definitions: {} });
  }
}
