import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { ArchitectureRoutingModule } from './architecture-routing.module';
import { ArchitectureComponent } from './architecture.component';
import { CdDefaultComponent } from './components/cd-default/cd-default.component';
import { CdOnPushComponent } from './components/cd-on-push/cd-on-push.component';
import { OnPushAsyncPipeComponent } from './components/on-push-async-pipe/on-push-async-pipe.component';
import { OnPushCdRefComponent } from './components/on-push-cd-ref/on-push-cd-ref.component';
import { ComponentsArchitectureComponent } from './views/components-architecture/components-architecture.component';
import { EnvApisAndFlagsComponent } from './views/env-apis-and-flags/env-apis-and-flags.component';
import { GeneralFormArticleComponent } from './views/general-form-article/general-form-article.component';
import { GettingStartedComponent } from './views/getting-started/getting-started.component';
import { GlobalArchitectureComponent } from './views/global-architecture/global-architecture.component';
import { StylingComponent } from './views/styling/styling.component';

@NgModule({
  declarations: [
    GettingStartedComponent,
    GlobalArchitectureComponent,
    EnvApisAndFlagsComponent,
    StylingComponent,
    ComponentsArchitectureComponent,
    CdOnPushComponent,
    CdDefaultComponent,
    OnPushCdRefComponent,
    OnPushAsyncPipeComponent,
    GeneralFormArticleComponent,
    ArchitectureComponent,
  ],
  imports: [CommonModule, ArchitectureRoutingModule, SharedModule],
})
export class ArchitectureModule {}
