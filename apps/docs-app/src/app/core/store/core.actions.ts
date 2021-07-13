import { Page } from '../models/page';

export class SetPages {
  static readonly type: string = '[core] set pages';

  constructor(public pages: Page[]) {}
}

export class SetPageTitle {
  static readonly type: string = '[core] set page title';

  constructor(public title?: string, public subTitle?: string) {}
}
