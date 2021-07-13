import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Page } from '../models/page';

import { SetPages, SetPageTitle } from './core.actions';
import { CoreState, CoreStateModel } from './core.state';

@Injectable({ providedIn: 'root' })
export class CoreStateFacade {
  @Select(CoreState)
  core$!: Observable<CoreStateModel>;

  constructor(private readonly store: Store) {}

  setPages(pages: Page[]): void {
    this.store.dispatch(new SetPages(pages));
  }

  setPageTitle(title: string, subTitle?: string): void {
    this.store.dispatch(new SetPageTitle(title, subTitle));
  }

  resetPageTitle(): void {
    this.store.dispatch(new SetPageTitle(undefined));
  }
}
