import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
import { Store } from '@ngxs/store';

import { ArchitectureComponent } from './architecture.component';
import { ComponentsArchitectureComponent } from './views/components-architecture/components-architecture.component';
import { EnvApisAndFlagsComponent } from './views/env-apis-and-flags/env-apis-and-flags.component';
import { GeneralFormArticleComponent } from './views/general-form-article/general-form-article.component';
import { GettingStartedComponent } from './views/getting-started/getting-started.component';
import { GlobalArchitectureComponent } from './views/global-architecture/global-architecture.component';
import { StylingComponent } from './views/styling/styling.component';

const routes: Routes = [
  {
    path: '',
    component: ArchitectureComponent,
    children: [
      { path: '', redirectTo: 'getting-started' },
      { path: 'getting-started', component: GettingStartedComponent },
      { path: 'global-architecture', component: GlobalArchitectureComponent },
      { path: 'env-apis-and-flags', component: EnvApisAndFlagsComponent },
      { path: 'styling', component: StylingComponent },
      environment.features.architecture.component
        ? { path: 'components', component: ComponentsArchitectureComponent }
        : { path: 'components', redirectTo: '/page-not-found' },
      environment.features.architecture.forms
        ? { path: 'forms', component: GeneralFormArticleComponent }
        : { path: 'forms', redirectTo: '/page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchitectureRoutingModule {}
