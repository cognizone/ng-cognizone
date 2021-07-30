import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

import { COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN, CognizoneMaterialIconsOptions } from './models/cognizone-material-icons-options';
import { CognizoneMatIconRegistry } from './services/cognizone-mat-icon-registry.service';

@NgModule({})
export class CognizoneMaterialIconsModule {
  static forRoot(options: CognizoneMaterialIconsOptions): ModuleWithProviders<CognizoneMaterialIconsModule> {
    return {
      ngModule: CognizoneMaterialIconsModule,
      providers: [
        {
          provide: MatIconRegistry,
          useClass: CognizoneMatIconRegistry,
        },
        {
          provide: COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}
