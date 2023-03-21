import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProtocolGuard } from './core';
import { EmptyComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'elastic-explorer',
    pathMatch: 'full',
  },
  {
    path: 'elastic-explorer',
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    loadChildren: () => import('./features/data-explorer/data-explorer.module').then(m => m.DataExplorerModule),
  },
  {
    path: '**',
    canActivate: [ProtocolGuard],
    component: EmptyComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
