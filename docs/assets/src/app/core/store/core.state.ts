import { Action, State, StateContext } from '@ngxs/store';

import { Page } from '../models/page';

import { SetPages, SetPageTitle } from './core.actions';

export interface CoreStateModel {
  pages: Page[];
  pageTitle?: string;
  pageSubtitle?: string;
}

@State<CoreStateModel>({
  name: 'core',
  defaults: {
    pages: [],
  },
})
export class CoreState {
  @Action(SetPages)
  setPages(ctx: StateContext<CoreStateModel>, { pages }: SetPages): void {
    ctx.patchState({ pages });
  }

  @Action(SetPageTitle)
  setPageTitle(ctx: StateContext<CoreStateModel>, { title, subTitle }: SetPageTitle): void {
    ctx.patchState({ pageTitle: title, pageSubtitle: subTitle });
  }
}
