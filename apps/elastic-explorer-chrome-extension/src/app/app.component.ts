import { Component } from '@angular/core';

import { ProtocolService } from './core';

@Component({
  selector: 'cz-root',
  template: `
    <router-outlet></router-outlet>
    <cz-copy-link-button></cz-copy-link-button>
  `,
  styles: [],
})
export class AppComponent {
  constructor(protocolService: ProtocolService) {
    protocolService.init();
  }
}
