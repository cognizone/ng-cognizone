import { InjectionToken, Provider, Type } from '@angular/core';
import { ApplicationProfile } from '@cognizone/application-profile';
import { Completable } from '@cognizone/model-utils';

export interface ApLoader {
  apName: string;

  load(): Completable<ApplicationProfile>;
}

export const AP_LOADER_TOKEN = new InjectionToken<ApLoader[]>('ApLoader', { factory: () => [] });

export function provideApLoader(clazz: Type<ApLoader>): Provider {
  return {
    provide: AP_LOADER_TOKEN,
    useClass: clazz,
    multi: true,
  };
}
