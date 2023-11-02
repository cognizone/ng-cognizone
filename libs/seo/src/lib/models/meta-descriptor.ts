import { Many } from '@cognizone/model-utils';

import { Processor } from './processor';
import { MetaId } from './meta-id';
import { MetaPropertyDirectiveProps } from './meta-property-directive-props';

export type MetaDescriptor = {
  id: MetaId;
  keyAttribute?: 'name' | 'property';
  preProcessors?: Many<Processor>;
  postProcessors?: Many<Processor>;
  multi?: boolean;
  separator?: string; // only for multi true, incompatible with multiTags
  multiTags?: boolean; // only for multi true, incompatible with separator
  metaPropertyDirectiveProps?: MetaPropertyDirectiveProps;
};
