import {
  ApplicationProfile,
  AttributeProfile,
  getConcreteType,
  isClassIdRule,
  isDataTypeRule,
  isMaxCardinalityRule,
  isMinCardinalityRule,
  isOrClassIdRule,
  isOrDataTypeRule,
  isRangeRule,
  isRdfTypesRule,
  isSubClassOfRule,
  TypeProfile,
} from '@cognizone/application-profile';
import { Dictionary, notNil, Datatype, Prefixes } from '@cognizone/model-utils';
import { existsSync } from 'fs';
import { flatten, kebabCase } from 'lodash';
import { dirname, join } from 'path';

import { DEFAULT_PREFIXES } from '../models/default-prefixes';
import { normalizeClassId } from '../utils/normalize-class-id';

import { PrefixService } from './prefix.service';
import { TemplateService } from './template.service';

// tslint:disable:no-console

export class ApInterfacesGenerationService {
  private unknownDataTypeWarnings: Dictionary<string[]> = {};
  private prefixService: PrefixService = new PrefixService();

  constructor(private options: ApGenerationOptions) {}

  async process(): Promise<void> {
    const types = Object.entries(this.options.ap.types)
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .map(([name, type]) => this.getTypeForTemplate(type, name));

    this.logWarnings();

    const imports = flatten(types.map(t => t.imports)).sort((a, b) => a.from.localeCompare(b.from));
    await TemplateService.process('ap-interfaces.ts.hbs', this.options.targetPath, {
      context: { types, imports },
      force: true,
    });
  }

  private getTypeForTemplate(type: TypeProfile, name: string): TypeForTemplate {
    let isFlat = this.options.isFlat;
    let extendClass = 'JsonModel';

    const classIds = this.getAllClassIds(type);

    let attributes = Object.values(type.attributes)
      .sort((a, b) => a.attributeId.localeCompare(b.attributeId))
      .map(profile => this.getAttribute(name, profile));

    const parents = classIds.filter(id => id !== name);
    const allParentsPresent = this.checkParentsPresentInAp(parents, name);
    if (!allParentsPresent) {
      isFlat = true;
    }
    if (!isFlat && parents.length > 0) {
      const parent = getConcreteType(this.options.ap, parents);
      if (parent) {
        extendClass = this.normalizeClassId(parent);
        attributes = attributes.filter(attr => parents.every(parentId => this.options.ap.types[parentId].attributes[attr.name] == null));
      } else {
        console.warn(`Failed to find parent of class ${name}, falling back to flat structure`);
      }
    }
    const normalizedName = this.normalizeClassId(name);

    const facetsFileName = `${kebabCase(normalizedName)}.facets.ts`;
    const facetsPath = join(dirname(this.options.targetPath), facetsFileName);
    let facets;
    const imports: Import[] = [];
    if (existsSync(facetsPath)) {
      facets = `${normalizedName}Facets`;
      imports.push({
        element: facets,
        from: `./${facetsFileName}`.replace('.ts', ''),
      });
    }

    const overrides = this.options.attributesOverride?.[normalizedName];
    if (overrides) {
      Object.entries(overrides).forEach(([attributeName, value]) => {
        const index = attributes.findIndex(a => a.name === attributeName);
        if (index > -1) {
          const newValue = { ...attributes[index], ...value };
          attributes.splice(index, 1, newValue);
        } else {
          attributes.push(value);
        }
      });
    }

    return {
      name: normalizedName,
      classIds: classIds.map(v => `'${v}'`).join(', '),
      attributes: attributes.sort((a, b) => a.name.localeCompare(b.name)),
      extendClass,
      imports,
      facets,
    };
  }

