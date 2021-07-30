import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElasticExplorerModule as LibDataExplorerModule, ElasticExplorerState, ElasticExplorerView } from '@cognizone/elastic-explorer';
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
        component: ElasticExplorerView,
      },
    ]),
  ],
})
export class DataExplorerModule {}
