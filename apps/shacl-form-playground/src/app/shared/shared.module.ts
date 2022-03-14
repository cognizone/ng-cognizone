import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShaclSharedModule } from '@cognizone/shacl/shared';
import { TranslocoModule } from '@ngneat/transloco';
import { EncodeUriPipe } from './pipes/encode-uri.pipe';

const vendors = [CommonModule, MatToolbarModule, MatButtonModule, TranslocoModule, MatIconModule, ShaclSharedModule];
const pipes = [EncodeUriPipe];
@NgModule({
  imports: [...vendors],
  exports: [...vendors, ...pipes],
  declarations: [...pipes],
})
export class SharedModule {}
