import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { AutocompleteModule } from '@cognizone/legi-shared/autocomplete';
import { DatePickerModule } from '@cognizone/legi-shared/date-picker';
import { InputModule } from '@cognizone/legi-shared/input';
import { TranslocoModule } from '@jsverse/transloco';
import { TranslocoLocaleModule } from '@jsverse/transloco-locale';

import { UserActionTableComponent } from './components/user-action-table/user-action-table.component';
import { PaginatorOutlineDirective } from './directives/paginator-outline.directive';
import { USER_ACTIONS_MODULE_OPTIONS_TOKEN, UserActionsModuleOptions } from './model/user-action-module-options';
import { UserActionClient } from './service/user-action-client.service';
import { UserActionService } from './service/user-action.service';
import { UserActionOptionsService } from './service/user-actions-options.service';

const components = [UserActionTableComponent];

@NgModule({
  declarations: [...components, PaginatorOutlineDirective],
  imports: [
    // Angular
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    // Others
    TranslocoModule,
    TranslocoLocaleModule,
    // Cognizone
    InputModule,
    DatePickerModule,
    AutocompleteModule,
  ],
  exports: [...components],
  providers: [UserActionService, UserActionOptionsService, UserActionClient],
})
export class UserActionModule {
  static withOptions(options?: UserActionsModuleOptions): ModuleWithProviders<UserActionModule> {
    return {
      ngModule: UserActionModule,
      providers: [
        {
          provide: USER_ACTIONS_MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}
