import { JsonModel, JsonModelFlat, Uri } from '@cognizone/json-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GraphService } from './graph.service';

export class NodeWrapper<T extends JsonModel> {
  value$: Observable<JsonModelFlat<T>> = this.graphService.getNode(this.rootUri, this.nodeUri);

  get value(): JsonModelFlat<T> {
    return this.graphService.getNodeSnapshot(this.rootUri, this.nodeUri);
  }

  constructor(private graphService: GraphService, public rootUri: string, public nodeUri: Uri<T>) {}

  getProp<U extends keyof T>(attributeKey: U): Observable<JsonModelFlat<T>[U]> {
    return this.value$.pipe(map(value => value[attributeKey]));
  }
}
