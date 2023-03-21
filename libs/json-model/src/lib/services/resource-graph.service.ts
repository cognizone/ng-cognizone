/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core';
import { Datatype, DatatypeLong, Many, manyToArray, manyToOne, TypedResource, TypedResourceGraph } from '@cognizone/model-utils';

import { Resource, ResourceGraph } from '../models';
import { JsonModel } from '../models/json-model';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from './data-model-definition-helper.service';
import { PrefixCcService } from './prefix-cc.service';
import { ResourceMapper } from './resource-mapper.service';

// TODO rename according to new model name

@Injectable()
export class ResourceGraphService {
  constructor(
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper,
    private readonly resourceMapper: ResourceMapper,
    private readonly prefixCc: PrefixCcService
  ) {}

  // TODO rename according to new model name
  jsonModelToResourceGraphRaw(json: JsonModel | undefined, definition: unknown): TypedResourceGraph | undefined {
    if (!json) return undefined;
    const { data, included = [] } = this.jsonModelToResourceGraph(json, definition) as ResourceGraph;
    const removeEmpty = (d: TypedResource) => {
      if (JSON.stringify(d.attributes) === '{}') {
        d = { ...d, attributes: undefined };
        delete d.attributes;
      }
      if (JSON.stringify(d.references) === '{}') {
        d = { ...d, references: undefined };
        delete d.references;
      }
      return d;
    };
    const typedResourceGraph: TypedResourceGraph = {
      data: removeEmpty(this.resourceMapper.serialize(data)),
      included: included.map(inc => removeEmpty(this.resourceMapper.serialize(inc))),
    };
    if (json['@context']) {
      typedResourceGraph.context = json['@context'];
    }
    if (json['@facets']) {
      typedResourceGraph.facets = json['@facets'];
    }
    return typedResourceGraph;
  }

  // TODO rename according to new model name
  resourceGraphRawToJsonModel(rawSource: TypedResourceGraph, definition?: unknown): JsonModel {
    const all = [rawSource.data, ...(rawSource.included ?? [])];
    // this transformed map is used for perf reason, limiting the number of loops on the models to 1
    const transformed: { [uri: string]: JsonModel } = {};
    all.forEach(resource => {
      const temp = this.resourceMapper.deserialize(resource);
      const { json, references } = this._resourceToJsonModel<JsonModel>(temp, definition);

      if (!transformed[resource.uri]) transformed[resource.uri] = {} as any;
      Object.assign(transformed[resource.uri], json);

      Object.entries(references).forEach(([refKey, referenceUris]) => {
        let isSingle = false;
        if (definition) {
          isSingle = this.dataModelDefinitionHelper.isSingle(definition, resource.type, refKey);
        } else if (typeof referenceUris === 'string') {
          isSingle = true;
        }
        referenceUris = manyToArray(referenceUris);
        const refs = referenceUris.map(referenceUri => {
          if (!transformed[referenceUri]) transformed[referenceUri] = { '@id': referenceUri } as any;
          return transformed[referenceUri];
        });
        (transformed[resource.uri] as any)[refKey] = isSingle ? refs[0] : refs;
      });
    });
    const root = transformed[rawSource.data.uri];
    if (rawSource.facets) {
      root['@facets'] = rawSource.facets;
    }
    if (rawSource.context) {
      root['@context'] = rawSource.context;
    }
    return root;
  }

