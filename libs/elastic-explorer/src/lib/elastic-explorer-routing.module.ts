import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ElasticExplorerView } from './views/elastic-explorer/elastic-explorer.view';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes: Routes = [{ path: '', component: ElasticExplorerView }];

@NgModule({
  // TODO add back when migrating to angular 12
  imports: [
    /* RouterModule.forChild(routes) */
  ],
  exports: [RouterModule],
})
export class ElasticExplorerRoutingModule {}