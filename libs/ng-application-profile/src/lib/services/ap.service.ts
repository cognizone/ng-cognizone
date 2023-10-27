import { Inject, Injectable } from '@angular/core';
import { ApplicationProfile } from '@cognizone/application-profile';
import { firstValueFrom, isObservable } from 'rxjs';

import { ApStore } from '../store/ap.store';
import { AP_LOADER_TOKEN, ApLoader } from './ap-loader';

@Injectable({ providedIn: 'root' })
export class ApService {
  constructor(private apStore: ApStore, @Inject(AP_LOADER_TOKEN) private loaders: ApLoader[]) {}

  async init(): Promise<void> {
    for (const loader of this.loaders) {
      const ap = await this.loadAp(loader);
      this.addAp(loader.apName, ap);
    }
  }

  getAp(apName: string): ApplicationProfile {
    const ap = this.apStore.apMap[apName];
    if (!ap) throw new Error(`Could not find ap with name '${apName}', is there a loader for it?`);
    return ap;
  }

  addAp(apName: string, ap: ApplicationProfile): void {
    this.apStore.addAp(apName, ap);
  }

  private async loadAp(loader: ApLoader): Promise<ApplicationProfile> {
    const resp = loader.load();

    if (isObservable(resp)) {
      return firstValueFrom(resp);
    }
    return resp;
  }
}