  private jsonModelToResourceGraph(
    json: JsonModel | undefined,
    definition: unknown,
    alreadyTransformed: Set<string> = new Set()
  ): ResourceGraph | undefined {
    if (!json) return undefined;
    const data: Resource<any> = { uri: json['@id'], type: json['@type'], references: {}, attributes: {} };
    const included: Resource[] = [];
    alreadyTransformed.add(json['@id']);
    Object.entries(json)
      .filter(([key]) => {
        if (key.startsWith('@')) return false;
        if (!this.dataModelDefinitionHelper.hasProperty(definition, data.type, key)) {
          console.warn('Could not find property in model definition, skipping', { definition, data, key });
          return false;
        }
        return true;
      })
      .forEach(([key, value]) => {
        if (this.dataModelDefinitionHelper.isAttribute(definition, data.type, key)) {
          const hasMultipleTypes = this.dataModelDefinitionHelper.getTargetType(definition, data.type, key).length > 1;
          if (hasMultipleTypes) {
            const attrTypeMap = {} as any;
            const isSingle = this.dataModelDefinitionHelper.isSingle(definition, data.type, key);
            for (const jsonModelValue of manyToArray(value)) {
              const datatype = this.shortenUri(jsonModelValue['@type']);
              const actualValue = jsonModelValue['@value'];
              data.attributes[key] = data.attributes[key] ?? [];
              if (attrTypeMap[datatype]) {
                attrTypeMap[datatype].value.push(actualValue);
              } else {
                attrTypeMap[datatype] = {
                  dataType: this.shortenUri(datatype),
                  value: isSingle || this.isLangString(datatype) ? manyToOne(actualValue) : manyToArray(actualValue),
                };
                (data.attributes[key] as unknown[]).push(attrTypeMap[datatype]);
              }
            }
            if (isSingle && Array.isArray(data.attributes[key]) && (data.attributes[key] as unknown[]).length <= 1) {
              data.attributes[key] = manyToOne(data.attributes[key]);
            }
          } else {
            const dataType = this.dataModelDefinitionHelper.getTargetType(definition, data.type, key)[0];
            data.attributes[key] = { dataType: this.shortenUri(dataType), value };
          }
        } else if (this.dataModelDefinitionHelper.isReference(definition, data.type, key)) {
          const workingValue = value as Many<JsonModel | string>;
          if (Array.isArray(workingValue)) {
            const references: string[] = [];
            workingValue.forEach((v: JsonModel | string) => {
              if (!v) return;
              if (typeof v === 'string') {
                references.push(v);
                return;
              } else if (alreadyTransformed.has(v['@id'])) {
                references.push(v['@id']);
                return;
              }
              const subSource = this.jsonModelToResourceGraph(v, definition, alreadyTransformed);
              if (!subSource) return;
              references.push(subSource.data.uri);
              included.push(subSource.data, ...(subSource.included || []));
            });
            data.references[key] = references;
          } else {
            if (typeof workingValue === 'string') {
              data.references[key] = workingValue;
              return;
            }
            if (workingValue && alreadyTransformed.has(workingValue['@id'])) {
              data.references[key] = workingValue['@id'];
              return;
            }
            const subSource = this.jsonModelToResourceGraph(workingValue, definition, alreadyTransformed);
            if (!subSource) return;
            data.references[key] = subSource.data.uri;
            included.push(subSource.data, ...(subSource.included || []));
          }
          if (Array.isArray(data.references[key]) && data.references[key].length === 0) {
            delete data.references[key];
          }
        } else {
          throw new Error(`Property ${data.type}/${key} is neither an attribute or a reference`);
        }
      });
    return { data, included, context: json['@context'], facets: json['@facets'] };
  }

  private isLangString(dataType: string): boolean {
    return [dataType, this.shortenUri(dataType)].some(type => type === Datatype.RDF_LANG_STRING || type === DatatypeLong.RDF_LANG_STRING);
  }

  private shortenUri(uri: string): string {
    return this.prefixCc.compactUri(uri);
  }

  private _resourceToJsonModel<T extends JsonModel>(data: Resource, definition?: unknown): { json: T; references: Resource['references'] } {
    const json = { '@id': data.uri, '@type': data.type } as T;

    Object.entries(data.attributes ?? {}).forEach(([key, attr]) => {
      const attributes = manyToArray(attr);
      let isSingle: boolean;
      let hasMultipleTypes: boolean;
      if (definition) {
        isSingle = this.dataModelDefinitionHelper.isSingle(definition, data.type, key);
        hasMultipleTypes = this.dataModelDefinitionHelper.getTargetType(definition, data.type, key).length > 1;
      } else {
        isSingle = false;
        hasMultipleTypes = attributes.length > 1;
      }

      for (const attribute of attributes) {
        const { value, dataType } = attribute as any;
        if (hasMultipleTypes) {
          for (const v of manyToArray(value)) {
            const jsonModelValue = { '@value': v, '@type': dataType };
            json[key as keyof T] = json[key as keyof T] ?? ([] as any);
            (json[key as keyof T] as unknown as unknown[]).push(jsonModelValue);
          }
          if (isSingle) {
            json[key as keyof T] = manyToOne(json[key as keyof T]);
          }
        } else {
          json[key as keyof T] = Array.isArray(value) && isSingle ? value[0] : value;
        }
      }
    });

    return { json, references: data.references };
  }
}
