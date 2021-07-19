import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AutocompleteModule } from '@cognizone/legi-shared/autocomplete';
import { CheckboxGroupModule } from '@cognizone/legi-shared/checkbox-group';
import { InputModule } from '@cognizone/legi-shared/input';
import { ListPaginatorModule } from '@cognizone/legi-shared/list-paginator';
import { SelectModule } from '@cognizone/legi-shared/select';
import { TranslocoLangStringModule } from '@cognizone/transloco-langstring';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AttributeDisplayComponent } from './components/attribute-display/attribute-display.component';
import { ElasticInstanceEditorComponent } from './components/elastic-instance-editor/elastic-instance-editor.component';
import { ElasticInstanceManagementComponent } from './components/elastic-instance-management/elastic-instance-management.component';
import { ElasticPickerComponent } from './components/elastic-picker/elastic-picker.component';
import { ElasticQueryEditorComponent } from './components/elastic-query-editor/elastic-query-editor.component';
import { FiltersFormComponent } from './components/filters-form/filters-form.component';
import { FullModelDetailComponent } from './components/full-model-detail/full-model-detail.component';
import { JsonModelLabelComponent } from './components/json-model-label/json-model-label.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { FilterObjectPipe } from './pipes/filter-object.pipe';
import { JsonModelLabelPipe } from './pipes/json-model-label.pipe';
import { RemoveCircularFromJsonModelPipe } from './pipes/remove-circular-from-json-model.pipe';
import { UriCropPipe } from './pipes/uri-crop.pipe';
import { ElasticExplorerComponent } from './views/elastic-explorer/elastic-explorer.component';

@NgModule({
  declarations: [
    ElasticExplorerComponent,
    AttributeDisplayComponent,
    EllipsisPipe,
    UriCropPipe,
    JsonModelLabelComponent,
    RemoveCircularFromJsonModelPipe,
    FullModelDetailComponent,
    FiltersFormComponent,
    ElasticPickerComponent,
    JsonModelLabelPipe,
    ElasticInstanceManagementComponent,
    ElasticInstanceEditorComponent,
    FilterObjectPipe,
    ElasticQueryEditorComponent
  ],
  imports: [
    // TODO add back when migrating to angular 12
    // ElasticExplorerRoutingModule,
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Cognizone
    AutocompleteModule,
    CheckboxGroupModule,
    InputModule,
    ListPaginatorModule,
    SelectModule,
    // Material
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatListModule,
    // Misc
    TranslocoLocaleModule,
    TranslocoLangStringModule,
    ClipboardModule,
    // TODO add back when migrating to angular 12
    // NgxsModule.forFeature([ElasticExplorerState]),
    NgxJsonViewerModule,
    // TODO add back when migrating to angular 12
    // MonacoEditorModule.forRoot(),
    MonacoEditorModule,
    FormsModule
  ]
})
export class DataExplorerModule {}
