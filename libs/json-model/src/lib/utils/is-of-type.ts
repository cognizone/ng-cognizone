import { Many, manyToArray } from '@cognizone/model-utils';

import { isJsonModel, JsonModel, JsonModelFlat } from '../models/json-model';

export function isOfType(model: JsonModel | Many<string>, type: string): boolean {
  const manyTypes = isJsonModel(model) ? model['@type'] : model;
  const types = manyToArray(manyTypes);
  return types.includes(type);
}

export function isJsonModelOfType<T extends JsonModel>(model: JsonModel, type: string): model is T {
  return isOfType(model, type);
}

export function isJsonModelFlatOfType<T>(model: unknown, type: string): model is JsonModelFlat<T> {
  return isOfType(model as JsonModel, type);
}

export function isJsonModelFlatOfTypeCurr<T>(type: string): (model: unknown) => model is JsonModelFlat<T> {
  return (model => isJsonModelFlatOfType<T>(model, type)) as (model: unknown) => model is JsonModelFlat<T>;
}
