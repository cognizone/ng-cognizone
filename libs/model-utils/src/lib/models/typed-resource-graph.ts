import { TypedResource } from './typed-resource';

export interface TypedResourceGraph {
  data: TypedResource;
  included?: TypedResource[];
  facets?: {};
}
