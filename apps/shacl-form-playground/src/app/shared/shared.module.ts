import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIconModule } from '@angular/material/icon';

const vendors = [CommonModule, MatToolbarModule, MatButtonModule, TranslocoModule, MatIconModule];

@NgModule({
  declarations: [],
  imports: [...vendors],
  exports: [...vendors],
})
export class SharedModule {}
