import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InputModule } from '@cognizone/legi-shared/input';
import { SelectModule } from '@cognizone/legi-shared/select';

import { ElasticInstanceEditorComponent } from './components/elastic-instance-editor/elastic-instance-editor.component';
import { ElasticInstanceManagementComponent } from './components/elastic-instance-management/elastic-instance-management.component';
import { ElasticPickerComponent } from './components/elastic-picker/elastic-picker.component';

const components = [ElasticInstanceEditorComponent, ElasticInstanceManagementComponent, ElasticPickerComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    InputModule,
    SelectModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [components],
})
export class ElasticInstanceModule {}
