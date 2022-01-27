import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListView } from './views/list/list.view';
import { GraphCardComponent } from './components/graph-card/graph-card.component';
import { MatCardModule } from '@angular/material/card';
import { ShaclTemplateModule } from '@cognizone/shacl/template';

@NgModule({
  declarations: [ListView, GraphCardComponent],
  imports: [CommonModule, ListRoutingModule, MatCardModule, ShaclTemplateModule],
})
export class ListModule {}
