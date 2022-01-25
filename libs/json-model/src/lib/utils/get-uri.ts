import { JsonModel, JsonModelFlat } from '../models/json-model';

export function getUri(o: JsonModel | JsonModelFlat | string): string {
  return typeof o === 'string' ? o : o['@id'];
}
