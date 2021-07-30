import { Rule } from './rule';

export type ApplicationProfileOrApName = ApplicationProfile | string;

export type ApplicationProfile = {
  uri: string;
  types: { [classId: string]: TypeProfile };
};

export type TypeProfile = {
  rules: Rule[];
  classIds: string[];
  attributes: { [attributeId: string]: AttributeProfile };
};

export type AttributeProfile = {
  uri: string;
  rules: Rule[];
  attributeId: string;
};

export const EMPTY_APPLICATION_PROFILE: ApplicationProfile = {
  uri: 'this is an empty Ap',
  types: {},
};
