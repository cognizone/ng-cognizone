import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { I18nModule } from '@cognizone/i18n';

import { ListPaginatorComponent } from './list-paginator.component';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    // Cognizone
    I18nModule,
  ],
  declarations: [ListPaginatorComponent],
  exports: [ListPaginatorComponent],
})
export class ListPaginatorModule {}
