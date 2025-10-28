import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ElasticExplorerView } from './views/elastic-explorer/elastic-explorer.view';
import { SearchView } from './modules/search';
import { DataValidationView } from './modules/data-validation';

export const routes: Routes = [
  {
    path: '',
    component: ElasticExplorerView,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: SearchView,
      },
      {
        path: 'data-validation',
        component: DataValidationView,
      },
    ],
  },
];

@NgModule({
  // TODO add back when migrating to angular 12
  imports: [
    /* RouterModule.forChild(routes) */
  ],
  exports: [RouterModule],
})
export class ElasticExplorerRoutingModule {}
