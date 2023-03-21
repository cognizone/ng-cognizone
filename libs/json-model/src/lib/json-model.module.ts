import { ModuleWithProviders, NgModule } from '@angular/core';

import { IdGenerator } from './services/id-generator.service';
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

@NgModule({
  providers: [
    ResourceMapper,
    JsonModelService,
    IdGenerator,
    provideMicroAttributeMapper(ArrayMapper),
    provideMicroAttributeMapper(LangStringMapper),
    provideMicroAttributeMapper(DefaultMapper),
    provideMicroAttributeMapper(BooleanMapper),
    provideMicroAttributeMapper(DateMapper),
    provideMicroAttributeMapper(DateTimeMapper),
    ResourceGraphService,
  ],
})
export class JsonModelModuleRoot {}

@NgModule({})
export class JsonModelModule {
  static forRoot(): ModuleWithProviders<JsonModelModuleRoot> {
    return {
      ngModule: JsonModelModuleRoot,
    };
  }
}
