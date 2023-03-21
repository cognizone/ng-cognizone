import { Injectable } from '@angular/core';
import { Many, manyToArray } from '@cognizone/model-utils';

@Injectable()
export class IdGenerator {
  prefix = 'http://resource/';

  private counter = 0;

  generateId(types: Many<string>): string {
    types = manyToArray(types).map(encodeURIComponent).join('-');
    let prefix = this.prefix;
    if (!prefix.endsWith('#') && !prefix.endsWith('/')) {
      prefix = `${prefix}/`;
    }
    return `${prefix}${types}/${this.counter++}-${Date.now()}`;
  }
}
