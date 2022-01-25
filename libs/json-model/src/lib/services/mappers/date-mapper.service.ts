import { Datatype } from '@cognizone/model-utils';

import { MicroAttributeMapper } from './micro-attribute-mapper';

export class DateMapper implements MicroAttributeMapper<string, Date> {
  supportDeserialize(dataType: string, value: string): boolean {
    return value != null && dataType === Datatype.XSD_DATE;
  }

  deserialize(dataType: string, value: string): Date {
    return new Date(value);
  }

  supportSerialize(dataType: string, value: Date): boolean {
    return value != null && dataType === Datatype.XSD_DATE;
  }

  serialize(dataType: string, value: Date): string {
    const year = value.getFullYear();
    const month = this.pad(value.getMonth() + 1);
    const day = this.pad(value.getDate());
    return `${year}-${month}-${day}`;
  }

  private pad(val: number): string {
    return val < 10 ? `0${val}` : val.toString();
  }
}
