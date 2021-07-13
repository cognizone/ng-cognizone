import { Injectable } from '@angular/core';
import {
  ApplicationProfile,
  ApplicationProfileOrApName,
  isDataTypeRule,
  Resource,
  ResourceGraph,
  ResourceGraphRaw,
  ResourceRaw
} from '@cognizone/application-profile';
import { Many, manyToArray } from '@cognizone/model-utils';
import { set } from 'lodash-es';

import { JsonModel } from '../models/json-model';

import { ApHelper } from './ap-helper.service';
import { ApService } from './ap.service';
import { PrefixCcService } from './prefix-cc.service';
import { ResourceMapper } from './resource-mapper.service';

// tslint:disable: no-any

@Injectable()
export class ResourceGraphService {
  constructor(
    private readonly apHelper: ApHelper,
    private readonly apService: ApService,
    private readonly resourceMapper: ResourceMapper,
    private readonly prefixCc: PrefixCcService
  ) {}

  jsonModelToResourceGraphRaw(json: JsonModel | undefined, apLike: ApplicationProfileOrApName): ResourceGraphRaw | undefined {
    if (!json) return undefined;
    const ap = this.getAp(apLike);
    const { data, included = [] } = this.jsonModelToResourceGraph(json, ap) as ResourceGraph;
    const removeEmpty = (d: ResourceRaw) => {
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
    return {
      data: removeEmpty(this.resourceMapper.serialize(data)),
      included: included.map(inc => removeEmpty(this.resourceMapper.serialize(inc)))
    };
  }

  resourceGraphRawToJsonModel(rawSource: ResourceGraphRaw, apLike?: ApplicationProfileOrApName): JsonModel {
    const all = [rawSource.data, ...(rawSource.included || [])];
    const ap = apLike ? this.getAp(apLike) : undefined;
    // this transformed map is used for perf reason, limiting the number of loops on the models to 1
    const transformed: { [uri: string]: JsonModel } = {};
    all.forEach(resource => {
      const temp = this.resourceMapper.deserialize(resource);
      const profile = ap ? this.apHelper.getTypeProfile(ap, resource.type) : undefined;
      const { json, references } = this._resourceToJsonModel<JsonModel>(temp, ap);
      json['@context'].rootUri = rawSource.data.uri;

      if (!transformed[resource.uri]) transformed[resource.uri] = {} as any;
      Object.assign(transformed[resource.uri], json);

      Object.entries(references).forEach(([refKey, referenceUris]) => {
        let isSingle = false;
        if (profile) {
          isSingle = this.apHelper.isSingle(profile, refKey);
        } else if (typeof referenceUris === 'string') {
          isSingle = true;
        }
        referenceUris = manyToArray(referenceUris);
        const refs = referenceUris.map(referenceUri => {
          if (!transformed[referenceUri]) transformed[referenceUri] = { '@id': referenceUri } as any;
          return transformed[referenceUri];
        });
        set(transformed[resource.uri], refKey, isSingle ? refs[0] : refs);
      });
    });
    const root = transformed[rawSource.data.uri];
    if (rawSource.facets) {
      root['@facets'] = rawSource.facets;
    }
    return root;
  }

  private jsonModelToResourceGraph(
    json: JsonModel | undefined,
    ap: ApplicationProfile,
    alreadyTransformed: Set<string> = new Set()
  ): ResourceGraph | undefined {
    if (!json) return undefined;
    const data: Resource<any> = { uri: json['@id'], type: json['@type'], references: {}, attributes: {} };
    const included: Resource[] = [];
    const profile = this.apHelper.getTypeProfile(ap, data.type);
    alreadyTransformed.add(json['@id']);
    Object.entries(json)
      .filter(([key]) => {
        if (key.startsWith('@')) return false;
        if (!this.apHelper.hasAttribute(profile, key)) {
          // tslint:disable-next-line: no-console we don't want to depend on Logger here
          console.warn('Could not find attribute in profile, skipping', { profile, key });
          return false;
        }
        return true;
      })
      .forEach(([key, value]) => {
        const attrRule = this.apHelper.getRangeRule(profile, key).value;
        if (isDataTypeRule(attrRule)) {
          data.attributes[key] = { dataType: this.shortenUri(attrRule.value), value };
        } else {
          const workingValue = value as Many<string | JsonModel>;
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
              const subSource = this.jsonModelToResourceGraph(v, ap, alreadyTransformed);
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
            const subSource = this.jsonModelToResourceGraph(workingValue, ap, alreadyTransformed);
            if (!subSource) return;
            data.references[key] = subSource.data.uri;
            included.push(subSource.data, ...(subSource.included || []));
          }
          if (Array.isArray(data.references[key]) && data.references[key].length === 0) {
            delete data.references[key];
          }
        }
      });
    return { data, included };
  }

  private shortenUri(uri: string): string {
    const prefix = Object.entries(this.prefixCc.prefixes).find(([_, value]) => uri.startsWith(value));
    return prefix ? uri.replace(prefix[1], `${prefix[0]}:`) : uri;
  }

  private _resourceToJsonModel<T extends JsonModel>(
    data: Resource,
    ap?: ApplicationProfile
  ): { json: T; references: Resource['references'] } {
    const json = { '@id': data.uri, '@type': data.type, '@context': {} } as T;
    const profile = ap ? this.apHelper.getTypeProfile(ap, data.type) : undefined;

    Object.entries(data.attributes || {}).forEach(([key, attribute]) => {
      const { value } = attribute as any;
      let newValue = value;
      if (profile) {
        newValue = Array.isArray(value) && this.apHelper.isSingle(profile, key) ? value[0] : value;
      }
      set(json, key, newValue);
    });

    return { json, references: data.references };
  }

  private getAp(ap: ApplicationProfileOrApName): ApplicationProfile {
    return typeof ap === 'string' ? this.apService.getAp(ap) : ap;
  }
}
