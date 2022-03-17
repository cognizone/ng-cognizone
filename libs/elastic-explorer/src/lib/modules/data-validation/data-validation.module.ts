import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListPaginatorModule } from '@cognizone/legi-shared/list-paginator';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DataValidationView } from './views/data-validation/data-validation.view';
import { ElasticInstanceModule } from '../elastic-instance';
import { DataErrorTableComponent } from './components/data-error-table/data-error-table.component';

@NgModule({
  declarations: [DataValidationView, DataErrorTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ElasticInstanceModule,
    ListPaginatorModule,
    MatDividerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MonacoEditorModule,
    MatTooltipModule,
  ],
  exports: [DataValidationView],
})
export class DataValidationModule {}
