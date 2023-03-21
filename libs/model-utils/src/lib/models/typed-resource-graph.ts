import { TypedResource } from './typed-resource';
import { TypedResourceContext } from './typed-resource-context';

export interface TypedResourceGraph {
  data: TypedResource;
  included?: TypedResource[];
  facets?: {};
  context?: TypedResourceContext;
}
