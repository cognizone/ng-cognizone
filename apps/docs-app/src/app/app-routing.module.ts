import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/core';
import { environment } from '@env/environment';

const routes: Routes = [
  environment.features.architecture
    ? {
        path: 'architecture',
        loadChildren: () => import('./features/architecture/architecture.module').then(m => m.ArchitectureModule),
      }
    : {
        path: 'architecture',
        redirectTo: '/page-not-found',
      },
  { path: 'packages', loadChildren: () => import('./features/packages-doc/packages-doc.module').then(m => m.PackagesDocModule) },
  { path: '', pathMatch: 'full', redirectTo: 'packages' },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', paramsInheritanceStrategy: 'always', useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
