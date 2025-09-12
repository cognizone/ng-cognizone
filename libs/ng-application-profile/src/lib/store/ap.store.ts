import { Injectable } from '@angular/core';
import { ApplicationProfile } from '@cognizone/application-profile';

@Injectable({ providedIn: 'root' })
export class ApStore {
  apMap: { [apName: string]: ApplicationProfile } = {};

  addAp(apName: string, ap: ApplicationProfile): void {
    this.apMap = { ...this.apMap, [apName]: ap };
  }
}
