import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';

const vendors = [CommonModule, MatToolbarModule, MatButtonModule, TranslocoModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: [...vendors],
  exports: [...vendors],
})
export class SharedModule {}
