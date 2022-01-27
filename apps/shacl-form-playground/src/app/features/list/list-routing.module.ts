import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListView } from './views/list/list.view';

const routes: Routes = [
  {
    path: '',
    component: ListView,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
