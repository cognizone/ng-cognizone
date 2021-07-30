import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreStateFacade, insertIf } from '@app/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.scss'],
})
export class ArchitectureComponent implements OnInit, OnDestroy {
  constructor(private coreStateFacade: CoreStateFacade) {}

  ngOnInit(): void {
    this.coreStateFacade.setPages([
      { label: '01 Getting started', path: 'architecture/getting-started' },
      { label: '02 Modules', path: 'architecture/global-architecture' },
      { label: '03 Env, apis and flags', path: 'architecture/env-apis-and-flags' },
      { label: '04 Styling', path: 'architecture/styling' },
      ...insertIf(environment.features.architecture.component, { label: '05 Components', path: 'architecture/components' }),
      ...insertIf(environment.features.architecture.forms, { label: '06 Forms', path: 'architecture/forms' }),
    ]);
  }

  ngOnDestroy(): void {
    this.coreStateFacade.setPages([]);
  }
}
