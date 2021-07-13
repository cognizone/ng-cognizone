import { Injectable } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

@Injectable()
export class IdGenerator {
  private counter: number = 0;

  generateId(types: Many<string>): string {
    types = manyToArray(types).join('-').toLowerCase();
    return `new-model-uri-${types}-${this.counter++}-${Date.now()}`;
  }
}
