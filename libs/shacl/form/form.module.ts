import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
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
import { AutocompleteModule } from '@cognizone/legi-shared/autocomplete';
import { SelectModule } from '@cognizone/legi-shared/select';
import { DatePickerModule } from '@cognizone/legi-shared/date-picker';
import { InputModule } from '@cognizone/legi-shared/input';
import { TextareaModule } from '@cognizone/legi-shared/textarea';
import { ShaclSharedModule } from '@cognizone/shacl/shared';
import { ShaclTemplateModule } from '@cognizone/shacl/template';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule, MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from '@angular/material/tooltip';

import { AttributeFieldComponent } from './components/attribute-field/attribute-field.component';
import { GraphFormComponent } from './components/graph-form/graph-form.component';
import { NodeFormComponent } from './components/node-form/node-form.component';
import { PropertyFieldComponent } from './components/property-field/property-field.component';
import { PropertyGroupFormComponent } from './components/property-group-form/property-group-form.component';
import { NodeFormsComponent } from './components/node-forms/node-forms.component';
import { NodeTitleComponent } from './components/node-title/node-title.component';
import { ManyToArrayPipe } from './pipes/many-to-array.pipe';
import { AddReferenceButtonComponent } from './components/add-reference-button/add-reference-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PropertyDescriptionComponent } from './components/property-description/property-description.component';
import { SortUrisPipe } from './pipes/sort-uris.pipe';
import { ReferencedInComponent } from './components/referenced-in/referenced-in.component';
import { CollapseUriPipe } from './pipes/collapse-uri.pipe';

@NgModule({
  declarations: [
    GraphFormComponent,
    NodeFormComponent,
    PropertyGroupFormComponent,
    PropertyFieldComponent,
    AttributeFieldComponent,
    NodeFormsComponent,
    NodeTitleComponent,
    ManyToArrayPipe,
    AddReferenceButtonComponent,
    PropertyDescriptionComponent,
    SortUrisPipe,
    ReferencedInComponent,
    CollapseUriPipe,
  ],
  exports: [GraphFormComponent, CollapseUriPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonModelGraphModule,
    InputModule,
    TextareaModule,
    AutocompleteModule,
    DatePickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatRippleModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTooltipModule,
    MatInputModule,
    OverlayModule,
    ShaclTemplateModule,
    I18nModule,
    SelectModule,
    ShaclSharedModule,
    MatCheckboxModule,
    MatMenuModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: {
        ...MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY(),
        showDelay: 1000,
      },
    },
  ],
})
export class ShaclFormModule {}
