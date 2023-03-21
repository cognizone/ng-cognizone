/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@angular/core';
import { Datatype, DatatypeLong, Many, manyToArray, manyToOne, TypedResourceContext } from '@cognizone/model-utils';

import { isJsonModel, JsonModel, JsonModelFlatGraph, JsonModels } from '../models/json-model';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper } from './data-model-definition-helper.service';
import { IdGenerator } from './id-generator.service';

@Injectable()
export class JsonModelService {
  constructor(
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper,
    private idGenerator: IdGenerator
  ) {}

  toFlatGraph(root: JsonModel): JsonModelFlatGraph {
    const all: JsonModelFlatGraph = { rootUri: root['@id'], models: {} };
    if (root['@context']) {
      all.context = root['@context'];
    }
    if (root['@facets']) {
      all.facets = root['@facets'];
    }
    this._toGraph(root, all);
    return all;
  }

  fromFlatGraph<T extends JsonModel>(graph: JsonModelFlatGraph, dataModelDefinition: unknown): T {
    const root = graph.models[graph.rootUri];
    const jsonModel = this._fromGraph(root, graph, {}, dataModelDefinition) as T;
    if (graph.context) {
      jsonModel['@context'] = graph.context;
    }
    if (graph.facets) {
      jsonModel['@facets'] = graph.facets;
    }
    return jsonModel;
  }

  createNewBareboneJsonModel(types: Many<string>, context?: TypedResourceContext): JsonModel {
    const compactTypes = manyToArray(types);
    const uri = this.idGenerator.generateId(compactTypes);
    const jsonModel: JsonModel = {
      '@id': uri,
      '@type': types,
      '@context': context,
    };

    return jsonModel;
  }

  createNewJsonModel(types: Many<string>, dataModelDefinition: unknown, context?: TypedResourceContext): JsonModel {
    const compactTypes = manyToArray(types);
    const uri = this.idGenerator.generateId(compactTypes);
    const jsonModel: JsonModel = {
      '@id': uri,
      '@type': types,
      '@context': context,
    };

    this.dataModelDefinitionHelper.getProperties(dataModelDefinition, types).forEach(propertyUri => {
      const range = this.dataModelDefinitionHelper.getTargetType(dataModelDefinition, types, propertyUri);
      let value: unknown;
      if (range.length === 1 && (manyToOne(range) === DatatypeLong.RDF_LANG_STRING || manyToOne(range) === Datatype.RDF_LANG_STRING)) {
        value = {};
      } else {
        value = this.dataModelDefinitionHelper.isSingle(dataModelDefinition, types, propertyUri) ? undefined : [];
      }
      const key = propertyUri;
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
    delete flattened['@context'];
    delete flattened['@facets'];
    all.models[o['@id']] = flattened;

    Object.entries(flattened)
      .filter(([key]) => !key.startsWith('@'))
      .forEach(([key, value]) => ((flattened as any)[key] = this._toGraph(value, all)));

    return flattened['@id'];
  }
}
