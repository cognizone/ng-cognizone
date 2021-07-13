import { Injectable } from '@angular/core';
import { ApplicationProfile, ApplicationProfileOrApName, DatatypeLong } from '@cognizone/application-profile';
import { Many } from '@cognizone/model-utils';

import { isJsonModel, JsonModel, JsonModelFlatGraph, JsonModels } from '../models/json-model';

import { ApHelper } from './ap-helper.service';
import { ApService } from './ap.service';
import { IdGenerator } from './id-generator.service';

// tslint:disable: no-any

@Injectable()
export class JsonModelService {
  constructor(private apHelper: ApHelper, private idGenerator: IdGenerator, private apService: ApService) {}

  toFlatGraph(root: JsonModel): JsonModelFlatGraph {
    const all: JsonModelFlatGraph = { rootUri: root['@id'], models: {} };
    this._toGraph(root, all);
    return all;
  }

  fromFlatGraph<T extends JsonModel>(graph: JsonModelFlatGraph, apLike: ApplicationProfileOrApName): T {
    const root = graph.models[graph.rootUri];
    const ap = typeof apLike === 'string' ? this.apService.getAp(apLike) : apLike;
    return this._fromGraph(root, graph, {}, ap) as T;
  }

  createNewJsonModel(types: Many<string>, apLike: ApplicationProfileOrApName, root?: JsonModel | string): JsonModel {
    const ap = typeof apLike === 'string' ? this.apService.getAp(apLike) : apLike;
    const profile = this.apHelper.getTypeProfile(ap, types);
    const uri = this.idGenerator.generateId(types);
    let rootUri = uri;
    if (root) {
      rootUri = typeof root === 'string' ? root : root['@context'].rootUri;
    }
    const jsonModel: JsonModel = {
      '@id': uri,
      '@type': types,
      '@context': { rootUri, isNew: true }
    };

    Object.entries(profile.attributes).forEach(([key, attribute]) => {
      const range = this.apHelper.getRangeRule(profile, key);
      let value: unknown;
      if (range.value.name === 'datatype' && range.value.value === DatatypeLong.RDF_LANG_STRING) {
        value = {};
      } else {
        value = this.apHelper.isSingleAttribute(attribute) ? undefined : [];
      }
      (jsonModel as any)[key] = value;
    });

    return jsonModel;
  }

  private _fromGraph(o: unknown, graph: JsonModelFlatGraph, allUnflattened: JsonModels, ap: ApplicationProfile): unknown {
    if (o == null) return o;
    if (Array.isArray(o)) return o.map(item => this._fromGraph(item, graph, allUnflattened, ap));
    if (isJsonModel(o)) {
      const typeProfile = this.apHelper.getTypeProfile(ap, o['@type']);
      if (allUnflattened[o['@id']]) return o['@id'];

      const unflattened = { ...o };
      allUnflattened[o['@id']] = unflattened;
      Object.entries(unflattened)
        .filter(([key]) => !key.startsWith('@'))
        .forEach(([key, value]) => {
          let newValue = this._fromGraph(value, graph, allUnflattened, ap);
          const isReference = this.apHelper.isReference(typeProfile, key);
          if (!isReference && isJsonModel(newValue)) {
            newValue = newValue['@id'];
          }
          (unflattened as any)[key] = newValue;
        });

      return unflattened;
    }

    if (typeof o === 'string') {
      if (allUnflattened[o]) return allUnflattened[o];
      if (graph.models[o]) return this._fromGraph(graph.models[o], graph, allUnflattened, ap);
    }
    return o;
  }

  private _toGraph(o: unknown, all: JsonModelFlatGraph): unknown {
    if (o == null) return o;
    if (Array.isArray(o)) return o.map(item => this._toGraph(item, all));
    if (!isJsonModel(o)) return o;
    if (all.models[o['@id']]) return o['@id'];

    const flattened = { ...o };
    all.models[o['@id']] = flattened;

    Object.entries(flattened)
      .filter(([key]) => !key.startsWith('@'))
      .forEach(([key, value]) => ((flattened as any)[key] = this._toGraph(value, all)));

    return flattened['@id'];
  }
}
