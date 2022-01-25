import { Datatype, LangString } from '@cognizone/model-utils';

import { MicroAttributeMapper } from './micro-attribute-mapper';

export class LangStringMapper implements MicroAttributeMapper<LangString, LangString> {
  supportDeserialize(dataType: string, value: LangString): boolean {
    return value != null && dataType === Datatype.RDF_LANG_STRING;
  }

  deserialize(dataType: string, value: LangString): LangString {
    return value;
  }

  supportSerialize(dataType: string, value: LangString): boolean {
    return value != null && dataType === Datatype.RDF_LANG_STRING;
  }

  serialize(dataType: string, value: LangString): LangString {
    return Object.keys(value).length > 0 ? value : (undefined as unknown as LangString);
  }
}
