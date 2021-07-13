import { Many } from '@cognizone/model-utils';

/**
 * @experimental
 */
export type Uri<T extends JsonModel> = string & { '@@meta_type_placeholder@@'?: T };

export interface JsonModel {
  '@id': string;
  '@type': JsonModelType;
  '@context': {
    rootUri: string;
    isNew?: boolean;
  };
  '@facets'?: {};
}

export type JsonModelType<T extends Many<string> = string> = T extends string ? T | [T, ...string[]] | Many<string> : Many<string>;

export function isJsonModel(o: unknown): o is JsonModel {
  return typeof o === 'object' && o != null && '@id' in o && '@type' in o;
}

export interface JsonModels<T extends JsonModel = JsonModel> {
  [uri: string]: T;
}

export type JsonModelFlat<T = JsonModel> = {
  [key in keyof T]: T[key] extends JsonModel
    ? string
    : T[key] extends JsonModel | undefined
    ? string | undefined
    : T[key] extends JsonModel[]
    ? string[]
    : T[key] extends JsonModel[] | undefined
    ? string[] | undefined
    : T[key];
};

export interface JsonModelFlatGraph<T extends JsonModelFlat = JsonModelFlat> {
  rootUri: string;
  models: {
    [uri: string]: T;
  };
}
