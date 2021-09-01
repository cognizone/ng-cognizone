import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternalDocView } from '@app/shared';

const routes: Routes = [{ path: '', component: ExternalDocView, data: { libName: 'model-utils' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelUtilsDocRoutingModule {}
