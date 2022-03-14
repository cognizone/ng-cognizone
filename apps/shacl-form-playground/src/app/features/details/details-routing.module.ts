import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsDataNewResolver, DetailsDataResolver } from './resolvers';
import { DetailsView } from './views/details/details.view';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new',
  },
  {
    path: 'create/:type',
    component: DetailsView,
    resolve: {
      detailsData: DetailsDataNewResolver,
    },
  },
  {
    path: ':uri',
    component: DetailsView,
    resolve: {
      detailsData: DetailsDataResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsRoutingModule {}
