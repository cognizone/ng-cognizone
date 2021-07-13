import { Injectable } from '@angular/core';
import {
  ApplicationProfile,
  AttributeProfile,
  DatatypeLong,
  getConcreteType,
  isClassIdRule,
  isDataTypeRule,
  isMaxCardinalityRule,
  isMinCardinalityRule,
  isOrClassIdRule,
  isRangeRule,
  RangeRule,
  Rule,
  TypeProfile
} from '@cognizone/application-profile';
import { Many, manyToArray } from '@cognizone/model-utils';
import { Logger } from '@cognizone/ng-core';
import { memoize } from 'lodash-es';

@Injectable()
export class ApHelper {
  private apMap: WeakMap<ApplicationProfile, number> = new WeakMap();
  private weakMapCount: number = 0;

  constructor(private logger: Logger) {
    this.logger = logger.extend('ApHelper');
    this.getConcreteType = memoize(this.getConcreteType.bind(this), (ap: ApplicationProfile, classIds: Many<string>) => {
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
      const message = `Could not find most concrete type among given classes ${classIds} in given AP`;
      this.logger.error(message, { ap, classIds });
      throw new Error(message);
    }
    const typeProfile = ap.types[type];
    if (!typeProfile) {
      throw new Error(`Could not find class of type "${type}" in given AP`);
    }
    return typeProfile;
  }

  hasAttribute(profile: TypeProfile, key: string): boolean {
    return profile.attributes[key] != null;
  }

  getRangeRule(profile: TypeProfile, key: string): RangeRule {
    const attr = profile.attributes[key];
    if (attr == null) throw new Error(`Could not find attribute '${key}' for type '${profile.classIds}'`);
    const rangeRule = attr.rules.find(isRangeRule);
    if (rangeRule == null) throw new Error(`Attribute '${key}' for type '${profile.classIds}' does not have a 'range' rule`);
    return rangeRule;
  }

  isAttribute(profile: TypeProfile, key: string): boolean {
    if (!this.hasAttribute(profile, key)) return false;
    const rangeRule = this.getRangeRule(profile, key);
    return isDataTypeRule(rangeRule.value);
  }

  isReference(profile: TypeProfile, key: string): boolean {
    if (!this.hasAttribute(profile, key)) return false;
    const rangeRule = this.getRangeRule(profile, key);
    return isClassIdRule(rangeRule.value) || isOrClassIdRule(rangeRule.value);
  }

  isSingle(profile: TypeProfile, attributeKey: string): boolean {
    const attr = profile.attributes[attributeKey];
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

  isRequiredAttribute(attr: AttributeProfile): boolean {
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
      const rangeRule = this.getRangeRule(profile, key);
      if (isClassIdRule(rangeRule.value)) {
        rules.push(...this.getRules(ap, rangeRule.value.value));
      } else if (isOrClassIdRule(rangeRule.value)) {
        const subRules = rangeRule.value.value
          .map(classIdRule => this.getRules(ap, classIdRule.value))
          .reduce((acc, current) => [...acc, ...current], [] as Rule[]);
        rules.push(...subRules);
      }
    } else {
      rules.push(...profile.rules);
    }
    return rules;
  }

  getConcreteType(ap: ApplicationProfile, classIds: Many<string>): string {
    return getConcreteType(ap, classIds);
  }
}
