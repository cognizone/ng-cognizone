import { InjectionToken, Provider, Type } from '@angular/core';

export const MICRO_ATTRIBUTE_MAPPER_TOKEN = new InjectionToken<MicroAttributeMapper<unknown, unknown>>('MICRO_ATTRIBUTE_MAPPER');

export interface MicroAttributeMapper<RAW, MODEL> {
  priority?: number;
  supportDeserialize(dataType: string, value: RAW): boolean;
  deserialize(dataType: string, value: RAW, macroMapper: AttributeMapper): MODEL;
  supportSerialize(dataType: string, value: MODEL): boolean;
  serialize(dataType: string, value: MODEL, macroMapper: AttributeMapper): RAW;
}

export interface AttributeMapper {
  deserialize<T, U>(dataType: string, value: T): U;
  serialize<T, U>(dataType: string, value: T): U;
}

export function provideMicroAttributeMapper(service: Type<MicroAttributeMapper<unknown, unknown>>): Provider {
  return {
    multi: true,
    useClass: service,
    provide: MICRO_ATTRIBUTE_MAPPER_TOKEN,
  };
}
