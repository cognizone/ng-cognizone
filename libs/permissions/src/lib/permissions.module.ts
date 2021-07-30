import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EnabledForPermissionDirective } from './directives/enabled-for-permission.directive';
import { GetHasPermissionDirective } from './directives/get-has-permission.directive';
import { IfHasPermissionDirective } from './directives/if-has-permission.directive';

const directives = [EnabledForPermissionDirective, GetHasPermissionDirective, IfHasPermissionDirective];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives],
})
export class PermissionsModule {}
