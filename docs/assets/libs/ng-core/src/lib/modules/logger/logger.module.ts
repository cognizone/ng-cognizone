import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { LOGGER_NAMESPACE_TOKEN } from './models/logger-namespace.token';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class LoggerModule {
  static forRoot(namespace: string): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: LOGGER_NAMESPACE_TOKEN,
          useValue: namespace,
        },
      ],
    };
  }
}
