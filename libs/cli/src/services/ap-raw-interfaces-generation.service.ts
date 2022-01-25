import {
  ApplicationProfile,
  AttributeProfile,
  isClassIdRule,
  isDataTypeRule,
  isMaxCardinalityRule,
  isMinCardinalityRule,
  isOrClassIdRule,
  isOrDataTypeRule,
  isRangeRule,
  Rule,
  TypeProfile,
} from '@cognizone/application-profile';
import { Datatype } from '@cognizone/model-utils';

import { DEFAULT_PREFIXES } from '../models/default-prefixes';
import { normalizeClassId } from '../utils/normalize-class-id';

import { PrefixService } from './prefix.service';
import { TemplateService } from './template.service';

// tslint:disable:no-console

export class ApRawInterfacesGenerationService {
  private prefixService: PrefixService = new PrefixService();

  constructor(private options: ApRawGenerationOptions) {}

  async process(): Promise<void> {
    const types = Object.entries(this.options.ap.types)
      .sort(([aName], [bName]) => aName.localeCompare(bName))
      .map(([name, type]) => this.getRawTypeForTemplate(type, name));

    await TemplateService.process('ap-interfaces-raw.ts.hbs', this.options.targetPath, {
      context: { types },
      force: true,
    });
  }

  private getRawTypeForTemplate(type: TypeProfile, name: string): RawTypeForTemplate {
    const allAttributes = Object.values(type.attributes)
      .sort((a, b) => a.attributeId.localeCompare(b.attributeId))
      .map(profile => this.getRaw(profile));

    const normalizedName = this.normalizeClassId(name);

    const attributes = allAttributes.filter(a => 'isAttribute' in a && a.isAttribute) as AttributeRaw[];
    const references = allAttributes.filter(a => 'isReference' in a && a.isReference) as ReferenceRaw[];
    return {
      name: normalizedName,
      attributes: attributes,
      references: references,
      hasReferences: references.length > 0,
    };
  }

  private getRaw(attributeProfile: AttributeProfile): AttributeRaw | ReferenceRaw {
    const isSingle = attributeProfile.rules.find(isMaxCardinalityRule)?.value === 1;

    const minCardinality = attributeProfile.rules.find(isMinCardinalityRule)?.value ?? 0;
    const isRequired = this.options.useMinCardinality ? minCardinality >= 1 : false;

    const base = { name: attributeProfile.attributeId, isOptional: !isRequired };

    const rangeRule = attributeProfile.rules.find(isRangeRule);
    const classIdRule = isClassIdRule(rangeRule?.value) ? rangeRule?.value : undefined;
    const classIdOrRule = isOrClassIdRule(rangeRule?.value) ? rangeRule?.value : undefined;
    const dataTypeRule = isDataTypeRule(rangeRule?.value) ? rangeRule?.value : undefined;
    const orDataTypeRule = isOrDataTypeRule(rangeRule?.value) ? rangeRule?.value : undefined;

    const ruleToTypeString = (rule: Rule<string, string>) => {
      const typeKey = this.prefixService.shortenUri(rule.value, DEFAULT_PREFIXES);
      const type = this.dateTypeToType(rule.value);
      return `{'${typeKey}': ${type}${isSingle ? '' : '[]'}}`;
    };

    if (dataTypeRule) {
      return {
        ...base,
        type: ruleToTypeString(dataTypeRule),
        isAttribute: true,
      };
    } else if (classIdRule || classIdOrRule) {
      return {
        ...base,
        type: isSingle ? 'string' : 'string[]',
        isReference: true,
      };
    } else if (orDataTypeRule) {
      return {
        ...base,
        type: orDataTypeRule.value.map(ruleToTypeString).join(' | '),
        isAttribute: true,
      };
    }

    throw new Error(`Unhandled range rule for attribute '${attributeProfile.attributeId}'`);
  }

  private normalizeClassId(classId: string): string {
    return normalizeClassId(classId, this.options.interfacePrefix);
  }

  private dateTypeToType(datatypeUri: string): string {
    const prefixes = DEFAULT_PREFIXES;
    const shortUri = this.prefixService.shortenUri(datatypeUri, prefixes);
    return DEFAULT_RAW_DATATYPE_MAPPINGS[shortUri]?.type ?? 'string';
  }
}

export interface ApRawGenerationOptions {
  ap: ApplicationProfile;
  targetPath: string;
  interfacePrefix?: string;
  useMinCardinality?: boolean;
  verbose?: boolean;
}

interface RawTypeForTemplate {
  name: string;
  attributes: AttributeRaw[];
  references: ReferenceRaw[];
  hasReferences: boolean;
}

interface AttributeRaw {
  name: string;
  type: string;
  isOptional: boolean;
  isAttribute: true;
}

interface ReferenceRaw {
  name: string;
  type: string;
  isOptional: boolean;
  isReference: true;
}

export interface RawDatatypeMappings {
  [dataType: string]: RawDatatypeMapping;
}

export interface RawDatatypeMapping {
  type: string;
  isAlwaysSingle?: boolean;
}

export const DEFAULT_RAW_DATATYPE_MAPPINGS: RawDatatypeMappings = {
  [Datatype.RDF_LANG_STRING]: { type: 'LangString', isAlwaysSingle: true },
  [Datatype.XSD_BOOLEAN]: { type: 'boolean' },
  [Datatype.XSD_LONG]: { type: 'number' },
  ['xsd:int']: { type: 'number' },
};
