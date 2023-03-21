import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
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
import { RouterModule } from '@angular/router';
import { I18nModule } from '@cognizone/i18n';
import { AutocompleteModule } from '@cognizone/legi-shared/autocomplete';
import { CheckboxGroupModule } from '@cognizone/legi-shared/checkbox-group';
import { InputModule } from '@cognizone/legi-shared/input';
import { ListPaginatorModule } from '@cognizone/legi-shared/list-paginator';
import { SelectModule } from '@cognizone/legi-shared/select';
import { TranslocoLocaleModule } from '@ngneat/transloco-locale';
import { NgxsModule } from '@ngxs/store';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { ElasticInstanceModule } from '../elastic-instance';
import { ApDetailsComponent, apDetailsViewProvider } from './components/ap-details/ap-details.component';
import { AttributeDisplayComponent } from './components/attribute-display/attribute-display.component';
import { ElasticQueryEditorComponent } from './components/elastic-query-editor/elastic-query-editor.component';
import { FiltersFormComponent } from './components/filters-form/filters-form.component';
import { FullModelDetailComponent } from './components/full-model-detail/full-model-detail.component';
import { JsonModelDetailsComponent, jsonModelDetailsViewProvider } from './components/json-model-details/json-model-details.component';
import {
  JsonModelFlatGraphDetailsComponent,
  jsonModelFlatGraphDetailsViewProvider,
} from './components/json-model-flat-graph-details/json-model-flat-graph-details.component';
import { JsonModelLabelComponent } from './components/json-model-label/json-model-label.component';
import { RawDetailsComponent, rawDetailsViewProvider } from './components/raw-details/raw-details.component';
import { ResultsRawComponent } from './components/results-raw/results-raw.component';
import { ResultsStructuredComponent } from './components/results-structured/results-structured.component';
import { ResultsTableComponent } from './components/results-table/results-table.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { FilterObjectPipe } from './pipes/filter-object.pipe';
import { JsonModelLabelPipe } from './pipes/json-model-label.pipe';
import { RemoveCircularFromJsonModelPipe } from './pipes/remove-circular-from-json-model.pipe';
import { UriCropPipe } from './pipes/uri-crop.pipe';
import { ElasticExplorerState } from './store/elastic-explorer.state';
import { SearchView } from './views/search/search.view';

@NgModule({
  declarations: [
    ApDetailsComponent,
    AttributeDisplayComponent,
    ElasticQueryEditorComponent,
    EllipsisPipe,
    FilterObjectPipe,
    FiltersFormComponent,
    FullModelDetailComponent,
    JsonModelDetailsComponent,
    JsonModelFlatGraphDetailsComponent,
    JsonModelLabelComponent,
    JsonModelLabelPipe,
    RawDetailsComponent,
    RemoveCircularFromJsonModelPipe,
    ResultsRawComponent,
    ResultsStructuredComponent,
    ResultsTableComponent,
    SearchView,
    UriCropPipe,
  ],
  imports: [
    ElasticInstanceModule,
    // Angular
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    // Cognizone
    AutocompleteModule,
    CheckboxGroupModule,
    InputModule,
    ListPaginatorModule,
    SelectModule,
    // Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
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
    I18nModule,
    ClipboardModule,
    NgxsModule.forFeature([ElasticExplorerState]),
    NgxJsonViewerModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
  ],
  providers: [apDetailsViewProvider, rawDetailsViewProvider, jsonModelFlatGraphDetailsViewProvider, jsonModelDetailsViewProvider],
})
export class SearchModule {}
