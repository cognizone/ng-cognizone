import { Inject, Injectable, Optional } from '@angular/core';
import { Resource, ResourceRaw } from '@cognizone/application-profile';

import { keys, stringKeys } from '../utils/keys';

import { AttributeMapper, MICRO_ATTRIBUTE_MAPPER_TOKEN, MicroAttributeMapper } from './mappers/micro-attribute-mapper';

@Injectable()
export class ResourceMapper {
  private attributeMapper: AttributeMapper = {
    deserialize: this.deserializeAttribute.bind(this),
    serialize: this.serializeAttribute.bind(this),
  };

  constructor(@Inject(MICRO_ATTRIBUTE_MAPPER_TOKEN) @Optional() private readonly mappers: MicroAttributeMapper<unknown, unknown>[]) {
    if (!this.mappers) this.mappers = [];
    if (!Array.isArray(this.mappers)) {
      throw new Error(`mappers should be an array, did you forget to add 'multi: true' in your provided 'MicroAttributeMapper'?`);
    }
    this.mappers = [...this.mappers].sort((d1, d2) => (d2.priority ?? 0) - (d1.priority ?? 0));
  }

  deserialize<T extends object>(raw: ResourceRaw): Resource<T> {
    const rawAttributes = raw.attributes ?? {};
    const attributes = keys(rawAttributes).reduce<Resource<T>['attributes']>((acc, attributeKey) => {
      const attribute = rawAttributes[attributeKey];
      const dataType = stringKeys(attribute).pop();
      if (!dataType) return acc;
      const value = attribute[dataType as keyof typeof attribute];

      const newValue = this.deserializeAttribute(dataType, value);

      return { ...acc, [attributeKey]: { value: newValue, dataType } };
    }, {} as Resource<T>['attributes']);
    return { references: {}, ...raw, attributes };
  }

  serialize(model: Resource): ResourceRaw {
    const attributes: ResourceRaw['attributes'] = {};
    keys(model.attributes).forEach(attributeKey => {
      const { value, dataType } = model.attributes[attributeKey];

      const rawValue = dataType ? this.serializeAttribute(dataType, value) : undefined;
      // we keep null values but no undefined, since undefined properties will disappear on JSON serialization
      if (rawValue !== undefined) {
        attributes[attributeKey] = { [dataType]: rawValue };
      }
    }, {});
    return { ...model, attributes };
  }

  private deserializeAttribute<T, U>(dataType: string, value: T): U {
    const mapper = this.mappers.find(d => d.supportDeserialize(dataType, value));
    if (!mapper) throw new Error(`no mapper found for data type '${dataType}'`);
    return mapper.deserialize(dataType, value, this.attributeMapper) as U;
  }

  private serializeAttribute<T, U>(dataType: string, value: T): U {
    const mapper = this.mappers.find(d => d.supportSerialize(dataType, value));
    if (!mapper) throw new Error(`no mapper found for data type '${dataType}'`);
    return mapper.serialize(dataType, value, this.attributeMapper) as U;
  }
}
