import { TypedResourceContext } from '@cognizone/model-utils';

export interface ShaclConfig {
  defaultContext: TypedResourceContext;
  graphRootType: string;
  graphRootUriBase: string;
}
