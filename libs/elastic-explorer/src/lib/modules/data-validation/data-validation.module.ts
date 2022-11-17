import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationView } from './views/data-validation/data-validation.view';
import { ElasticInstanceModule } from '../elastic-instance';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgxsModule } from '@ngxs/store';
import { DataValidationState } from './store/data-validation.state';
import { DataErrorTableComponent } from './components/data-error-table/data-error-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListPaginatorModule } from '@cognizone/legi-shared/list-paginator';

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
