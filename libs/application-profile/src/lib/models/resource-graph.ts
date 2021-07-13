import { Resource, ResourceRaw } from './resource';

export interface ResourceGraph {
  data: Resource;
  included: Resource[];
  facets?: {};
}

export type ResourceGraphRaw = {
  data: ResourceRaw;
  included?: ResourceRaw[];
  facets?: {};
};
