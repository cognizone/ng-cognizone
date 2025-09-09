import { Provider } from '@angular/core';

import { LOGGER_NAMESPACE_TOKEN } from './models/logger-namespace.token';

export function provideLogger(namespace: string): Provider[] {
  return [
    {
      provide: LOGGER_NAMESPACE_TOKEN,
      useValue: namespace,
    },
  ];
}
