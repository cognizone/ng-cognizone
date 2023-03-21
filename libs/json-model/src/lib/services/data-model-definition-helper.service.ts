import { InjectionToken } from '@angular/core';
import { Many } from '@cognizone/model-utils';

export interface DataModelDefinitionHelper<T = unknown> {
  hasProperty(definition: T, type: Many<string>, propertyKey: string): boolean;
  isAttribute(definition: T, type: Many<string>, propertyKey: string): boolean;
  isReference(definition: T, type: Many<string>, propertyKey: string): boolean;
  isSingle(definition: T, type: Many<string>, propertyKey: string): boolean;
  isRequired(definition: T, type: Many<string>, propertyKey: string): boolean;
  getTargetType(definition: T, type: Many<string>, propertyKey: string): string[];
  getProperties(definition: T, type: Many<string>): string[];
  getConcreteType(definition: T, type: Many<string>): string;
}

export const DATA_MODEL_DEFINITION_HELPER_TOKEN = new InjectionToken<DataModelDefinitionHelper>('DataModelDefinitionHelper');
