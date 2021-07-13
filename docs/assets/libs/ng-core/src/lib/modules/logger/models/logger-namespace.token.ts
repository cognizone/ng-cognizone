import { InjectionToken } from '@angular/core';

export const LOGGER_NAMESPACE_TOKEN = new InjectionToken('LOGGER_NAMESPACE', { factory: () => '' });
