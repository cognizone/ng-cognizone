import { Injectable } from '@angular/core';
import { environment } from '@czde-ce/env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProtocolService {
  get protocol(): string {
    return `web+czde${environment.production ? '' : 'local'}`;
  }

  init(): void {
    const url = `${location.origin}${environment.production ? '/index.html' : ''}#/%s`;
    navigator.registerProtocolHandler(this.protocol, url, 'cz-data-explorer');
  }
}
