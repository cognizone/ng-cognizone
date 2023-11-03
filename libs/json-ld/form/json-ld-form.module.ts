import { NgModule } from '@angular/core';

import { GraphFormDirective, NodeFormDirective } from './directives';

const directives = [GraphFormDirective, NodeFormDirective];

@NgModule({
  imports: [...directives],
  exports: [...directives],
})
export class JsonLdFormModule {}
