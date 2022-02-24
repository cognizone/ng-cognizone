import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingButtonModule } from '@cognizone/legi-shared/loading-button';
import { ShaclFormModule } from '@cognizone/shacl/form';
import { SharedModule } from '@shfp/shared';

import { DetailsRoutingModule } from './details-routing.module';
import { DetailsView } from './views/details/details.view';

@NgModule({
  declarations: [DetailsView],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, DetailsRoutingModule, ShaclFormModule, LoadingButtonModule],
})
export class DetailsModule {}
