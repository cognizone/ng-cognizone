import { InjectionToken } from '@angular/core';

export const DEVTOOLS_ENABLED_TOKEN = new InjectionToken<boolean>('DEVTOOLS_ENABLED_TOKEN', {
  factory: () => {
    const storage = localStorage.getItem('cz_devtools');
    if (storage) {
      return storage === 'true';
    }
    return location.host.includes('localhost') || location.host.includes('-dev.cogni.zone');
  },
});
