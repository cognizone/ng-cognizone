import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ShaclTemplateComponent } from './components/shacl-template/shacl-template.component';

@NgModule({
  declarations: [ShaclTemplateComponent],
  exports: [ShaclTemplateComponent],
  imports: [CommonModule],
})
export class ShaclTemplateModule {}
