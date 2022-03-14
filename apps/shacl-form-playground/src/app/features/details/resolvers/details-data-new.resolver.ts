import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { JsonModelService } from '@cognizone/json-model';
import { ConfigService, GraphClient, UriEncoder } from '@shfp/core';

import { DetailsData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DetailsDataNewResolver implements Resolve<DetailsData> {
  constructor(
    private graphClient: GraphClient,
    private jsonModelService: JsonModelService,
    private configService: ConfigService,
    private uriEncoder: UriEncoder
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<DetailsData> {
    const config = this.configService.config;
    let { type } = route.params;
    type = this.uriEncoder.decode(type);
    const modelContext = config.appContext;
    const shapesGraph = await this.graphClient.getShapesGraphForType(type, modelContext).toPromise();
    const definition = { shapesGraph, modelContext };
    const graph = this.jsonModelService.createNewJsonModel(type, definition, modelContext);
    return { graph, definition };
  }
}
