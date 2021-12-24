import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ElasticExplorerView } from './views/elastic-explorer/elastic-explorer.view';
import { SearchView } from './features/search';
import { DataValidationView } from './features/data-validation';

export const routes: Routes = [
  {
    path: '',
    component: ElasticExplorerView,
    children: [
      {
        path: '',
        redirectTo: 'search',
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
