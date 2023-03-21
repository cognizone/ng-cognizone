import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ListPaginatorModule } from '@cognizone/legi-shared/list-paginator';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { ElasticInstanceModule } from '../elastic-instance';
import { DataErrorTableComponent } from './components/data-error-table/data-error-table.component';
import { DataValidationView } from './views/data-validation/data-validation.view';

@NgModule({
  declarations: [DataValidationView, DataErrorTableComponent],
  imports: [
    CommonModule,
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
  ],
  exports: [DataValidationView],
})
export class DataValidationModule {}
