import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgYasguiDocComponent } from './ng-yasgui-doc.component';

const routes: Routes = [{ path: '', component: NgYasguiDocComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgYasguiDocRoutingModule {}
