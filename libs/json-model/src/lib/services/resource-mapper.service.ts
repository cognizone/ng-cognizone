/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, Optional } from '@angular/core';
import { Datatype, DatatypeLong, manyToArray, manyToOne, TypedResource } from '@cognizone/model-utils';

import { Resource } from '../models';
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

  deserialize<T extends object>(raw: TypedResource): Resource<T> {
    const rawAttributes = raw.attributes ?? {};
    const attributes = {} as Resource<T>['attributes'];
    keys(rawAttributes).forEach(attributeKey => {
      const attribute = rawAttributes[attributeKey];
      const dataTypes = stringKeys(attribute);
      if (!dataTypes.length) return;
      for (const type of dataTypes) {
        const value = attribute[type as keyof typeof attribute];

        const newValue = this.deserializeAttribute(type, value);
        if (dataTypes.length === 1) {
          (attributes as any)[attributeKey] = { value: newValue, dataType: type };
        } else {
          (attributes as any)[attributeKey] = (attributes as any)[attributeKey] ?? [];
          (attributes as any)[attributeKey].push({ value: newValue, dataType: type });
        }
      }
      const dataType = stringKeys(attribute).pop();
      if (!dataType) return;
    });
    return { references: {}, ...raw, attributes };
  }

  serialize(model: Resource): TypedResource {
    const attributes: TypedResource['attributes'] = {};
    keys(model.attributes).forEach(attributeKey => {
      const values = manyToArray(model.attributes[attributeKey]);
      for (const { value, dataType } of values) {
        const rawValue = dataType ? this.serializeAttribute(dataType, value) : undefined;

        if (rawValue != null) {
          if (values.length <= 1) {
            attributes[attributeKey] = { [dataType]: rawValue };
          } else {
            attributes[attributeKey] = attributes[attributeKey] ?? {};
            attributes[attributeKey][dataType] = attributes[attributeKey][dataType] ?? [];
            (attributes[attributeKey][dataType] as unknown[]).push(...manyToArray(rawValue));
            if (this.isLangString(dataType)) {
              attributes[attributeKey][dataType] = manyToOne(attributes[attributeKey][dataType]);
            }
          }
        }
      }
    });
    return { ...model, attributes };
  }

  private isLangString(dataType: string): boolean {
    return dataType === Datatype.RDF_LANG_STRING || dataType === DatatypeLong.RDF_LANG_STRING;
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
