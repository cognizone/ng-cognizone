import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
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
