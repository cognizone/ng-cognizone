import { Injectable } from '@angular/core';
import { CoreStateFacade } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class NgCorePagesService {
  constructor(private coreStateFacade: CoreStateFacade) {}

  setPages(): void {
    this.coreStateFacade.setPages([{ label: 'OnDestroyMixin', path: 'packages/ng-core/on-destroy-mixin' }]);
  }

  discardPages(): void {
    this.coreStateFacade.setPages([]);
  }
}
