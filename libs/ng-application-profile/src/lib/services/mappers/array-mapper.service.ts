import { Injectable } from '@angular/core';

import { AttributeMapper, MicroAttributeMapper } from './micro-attribute-mapper';

@Injectable({
  providedIn: 'root',
})
export class ArrayMapper implements MicroAttributeMapper<unknown[], unknown[]> {
  priority = 1000;

  supportDeserialize(dataType: string, value: unknown[]): boolean {
    return Array.isArray(value);
  }

  deserialize(dataType: string, value: unknown[], macroMapper: AttributeMapper): unknown[] {
    return value.map(v => macroMapper.deserialize(dataType, v));
  }

  supportSerialize(dataType: string, value: unknown[]): boolean {
    return Array.isArray(value);
  }

  serialize(dataType: string, value: unknown[], macroMapper: AttributeMapper): unknown[] {
    return value.filter(v => v != null).map(v => macroMapper.serialize(dataType, v));
  }
}
