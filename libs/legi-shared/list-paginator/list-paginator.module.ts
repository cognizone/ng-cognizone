import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoLangStringModule } from '@cognizone/transloco-langstring';
import { TranslocoModule } from '@ngneat/transloco';

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
    TranslocoLangStringModule,
    // Other
    TranslocoModule,
  ],
  declarations: [ListPaginatorComponent],
  exports: [ListPaginatorComponent],
})
export class ListPaginatorModule {}
