import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { JsonModel } from '@cognizone/json-model';
import { ShaclHelperDefinition } from '@cognizone/shacl/core';
import { GraphClient, UriEncoder } from '@shfp/core';
import { DetailsData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DetailsDataResolver implements Resolve<DetailsData> {
  constructor(private graphClient: GraphClient, private uriEncoder: UriEncoder) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<DetailsData> {
    let { uri } = route.params;
    uri = this.uriEncoder.decode(uri);
    const graph = await this.graphClient.getGraphByUri(uri).toPromise();
    const definition = await this.graphClient.getShaclHelperDefinition(graph).toPromise();
    return { graph, definition };
  }
}
