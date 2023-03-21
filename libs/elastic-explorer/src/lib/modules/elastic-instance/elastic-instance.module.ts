import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { InputModule } from '@cognizone/legi-shared/input';
import { SelectModule } from '@cognizone/legi-shared/select';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ElasticPickerComponent } from './components/elastic-picker/elastic-picker.component';
import { ElasticInstanceManagementComponent } from './components/elastic-instance-management/elastic-instance-management.component';
import { ElasticInstanceEditorComponent } from './components/elastic-instance-editor/elastic-instance-editor.component';

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
