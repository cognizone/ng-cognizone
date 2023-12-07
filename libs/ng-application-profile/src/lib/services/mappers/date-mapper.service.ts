import { Datatype } from '@cognizone/application-profile';

import { MicroAttributeMapper } from './micro-attribute-mapper';

export class DateMapper implements MicroAttributeMapper<string, Date> {
  supportDeserialize(dataType: string, value: string): boolean {
    return value != null && dataType === Datatype.XSD_DATE;
  }

  deserialize(dataType: string, value: string): Date {
    const offsetInMinutes = new Date().getTimezoneOffset();
    // 14 and 10 just to have some security offset, so we are sure we never overflow on the next/previous day, although 11 and 13 should be enough
    const hour = offsetInMinutes < 0 ? 14 : 10;
    const fullDateString = `${value}T${hour}:00:00.000Z`;
    return new Date(fullDateString);
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
