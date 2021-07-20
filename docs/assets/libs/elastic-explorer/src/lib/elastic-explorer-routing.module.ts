import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ElasticExplorerComponent } from './views/elastic-explorer/elastic-explorer.component';

const routes: Routes = [{ path: '', component: ElasticExplorerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElasticExplorerRoutingModule {}
