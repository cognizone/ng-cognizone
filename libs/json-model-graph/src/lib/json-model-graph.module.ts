import { ModuleWithProviders, NgModule } from '@angular/core';

import { IfAttributeInApDirective } from './directives/if-attribute-in-ap.directive';
import { NodeAttributeLinkedDirective } from './directives/node-attribute-linked.directive';
import { NodeAttributeDirective } from './directives/node-attribute.directive';
import { NodeUriDirective } from './directives/node-uri.directive';
import { RootUriDirective } from './directives/root-uri.directive';

const directives = [IfAttributeInApDirective, NodeAttributeDirective, NodeUriDirective, RootUriDirective, NodeAttributeLinkedDirective];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class JsonModelGraphModule {
  static forRoot(): ModuleWithProviders<JsonModelGraphRootModule> {
    return {
      ngModule: JsonModelGraphRootModule,
    };
  }
}

@NgModule({
  imports: [],
})
export class JsonModelGraphRootModule {}
