import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { OperationViewerModalComponent } from './components/operation-viewer-modal/operation-viewer-modal.component';
import { GetOperationDirective } from './directives/get-operation.directive';
import { IfOperationDirective } from './directives/if-operation.directive';
import { OperationGroupDirective } from './directives/operation-group.directive';
import { OperationDirective } from './directives/operation.directive';

const components = [OperationViewerModalComponent];

const directives = [IfOperationDirective, OperationDirective, OperationGroupDirective, GetOperationDirective];

@NgModule({
  declarations: [...directives, ...components],
  exports: [...directives, ...components],
  imports: [CommonModule, MatButtonModule, MatDialogModule, NgxJsonViewerModule],
})
export class OperationsModule {}
