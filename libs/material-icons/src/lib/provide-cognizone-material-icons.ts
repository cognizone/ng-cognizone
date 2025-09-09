import { Provider } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';

import { COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN, CognizoneMaterialIconsOptions } from './models/cognizone-material-icons-options';
import { CognizoneMatIconRegistry } from './services/cognizone-mat-icon-registry.service';

export function provideCognizoneMaterialIcons(options: CognizoneMaterialIconsOptions): Provider[] {
  return [
    {
      provide: MatIconRegistry,
      useClass: CognizoneMatIconRegistry,
    },
    {
      provide: COGNIZONE_MATERIAL_ICONS_OPTIONS_TOKEN,
      useValue: options,
    },
  ];
}
