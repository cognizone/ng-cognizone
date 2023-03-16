import { Injectable } from '@angular/core';
import { environment } from '@czee-ce/env/environment';
@Injectable({
  providedIn: 'root',
})
export class ProtocolService {
  get protocol(): string {
    return `web+czee${environment.production ? '' : 'local'}`;
  }

  init(): void {
    const url = `${location.origin}${environment.production ? '/index.html' : ''}#/%s`;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).registerProtocolHandler(this.protocol, url, 'cz-data-explorer');
  }
}
