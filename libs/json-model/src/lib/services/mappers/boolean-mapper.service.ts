import { Datatype } from '@cognizone/model-utils';

import { MicroAttributeMapper } from './micro-attribute-mapper';

export class BooleanMapper implements MicroAttributeMapper<boolean | string, boolean> {
  supportDeserialize(dataType: string, value: string): boolean {
    return value != null && dataType === Datatype.XSD_BOOLEAN;
  }

  deserialize(dataType: string, value: string): boolean {
    return this.toBoolean(value);
  }

  supportSerialize(dataType: string, value: boolean): boolean {
    return value != null && dataType === Datatype.XSD_BOOLEAN;
  }

  serialize(dataType: string, value: boolean): boolean {
    return value;
  }

  private toBoolean(val: boolean | string): boolean {
    return typeof val === 'boolean' ? val : val === 'true';
  }
}
