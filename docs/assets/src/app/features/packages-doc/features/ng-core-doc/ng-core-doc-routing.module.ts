import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggerDocComponent } from './views/logger-doc/logger-doc.component';
import { OnDestroyMixinDocComponent } from './views/on-destroy-mixin-doc/on-destroy-mixin-doc.component';

const routes: Routes = [
  { path: '', redirectTo: 'on-destroy-mixin' },
  {
    path: 'on-destroy-mixin',
    component: OnDestroyMixinDocComponent,
  },
  {
    path: 'logger',
    component: LoggerDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgCoreDocRoutingModule {}
