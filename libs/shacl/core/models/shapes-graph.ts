import { JsonModel, JsonModelType } from '@cognizone/json-model';
import { Many } from '@cognizone/model-utils';

export interface ShaczShapesGraph extends JsonModel {
  '@type': JsonModelType<'shacz:ShapesGraph'>;
  'sh:name'?: string;
  'shacz:shapes'?: ShNodeShape[];
}

export interface ShShape extends JsonModel {
  '@type': JsonModelType<'sh:Shape'>;
  'sh:deactivated'?: boolean;
}

export interface ShNodeShape extends ShShape {
  '@type': JsonModelType<'sh:NodeShape'>;
  'sh:property'?: ShPropertyShape[];
  'sh:targetClass'?: string;
  'shacz:isRoot'?: boolean;
  'shacz:shortTemplate'?: string;
}

export interface ShPropertyShape extends ShShape {
  '@type': JsonModelType<'sh:PropertyShape'>;
  'sh:class'?: Many<string>;
  'sh:datatype'?: string;
  'sh:description'?: string;
  'sh:group'?: ShPropertyGroup;
  'sh:maxCount'?: number;
  'sh:minCount'?: number;
  'sh:name'?: string;
  'sh:order'?: number;
  'sh:path'?: string;
  'shacz:linkingStrategy'?: LinkingStrategy[];
  'shacz:fieldType'?: FieldType;
  'shacz:option'?: ShaczPropertyOption[];
}

export interface ShPropertyGroup extends JsonModel {
  '@type': JsonModelType<'sh:PropertyGroup'>;
  'sh:label'?: string;
  'sh:order'?: number;
}

export interface ShaczPropertyOption {
  '@type': JsonModelType<'shacz:PropertyOption'>;
  ['shacz:value']?: string;
  ['sh:label']?: string;
}

export type LinkingStrategy = 'allow_create' | 'allow_reference';
export type FieldType = 'text' | 'textarea' | 'number' | 'date' | 'bool';
