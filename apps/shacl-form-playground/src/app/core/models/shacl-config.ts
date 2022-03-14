import { Dictionary, Many, TypedResourceContext } from '@cognizone/model-utils';

export interface ShaclConfig {
  appContext: TypedResourceContext;
  newModelUriPrefix: string;
  datatypeFieldTypeMapping: Dictionary<Many<string>>;
}
