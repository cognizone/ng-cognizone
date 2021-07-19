import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import {
  ElasticExplorerComponent,
  ElasticExplorerModule as LibDataExplorerModule,
  ElasticExplorerState
} from '@cognizone/elastic-explorer';
import { NgxsModule } from '@ngxs/store';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [],
  imports: [
    LibDataExplorerModule,
    NgxsModule.forFeature([ElasticExplorerState]),
    MonacoEditorModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: ElasticExplorerComponent
      }
    ])
  ]
})
export class DataExplorerModule {}
