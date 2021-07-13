import { JsonModel, JsonModelFlat } from '../models/json-model';

export function getUri(o: JsonModelFlat | JsonModel | string): string {
  return typeof o === 'string' ? o : o['@id'];
}
