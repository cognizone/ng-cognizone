import { Injectable } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

// TODO replace with http://resource generation for default

@Injectable()
export class IdGenerator {
  private counter = 0;

  generateId(types: Many<string>): string {
    const prefix = 'http://resource';
    types = manyToArray(types).map(encodeURIComponent).join('-');
    return `${prefix}/${types}/${this.counter++}-${Date.now()}`;
  }
}
