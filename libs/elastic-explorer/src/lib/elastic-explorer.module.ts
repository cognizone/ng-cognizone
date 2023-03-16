import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ElasticExplorerRoutingModule } from './elastic-explorer-routing.module';
import { DataValidationModule } from './modules/data-validation';
import { SearchModule } from './modules/search';
import { ElasticExplorerView } from './views/elastic-explorer/elastic-explorer.view';

@NgModule({
  declarations: [ElasticExplorerView],
  imports: [
    ElasticExplorerRoutingModule,
    SearchModule,
    DataValidationModule,
    // Angular
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  providers: [],
})
export class ElasticExplorerModule {}
