import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { JsonModel, JsonModelService } from '@cognizone/json-model';
import { TypedResourceContext } from '@cognizone/model-utils';
import { ShaclHelperDefinition } from '@cognizone/shacl/core';

import { GraphClient } from '../../../core';

@Injectable({
  providedIn: 'root',
})
export class DetailsDataResolver implements Resolve<DetailsData> {
  constructor(private graphClient: GraphClient, private jsonModelService: JsonModelService) {}

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<DetailsData> {
    const shapesGraph = await this.graphClient.shapesGraph$.toPromise();
    const config = await this.graphClient.config$.toPromise();
    const uri = route.params.uri;
    let graph: JsonModel;
    let definition: ShaclHelperDefinition | undefined;
    if (uri) {
      const fullUri = `${config.graphRootUriBase}${decodeURIComponent(uri)}`;
      graph = await this.graphClient.getGraphByUri(fullUri, { shapesGraph }).toPromise();
      const modelContext = graph['@context'] as TypedResourceContext;
      definition = { shapesGraph, modelContext };
    } else {
      const modelContext = config.defaultContext;
      definition = { shapesGraph, modelContext };
      graph = this.jsonModelService.createNewJsonModel(config.graphRootType, definition, modelContext);
    }

    return {
      definition,
      graph,
    };
  }
}

export interface DetailsData {
  definition: ShaclHelperDefinition;
  graph: JsonModel;
}
