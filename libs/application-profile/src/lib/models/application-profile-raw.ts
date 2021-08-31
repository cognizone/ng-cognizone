import { Many } from '@cognizone/model-utils';

export interface ApplicationProfileRaw {
  uri: string;
  [classId: string]: TypeProfileRaw | string;
}

export interface TypeProfileRaw {
  constraints: Record<string, Many<string>>;
  [attributeKey: string]: AttributeProfileRaw | Record<string, Many<string>>;
}

export interface AttributeProfileRaw {
  uri: string;
  [ruleId: string]: Record<string, unknown> | string;
}
