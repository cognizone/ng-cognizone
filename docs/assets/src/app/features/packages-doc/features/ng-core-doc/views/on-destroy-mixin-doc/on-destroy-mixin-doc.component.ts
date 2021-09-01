import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoreStateFacade } from '@app/core';
import { ApiDescription } from '@app/shared/components/api-table/api-table.component';

import { NgCorePagesService } from '../../services/ng-core-pages.service';

@Component({
  selector: 'app-on-destroy-mixin-doc',
  templateUrl: './on-destroy-mixin-doc.component.html',
  styleUrls: ['./on-destroy-mixin-doc.component.scss'],
})
export class OnDestroyMixinDocComponent implements OnInit, OnDestroy {
  code1 = `
  @Component(/*...*/)
  export class MyComponent extends OnDestroyMixin(MyParentComponent) { 
    constructor(private store: MyStore) {
      super();
      store.getData().pipe(takeUntil(this.onDestroy$)).subscribe(/* do stuff */); 
    } 
  }
  `;

  code2 = `
  @Component(/*...*/)
  export class MyComponent extends OnDestroyMixin(MyParentComponent) { 
    constructor(private store: MyStore) {
      super();
      store.getData().pipe(this.untilDestroyed()).subscribe(/* do stuff */); 
    } 
  }
  `;

  code3 = `
  @Component(/*...*/)
  export class MyComponent extends OnDestroy$ { 
    constructor(private store: MyStore) {
      super();
      store.getData().pipe(this.firstUntilDestroyed()).subscribe(/* do stuff */); 
    } 
  }
  `;

  onDestroyMixinProperties: ApiDescription[] = [
    {
      name: 'onDestroy$: Observable<void>',
      description: 'Observable that is fired when ngOnDestroy() si called',
    },
  ];

  onDestroyMixinMethods: ApiDescription[] = [
    {
      name: 'untilDestroyed<U>(): MonoTypeOperatorFunction<U>',
      description: 'Wrapper for takeUntil(this.onDestroy$)',
    },
    {
      name: 'firstUntilDestroyed<U>(): MonoTypeOperatorFunction<U>',
      description: 'Wrapper for pipe(first(), this.untilDestroyed())',
    },
  ];

  constructor(private coreStateFacade: CoreStateFacade, private ngCorePagesService: NgCorePagesService) {}

  ngOnInit(): void {
    this.coreStateFacade.setPageTitle('@cognizone/ng-core', 'OnDestroyMixin');
    this.ngCorePagesService.setPages();
  }

  ngOnDestroy(): void {
    this.coreStateFacade.resetPageTitle();
    this.ngCorePagesService.discardPages();
  }
}