  private getAllClassIds(type: TypeProfile): string[] {
    if (this.options.useSubclassOfRule) {
      const ids: string[] = [];
      let parentType: null | TypeProfile = type;
      while (parentType) {
        const parentId = parentType.classIds[0];
        ids.push(parentId);
        const grandParentId = parentType.rules.find(isSubClassOfRule)?.value as string | undefined;
        parentType = grandParentId ? this.options.ap.types[grandParentId] : null;
      }
      return ids;
    }
    return (
      type.rules
        .find(isRdfTypesRule)
        ?.value.map(v => v.split(/[#\/]/).pop())
        .filter(notNil) ?? []
    );
  }

  private checkParentsPresentInAp(parents: string[], name: string): boolean {
    for (const parentId of parents) {
      const type = this.options.ap.types[parentId];
      if (!type) {
        console.warn(`Could not find type profile for parent '${parentId}' while processing child class '${name}'`);
        return false;
      }
    }
    return true;
  }

  private getAttribute(classId: string, attributeProfile: AttributeProfile): Attribute {
    let type = 'string';
    let isUnionType = false;
    const datatypeMappings = { ...DEFAULT_DATATYPE_MAPPINGS, ...this.options.datatypeMappings } as DatatypeMappings;
    const prefixes = { ...DEFAULT_PREFIXES, ...this.options.prefixes };

    let isSingle = attributeProfile.rules.find(isMaxCardinalityRule)?.value === 1;

    const minCardinality = attributeProfile.rules.find(isMinCardinalityRule)?.value ?? 0;
    const isRequired = this.options.useMinCardinality ? minCardinality >= 1 : false;

    const rangeRule = attributeProfile.rules.find(isRangeRule);
    const classIdRule = isClassIdRule(rangeRule?.value) ? rangeRule?.value : undefined;
    const classIdOrRule = isOrClassIdRule(rangeRule?.value) ? rangeRule?.value : undefined;
    const dataTypeRule = isDataTypeRule(rangeRule?.value) ? rangeRule?.value : undefined;
    const orDataTypeRule = isOrDataTypeRule(rangeRule?.value) ? rangeRule?.value : undefined;

    const checkType = (t: string) => {
      if (this.options.ap.types[t]) return this.normalizeClassId(t);
      console.warn(
        `"${classId}.${attributeProfile.attributeId}" is supposed to point to classId "${t}" but none was found in the AP. Falling back to JsonModel type in generated interface.`
      );
      return 'JsonModel';
    };

    const getTypeFromDataType = (datatype: string) => {
      const datatypeShort = this.prefixService.shortenUri(datatype, prefixes);
      const mapped = datatypeMappings[datatypeShort];
      if (!mapped) {
        this.addUnknownDataTypeWarning(datatype, classId, attributeProfile.attributeId);
      }
      const mapping = mapped ?? { type: 'string' };
      if (mapping.isAlwaysSingle) {
        isSingle = true;
      }
      return mapping.type;
    };

    if (!rangeRule) {
      console.warn(`"${classId}.${attributeProfile.attributeId}": missing range rule, falling back to string`);
    } else if (dataTypeRule) {
      type = getTypeFromDataType(dataTypeRule.value);
    } else if (classIdRule) {
      type = checkType(classIdRule.value);
    } else if (classIdOrRule) {
      type = classIdOrRule.value
        .map(v => v.value)
        .map(checkType)
        .join(' | ');
      isUnionType = true;
    } else if (orDataTypeRule) {
      let types = orDataTypeRule.value.map(rule => getTypeFromDataType(rule.value));
      types = Array.from(new Set(types));
      type = types.join(' | ');
      isUnionType = types.length > 1;
    } else {
      console.warn(`"${classId}.${attributeProfile.attributeId}": range rule type not handled, falling back to string`, rangeRule);
    }

    if (!isSingle) {
      if (isUnionType) {
        type = `(${type})`;
      }
      type += '[]';
    }

    return {
      name: attributeProfile.attributeId,
      type,
      isOptional: !isRequired,
    };
  }

  private normalizeClassId(classId: string): string {
    return normalizeClassId(classId, this.options.interfacePrefix);
  }

  private addUnknownDataTypeWarning(dataType: string, classId: string, attributeId: string): void {
    this.unknownDataTypeWarnings[dataType] = this.unknownDataTypeWarnings[dataType] ?? [];
    this.unknownDataTypeWarnings[dataType].push(`${classId}.${attributeId}`);
  }

  private logWarnings(): void {
    Object.entries(this.unknownDataTypeWarnings).forEach(([datatype, paths]) => {
      const oldLength = paths.length;
      paths = [...paths].sort().slice(0, Math.min(oldLength, 3));
      if (paths.length < oldLength) paths.push('...');
      console.warn(`${datatype} was not found in datatype mapping, falled back to string for:`, paths.join(', '));
    });
  }
}

export interface ApGenerationOptions {
  ap: ApplicationProfile;
  targetPath: string;
  interfacePrefix?: string;
  datatypeMappings?: DatatypeMappings;
  prefixes?: Prefixes;
  isFlat?: boolean;
  useSubclassOfRule?: boolean;
  useMinCardinality?: boolean;
  verbose?: boolean;
  attributesOverride?: AttributesOverride;
}

export interface AttributesOverride {
  [className: string]: {
    [attributeId: string]: Attribute;
  };
}

interface TypeForTemplate {
  name: string;
  classIds: string;
  attributes: Attribute[];
  extendClass: string;
  imports: Import[];
  facets?: string;
}

interface Import {
  element: string;
  from: string;
}

interface Attribute {
  name: string;
  type: string;
  isOptional: boolean;
}

export interface DatatypeMappings {
  [dataType: string]: DatatypeMapping;
}

export interface DatatypeMapping {
  type: string;
  isAlwaysSingle?: boolean;
}

export const DEFAULT_DATATYPE_MAPPINGS: DatatypeMappings = {
  [Datatype.RDF_LANG_STRING]: { type: 'LangString', isAlwaysSingle: true },
  [Datatype.XSD_BOOLEAN]: { type: 'boolean' },
  [Datatype.XSD_LONG]: { type: 'number' },
  ['xsd:int']: { type: 'number' },
  [Datatype.XSD_DATE]: { type: 'Date' },
  [Datatype.XSD_DATE_TIME]: { type: 'Date' },
  [Datatype.RDFS_RESOURCE]: { type: 'string' },
  [Datatype.XSD_STRING]: { type: 'string' },
};
