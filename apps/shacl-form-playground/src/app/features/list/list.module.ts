import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ShaclTemplateModule } from '@cognizone/shacl/template';

import { GraphCardComponent } from './components/graph-card/graph-card.component';
import { ListRoutingModule } from './list-routing.module';
import { ListView } from './views/list/list.view';

@NgModule({
  declarations: [ListView, GraphCardComponent],
  imports: [CommonModule, ListRoutingModule, MatCardModule, ShaclTemplateModule],
})
export class ListModule {}
