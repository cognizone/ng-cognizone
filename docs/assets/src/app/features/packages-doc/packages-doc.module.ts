import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { PackagesDocRoutingModule } from './packages-doc-routing.module';
import { LibrariesListView } from './views/libraries-list/libraries-list.view';

@NgModule({
  imports: [SharedModule, PackagesDocRoutingModule],
  declarations: [LibrariesListView],
})
export class PackagesDocModule {}
