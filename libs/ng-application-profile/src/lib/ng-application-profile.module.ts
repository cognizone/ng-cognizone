import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { ApFormBuilder, createMicroValidatorProvider } from './services/ap-form-builder.service';
import { ApHelper } from './services/ap-helper.service';
import { ApService } from './services/ap.service';
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
import { CardinalityValidatorService } from './services/validators/cardinality-validator.service';
import { ApStore } from './store/ap.store';

@NgModule({})
export class NgApplicationProfileModuleRoot {}

@NgModule({})
export class NgApplicationProfileModule {
  static forRoot(): ModuleWithProviders<NgApplicationProfileModuleRoot> {
    return {
      ngModule: NgApplicationProfileModuleRoot,
      providers: [
        ResourceMapper,
        ApFormBuilder,
        JsonModelService,
        IdGenerator,
        provideMicroAttributeMapper(ArrayMapper),
        provideMicroAttributeMapper(LangStringMapper),
        provideMicroAttributeMapper(DefaultMapper),
        provideMicroAttributeMapper(BooleanMapper),
        provideMicroAttributeMapper(DateMapper),
        provideMicroAttributeMapper(DateTimeMapper),
        createMicroValidatorProvider(CardinalityValidatorService),
        ApHelper,
        ApStore,
        ResourceGraphService,
        {
          provide: APP_INITIALIZER,
          multi: true,
          useFactory: apServiceInitializerFactory,
          deps: [ApService],
        },
      ],
    };
  }
}

export function apServiceInitializerFactory(apService: ApService): () => Promise<void> {
  const x = async () => apService.init();

  return x;
}
