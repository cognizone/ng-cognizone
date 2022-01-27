import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphFormComponent } from './graph-form/graph-form.component';
import { JsonModelGraphModule } from '@cognizone/json-model-graph';
import { InputModule } from '@cognizone/legi-shared/input';
import { DatePickerModule } from '@cognizone/legi-shared/date-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NodeFormComponent } from './node-form/node-form.component';
import { PropertyGroupFormComponent } from './property-group-form/property-group-form.component';
import { PropertyFieldComponent } from './property-field/property-field.component';
import { AttributeFieldComponent } from './attribute-field/attribute-field.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { ShaclTemplateModule } from '../template';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { I18nModule } from '@cognizone/i18n';
import { ShaclSharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GraphFormComponent, NodeFormComponent, PropertyGroupFormComponent, PropertyFieldComponent, AttributeFieldComponent],
  exports: [GraphFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonModelGraphModule,
    InputModule,
    DatePickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    ShaclTemplateModule,
    I18nModule,
    ShaclSharedModule,
    MatCheckboxModule,
  ],
})
export class ShaclFormModule {}
