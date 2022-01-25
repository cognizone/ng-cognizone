/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core';
import { Many, manyToOne, DatatypeLong } from '@cognizone/model-utils';

import { isJsonModel, JsonModel, JsonModelFlatGraph, JsonModels } from '../models/json-model';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from './data-model-definition-helper.service';
import { IdGenerator } from './id-generator.service';

@Injectable()
export class JsonModelService {
  constructor(
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper<unknown>,
    private idGenerator: IdGenerator
  ) {}

  toFlatGraph(root: JsonModel): JsonModelFlatGraph {
    const all: JsonModelFlatGraph = { rootUri: root['@id'], models: {} };
    this._toGraph(root, all);
    return all;
  }

  fromFlatGraph<T extends JsonModel>(graph: JsonModelFlatGraph, dataModelDefinition: unknown): T {
    const root = graph.models[graph.rootUri];
    return this._fromGraph(root, graph, {}, dataModelDefinition) as T;
  }

  createNewJsonModel(types: Many<string>, dataModelDefinition: unknown, root?: JsonModel | string): JsonModel {
    const uri = this.idGenerator.generateId(types);
    let rootUri = uri;
    if (root) {
      rootUri = typeof root === 'string' ? root : root['@context'].rootUri;
    }
    const jsonModel: JsonModel = {
      '@id': uri,
      '@type': types,
      '@context': { rootUri, isNew: true },
    };

    // TODO remove this part maybe?
    this.dataModelDefinitionHelper.getProperties(dataModelDefinition, types).forEach(key => {
      const range = this.dataModelDefinitionHelper.getTargetType(dataModelDefinition, types, key);
      let value: unknown;
      if (range.length === 1 && manyToOne(range) === DatatypeLong.RDF_LANG_STRING) {
        value = {};
      } else {
        value = this.dataModelDefinitionHelper.isSingle(dataModelDefinition, types, key) ? undefined : [];
      }
      (jsonModel as any)[key] = value;
    });

    return jsonModel;
  }

  private _fromGraph(o: unknown, graph: JsonModelFlatGraph, allUnflattened: JsonModels, dataModelDefinition: unknown): unknown {
    if (o == null) return o;
    if (Array.isArray(o)) return o.map(item => this._fromGraph(item, graph, allUnflattened, dataModelDefinition));
    if (isJsonModel(o)) {
      if (allUnflattened[o['@id']]) return o['@id'];

      const unflattened = { ...o };
      allUnflattened[o['@id']] = unflattened;
      Object.entries(unflattened)
        .filter(([key]) => !key.startsWith('@'))
        .forEach(([key, value]) => {
          let newValue = this._fromGraph(value, graph, allUnflattened, dataModelDefinition);
          const isReference = this.dataModelDefinitionHelper.isReference(dataModelDefinition, o['@type'], key);
          if (!isReference && isJsonModel(newValue)) {
            newValue = newValue['@id'];
          }
          (unflattened as any)[key] = newValue;
        });

      return unflattened;
    }

    if (typeof o === 'string') {
      if (allUnflattened[o]) return allUnflattened[o];
      if (graph.models[o]) return this._fromGraph(graph.models[o], graph, allUnflattened, dataModelDefinition);
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
