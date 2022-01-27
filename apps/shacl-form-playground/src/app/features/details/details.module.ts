import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShaclFormModule } from '@cognizone/shacl/form';
import { LoadingButtonModule } from '@cognizone/legi-shared/loading-button';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsView } from './views/details/details.view';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsView],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, DetailsRoutingModule, ShaclFormModule, LoadingButtonModule],
})
export class DetailsModule {}
