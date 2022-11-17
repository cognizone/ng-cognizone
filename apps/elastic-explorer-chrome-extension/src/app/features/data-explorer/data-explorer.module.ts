import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DataValidationState,
  ElasticExplorerModule as LibDataExplorerModule,
  ElasticExplorerState,
  routes,
} from '@cognizone/elastic-explorer';
import { NgxsModule } from '@ngxs/store';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@NgModule({
  declarations: [],
  imports: [
    LibDataExplorerModule,
    NgxsModule.forFeature([ElasticExplorerState, DataValidationState]),
    MonacoEditorModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class DataExplorerModule {}
