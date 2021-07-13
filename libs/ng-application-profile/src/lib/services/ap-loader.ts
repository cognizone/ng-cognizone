import { InjectionToken, Provider, Type } from '@angular/core';
import { ApplicationProfile } from '@cognizone/application-profile';
import { Observable } from 'rxjs';

export interface ApLoader {
  apName: string;

  load(): ApplicationProfile | Promise<ApplicationProfile> | Observable<ApplicationProfile>;
}

export const AP_LOADER_TOKEN = new InjectionToken<ApLoader[]>('ApLoader', { factory: () => [] });

export function provideApLoader(clazz: Type<ApLoader>): Provider {
  return {
    provide: AP_LOADER_TOKEN,
    useClass: clazz,
    multi: true
  };
}
