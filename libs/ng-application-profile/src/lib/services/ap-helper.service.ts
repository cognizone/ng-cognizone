import { Injectable } from '@angular/core';
import {
  ApplicationProfile,
  ApplicationProfileOrApName,
  AttributeProfile,
  getConcreteType,
  isClassIdRule,
  isDataTypeRule,
  isMaxCardinalityRule,
  isMinCardinalityRule,
  isOrClassIdRule,
  isOrDataTypeRule,
  isRangeRule,
  RangeRule,
  Rule,
  TypeProfile,
} from '@cognizone/application-profile';
import { DatatypeLong, Many, manyToArray } from '@cognizone/model-utils';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries -- TODO fix me
import { DataModelDefinitionHelper } from '@cognizone/json-model';
import { Logger } from '@cognizone/ng-core';
import { memoize } from 'lodash-es';
import { ApService } from './ap.service';

@Injectable()
export class ApHelper implements DataModelDefinitionHelper<ApplicationProfileOrApName> {
  private apMap: WeakMap<ApplicationProfile, number> = new WeakMap();

  private weakMapCount = 0;

  constructor(private logger: Logger, private apService: ApService) {
    this.logger = logger.extend('ApHelper');
    this.getConcreteType = memoize(this.getConcreteType.bind(this), (ap: ApplicationProfileOrApName, classIds: Many<string>) => {
      ap = this.getAp(ap);
      if (!this.apMap.has(ap)) {
        this.apMap.set(ap, ++this.weakMapCount);
      }
      const count = this.apMap.get(ap) as number;
      return [count.toString(), ...manyToArray(classIds)].join('_');
    });
  }

  getTypeProfile(ap: ApplicationProfile, classIds: Many<string>): TypeProfile {
    const type = this.getConcreteType(ap, classIds);
    if (!type) {
      const message = `Could not find most concrete type among given classes ${manyToArray(classIds).join(', ')} in given AP`;
      this.logger.error(message, { ap, classIds });
      throw new Error(message);
    }
    const typeProfile = ap.types[type];
    if (!typeProfile) {
      throw new Error(`Could not find class of type "${type}" in given AP`);
    }
    return typeProfile;
  }

  hasProperty(definition: ApplicationProfileOrApName, type: Many<string>, key: string): boolean {
    const ap = this.getAp(definition);
    return this.getTypeProfile(ap, type).attributes[key] != null;
  }

  getRangeRule(definition: ApplicationProfileOrApName, type: Many<string>, key: string): RangeRule {
    const ap = this.getAp(definition);
    const profile = this.getTypeProfile(ap, type);
    const attr = profile.attributes[key];
    if (attr == null) throw new Error(`Could not find attribute '${key}' for type '${manyToArray(profile.classIds).join(', ')}'`);
    const rangeRule = attr.rules.find(isRangeRule);
    if (rangeRule == null) {
      throw new Error(`Attribute '${key}' for type '${manyToArray(profile.classIds).join(', ')}' does not have a 'range' rule`);
    }
    return rangeRule;
  }

  isAttribute(definition: ApplicationProfileOrApName, type: Many<string>, key: string): boolean {
    if (!this.hasProperty(definition, type, key)) return false;
    const rangeRule = this.getRangeRule(definition, type, key);
    return isDataTypeRule(rangeRule.value) || isOrDataTypeRule(rangeRule.value);
  }

  isReference(definition: ApplicationProfileOrApName, type: Many<string>, key: string): boolean {
    if (!this.hasProperty(definition, type, key)) return false;
    const rangeRule = this.getRangeRule(definition, type, key);
    return isClassIdRule(rangeRule.value) || isOrClassIdRule(rangeRule.value);
  }

  isSingle(definition: ApplicationProfileOrApName, type: Many<string>, key: string): boolean {
    const ap = this.getAp(definition);
    const attr = this.getTypeProfile(ap, type).attributes[key];
    return this.isSingleAttribute(attr);
  }

  isSingleAttribute(attr: AttributeProfile): boolean {
    if (!attr) return false;

    const rangeRule = attr.rules.find(isRangeRule);
    // json strings may be multiple, be are never an array
    if (rangeRule && rangeRule.value.name === 'datatype' && rangeRule.value.value === DatatypeLong.RDF_LANG_STRING) return true;
    const maxRule = attr.rules.find(isMaxCardinalityRule);
    if (!maxRule) return false;

    return maxRule.value === 1;
  }

  isRequired(definition: ApplicationProfileOrApName, type: Many<string>, propertyKey: string): boolean {
    const ap = this.getAp(definition);
    const attr = this.getTypeProfile(ap, type).attributes[propertyKey];
    if (!attr) return false;

    const minRule = attr.rules.find(isMinCardinalityRule);
    const maxRule = attr.rules.find(isMaxCardinalityRule);
    if (!maxRule || !minRule) return false;

    return maxRule.value === 1 && minRule.value === 1;
  }

  getRules(ap: ApplicationProfile, types: Many<string>, key?: string): Rule[] {
    const rules: Rule[] = [];
    const profile = this.getTypeProfile(ap, types);
    if (key) {
      const attributeRules = profile.attributes[key].rules;
      rules.push(...attributeRules);
      const rangeRule = this.getRangeRule(ap, types, key);
      if (isClassIdRule(rangeRule.value)) {
        rules.push(...this.getRules(ap, rangeRule.value.value));
      } else if (isOrClassIdRule(rangeRule.value)) {
        const subRules = rangeRule.value.value
          .map(classIdRule => this.getRules(ap, classIdRule.value))
          .reduce<Rule[]>((acc, current) => [...acc, ...current], []);
        rules.push(...subRules);
      }
    } else {
      rules.push(...profile.rules);
    }
    return rules;
  }

  getTargetType(definition: ApplicationProfileOrApName, type: Many<string>, propertyKey: string): string[] {
    const rangeRule = this.getRangeRule(definition, type, propertyKey);
    if (isDataTypeRule(rangeRule.value) || isClassIdRule(rangeRule.value)) {
      return [rangeRule.value.value];
    } else if (isOrClassIdRule(rangeRule.value)) {
      return rangeRule.value.value.map(r => r.value);
    } else if (isOrDataTypeRule(rangeRule.value)) {
      return rangeRule.value.value.map(r => r.value);
    }

    throw new Error(`Could not find target type for type ${type} and property ${propertyKey}`);
  }

  getProperties(definition: ApplicationProfileOrApName, type: Many<string>): string[] {
    const ap = this.getAp(definition);
    const typeProfile = this.getTypeProfile(ap, type);
    return Object.keys(typeProfile.attributes);
  }

  getConcreteType(ap: ApplicationProfileOrApName, classIds: Many<string>): string {
    ap = this.getAp(ap);
    return getConcreteType(ap, classIds);
  }

  private getAp(ap: ApplicationProfileOrApName): ApplicationProfile {
    return typeof ap === 'string' ? this.apService.getAp(ap) : ap;
  }
}
