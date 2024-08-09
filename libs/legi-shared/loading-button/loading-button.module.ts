import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingButtonDirective } from './loading-button.directive';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    // Material
    MatProgressSpinnerModule,
  ],
  declarations: [LoadingButtonDirective],
  exports: [LoadingButtonDirective],
})
export class LoadingButtonModule {}
