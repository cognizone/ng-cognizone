import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ElasticExplorerModule as LibDataExplorerModule, ElasticExplorerState, routes } from '@cognizone/elastic-explorer';
import { NgxsModule } from '@ngxs/store';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [],
  imports: [
    LibDataExplorerModule,
    NgxsModule.forFeature([ElasticExplorerState]),
    MonacoEditorModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class DataExplorerModule {}
