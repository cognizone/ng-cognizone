import { JsonModel, JsonModelType } from '@cognizone/json-model';
import { Many } from '@cognizone/model-utils';

export interface ShaczShapesGraph extends JsonModel {
  '@type': JsonModelType<'shacz:ShapesGraph'>;
  'shacz:shapes'?: ShNodeShape[];
}

export interface ShNodeShape extends JsonModel {
  '@type': JsonModelType<'sh:NodeShape'>;
  'sh:property'?: ShPropertyShape[];
  'sh:targetClass'?: string;
  'shacz:shortTemplate'?: string;
}

export interface ShPropertyShape extends JsonModel {
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
}

export interface ShPropertyGroup extends JsonModel {
  '@type': JsonModelType<'sh:PropertyGroup'>;
  'sh:label'?: string;
  'sh:order'?: number;
}
