import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationView } from './views/data-validation/data-validation.view';
import { ElasticInstanceModule } from '../elastic-instance';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ElasticQueryEditorComponent } from './components/elastic-query-editor/elastic-query-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DataValidationView, ElasticQueryEditorComponent],
  imports: [CommonModule, ReactiveFormsModule, ElasticInstanceModule, MatDividerModule, MatButtonModule, MonacoEditorModule],
  exports: [DataValidationView],
})
export class DataValidationModule {}
