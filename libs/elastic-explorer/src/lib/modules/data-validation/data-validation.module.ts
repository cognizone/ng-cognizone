import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataValidationView } from './views/data-validation/data-validation.view';
import { ElasticInstanceModule } from '../elastic-instance';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DataValidationView],
  imports: [CommonModule, ElasticInstanceModule, MatDividerModule, MatButtonModule],
  exports: [DataValidationView],
})
export class DataValidationModule {}
