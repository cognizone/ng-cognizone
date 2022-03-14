import { Injectable } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';

@Injectable({ providedIn: 'root' })
export class UriHelper {
  // TODO use config service when merged into app
  newUriPrefix!: string;

  isNew(value: string | JsonModel): boolean {
    const uri = typeof value === 'string' ? value : value['@id'];
    return uri.startsWith(this.newUriPrefix);
  }
}
