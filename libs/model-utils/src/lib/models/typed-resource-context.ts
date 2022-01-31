import { Dictionary } from './dictionary';

export interface TypedResourceContext {
  base?: string;
  prefix?: Dictionary<string>;
}
