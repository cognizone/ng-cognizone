import { Injectable } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

// TODO replace with http://resource generation for default

@Injectable()
export class IdGenerator {
  private counter = 0;

  generateId(types: Many<string>): string {
    types = manyToArray(types).join('-').toLowerCase();
    return `new-model-uri-${types}-${this.counter++}-${Date.now()}`;
  }
}
