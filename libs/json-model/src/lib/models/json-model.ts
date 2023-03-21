/* eslint-disable @typescript-eslint/naming-convention */
import { Many, TypedResourceContext } from '@cognizone/model-utils';

/**
 * @experimental
 */
export type Uri<T extends JsonModel> = string & { '@@meta_type_placeholder@@'?: T };

export interface JsonModel {
  '@id': string;
  '@type': JsonModelType;
  '@context'?: TypedResourceContext;
  '@facets'?: {};
}

export type JsonModelType<T extends Many<string> = string> = T extends string ? Many<string> | T | [T, ...string[]] : Many<string>;

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
  context?: TypedResourceContext;
  facets?: {};
  models: {
    [uri: string]: T;
  };
}

export interface JsonModelValue<T> {
  '@value': T;
  '@type': string;
}

export function isJsonModelValue<T = unknown>(o: unknown): o is JsonModelValue<T> {
  return typeof o === 'object' && o != null && '@type' in o && '@value' in o;
}
