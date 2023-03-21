import { Datatype } from '@cognizone/model-utils';

import { MicroAttributeMapper } from './micro-attribute-mapper';

export class DateTimeMapper implements MicroAttributeMapper<string, Date> {
  supportDeserialize(dataType: string, value: string): boolean {
    return value != null && dataType === Datatype.XSD_DATE_TIME;
  }

  deserialize(dataType: string, value: string): Date {
    return new Date(value);
  }

  supportSerialize(dataType: string, value: Date): boolean {
    return value != null && dataType === Datatype.XSD_DATE_TIME;
  }

  serialize(dataType: string, value: Date): string {
    return value.toISOString();
  }
}
