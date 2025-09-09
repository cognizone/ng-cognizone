import { Provider } from '@angular/core';

import { JsonModelService } from './services/json-model.service';
import { ArrayMapper } from './services/mappers/array-mapper.service';
import { BooleanMapper } from './services/mappers/boolean-mapper.service';
import { DateMapper } from './services/mappers/date-mapper.service';
import { DateTimeMapper } from './services/mappers/date-time-mapper.service';
import { DefaultMapper } from './services/mappers/default-mapper.service';
import { LangStringMapper } from './services/mappers/lang-string-mapper.service';
import { provideMicroAttributeMapper } from './services/mappers/micro-attribute-mapper';
import { ResourceGraphService } from './services/resource-graph.service';
import { ResourceMapper } from './services/resource-mapper.service';

export function provideJsonModel(options: JsonModelOptions = {}): Provider[] {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (options.useDateMapper || options.useDateTimeMapper) {
    console.warn(
      '@cognizone/json-model: DateMapper and DateTimeMapper are deprecated, please use string representation of dates or make use of something fancier like Luxon. These mappers will be removed in v7.'
    );
  }
  return [
    ResourceMapper,
    JsonModelService,
    ...(options.useDateMapper ? [provideMicroAttributeMapper(DateMapper)] : []),
    ...(options.useDateTimeMapper ? [provideMicroAttributeMapper(DateTimeMapper)] : []),
    provideMicroAttributeMapper(ArrayMapper),
    provideMicroAttributeMapper(LangStringMapper),
    provideMicroAttributeMapper(DefaultMapper),
    provideMicroAttributeMapper(BooleanMapper),
    ResourceGraphService,
  ];
}

export interface JsonModelOptions {
  useDateMapper?: boolean;
  useDateTimeMapper?: boolean;
}
