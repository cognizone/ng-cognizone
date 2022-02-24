import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { I18nModule } from '@cognizone/i18n';
import { JsonModelGraphModule } from '@cognizone/json-model-graph';
import { DatePickerModule } from '@cognizone/legi-shared/date-picker';
import { InputModule } from '@cognizone/legi-shared/input';
import { ShaclSharedModule } from '@cognizone/shacl/shared';
import { ShaclTemplateModule } from '@cognizone/shacl/template';

import { AttributeFieldComponent } from './components/attribute-field/attribute-field.component';
import { GraphFormComponent } from './components/graph-form/graph-form.component';
import { NodeFormComponent } from './components/node-form/node-form.component';
import { PropertyFieldComponent } from './components/property-field/property-field.component';
import { PropertyGroupFormComponent } from './components/property-group-form/property-group-form.component';

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
