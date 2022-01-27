import { Injectable } from '@angular/core';
import { DataModelDefinitionHelper, PrefixCcService } from '@cognizone/json-model';
import { Many, manyToArray, manyToOne, notNil, TypedResourceContext } from '@cognizone/model-utils';
import { ShNodeShape, ShPropertyShape, ShaczShapesGraph } from '../models';

@Injectable({ providedIn: 'root' })
export class ShaclHelper implements DataModelDefinitionHelper<ShaclHelperDefinition> {
  constructor(private prefixCcService: PrefixCcService) {}

  hasProperty(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): boolean {
    return !!this.getPropertyShape(definition, type, propertyKey);
  }

  isAttribute(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): boolean {
    const property = this.getPropertyShape(definition, type, propertyKey);
    return !!property?.['sh:datatype'];
  }

  isReference(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): boolean {
    const property = this.getPropertyShape(definition, type, propertyKey);
    return !!property?.['sh:class'];
  }

  isSingle(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): boolean {
    const property = this.getPropertyShape(definition, type, propertyKey);
    return property?.['sh:maxCount'] === 1;
  }

  isRequired(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): boolean {
    const property = this.getPropertyShape(definition, type, propertyKey);
    return property?.['sh:minCount'] === 1 && property?.['sh:maxCount'] === 1;
  }

  getTargetType(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): string[] {
    const property = this.getPropertyShape(definition, type, propertyKey);
    return manyToArray(property?.['sh:datatype'] ?? property?.['sh:class'])
      .filter(notNil)
      .map(path => this.prefixCcService.convertUri(path, definition.shapesGraph['@context'] ?? {}, definition.modelContext));
  }

  getProperties(definition: ShaclHelperDefinition, type: Many<string>): string[] {
    const nodeShape = this.getNodeShape(definition, type);
    return (nodeShape['sh:property'] ?? [])
      .map(property => property['sh:path'])
      .filter(notNil)
      .map(path => this.prefixCcService.convertUri(path, definition.shapesGraph['@context'] ?? {}, definition.modelContext));
  }

  getConcreteType(definition: ShaclHelperDefinition, type: Many<string>): string {
    // TODO actual implementation
    return manyToOne(type);
  }

  getNodeShape(definition: ShaclHelperDefinition, type: Many<string>): ShNodeShape {
    const concreteType = this.prefixCcService.expandUri(this.getConcreteType(definition, type), definition.modelContext);
    const nodeShape = definition.shapesGraph['shacz:shapes']?.find(nodeShape => {
      const targetClass = nodeShape['sh:targetClass'];
      if (!targetClass) return false;
      const classUri = this.prefixCcService.expandUri(targetClass, definition.shapesGraph['@context']);
      return classUri === concreteType;
    });
    if (!nodeShape) {
      throw new Error(`Could not find NodeShape associated to ${type}`);
    }
    return nodeShape;
  }

  getPropertyShape(definition: ShaclHelperDefinition, type: Many<string>, propertyKey: string): ShPropertyShape | undefined {
    propertyKey = this.prefixCcService.expandUri(propertyKey, definition.modelContext);
    const nodeShape = this.getNodeShape(definition, type);
    const propertyShape = nodeShape['sh:property']?.find(property => {
      const path = property['sh:path'];
      if (!path) return false;
      const propertyUri = this.prefixCcService.expandUri(path, definition.shapesGraph['@context']);

      return propertyUri === propertyKey;
    });
    if (!propertyShape) {
      throw new Error(`Could not find PropertyShape associated to property ${propertyKey} of ${type}`);
    }
    return propertyShape;
  }
}

export interface ShaclHelperDefinition {
  shapesGraph: ShaczShapesGraph;
  modelContext: TypedResourceContext;
}
