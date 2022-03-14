import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ShaclTemplateModule } from '@cognizone/shacl/template';
import { SelectModule } from '@cognizone/legi-shared/select';
import { SharedModule } from '@shfp/shared';

import { GraphCardComponent } from './components/graph-card/graph-card.component';
import { ListRoutingModule } from './list-routing.module';
import { ListView } from './views/list/list.view';
import { ReactiveFormsModule } from '@angular/forms';
import { ShaclFormModule } from '@cognizone/shacl/form';

@NgModule({
  declarations: [ListView, GraphCardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    ShaclFormModule,
    ShaclTemplateModule,
    SharedModule,
    MatMenuModule,
    SelectModule,
  ],
})
export class ListModule {}
