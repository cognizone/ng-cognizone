import { Component } from '@angular/core';

import { ProtocolService } from './core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <app-copy-link-button></app-copy-link-button>
  `,
  styles: []
})
export class AppComponent {
  constructor(protocolService: ProtocolService) {
    protocolService.init();
  }
}
