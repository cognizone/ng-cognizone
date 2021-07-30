export type Rule<T extends string = string, U = unknown> = { name: T; value: U };
export type OrRule<T extends Rule> = Rule<'or', T[]>;
export type DataTypeRule = Rule<'datatype', string>;
export type ClassIdRule = Rule<'classId', string>;
export type SubClassOfRule = Rule<'subClassOf', string>;
export type OrClassIdRule = OrRule<ClassIdRule>;
export type OrDataTypeRule = OrRule<DataTypeRule>;
export type RangeRule = Rule<'range', ClassIdRule | DataTypeRule | OrClassIdRule | OrDataTypeRule>;
export type MinCardinalityRule = Rule<'minCardinality', number>;
export type MaxCardinalityRule = Rule<'maxCardinality', number>;
export type RdfTypesRule = Rule<'rdfTypes', string[]>;

export function isRule(o: unknown): o is Rule {
  if (o == null) return false;
  return typeof o === 'object' && o != null && 'name' in o && 'value' in o;
}

export function isOrRule(o: unknown): o is OrRule<Rule> {
  return isRule(o) && o.name === 'or';
}

export function isClassIdRule(o: unknown): o is ClassIdRule {
  return isRule(o) && o.name === 'classId';
}

export function isOrClassIdRule(o: unknown): o is OrClassIdRule {
  return isOrRule(o) && isClassIdRule(o.value[0]);
}

export function isOrDataTypeRule(o: unknown): o is OrClassIdRule {
  return isOrRule(o) && isDataTypeRule(o.value[0]);
}

export function isMaxCardinalityRule(o: unknown): o is MaxCardinalityRule {
  return isRule(o) && o.name === 'maxCardinality';
}

export function isMinCardinalityRule(o: unknown): o is MinCardinalityRule {
  return isRule(o) && o.name === 'minCardinality';
}

export function isDataTypeRule(o: unknown): o is DataTypeRule {
  return isRule(o) && o.name === 'datatype';
}

export function isRangeRule(o: unknown): o is RangeRule {
  return isRule(o) && o.name === 'range';
}

export function isRdfTypesRule(o: unknown): o is RdfTypesRule {
  return isRule(o) && o.name === 'rdfTypes';
}

export function isSubClassOfRule(o: unknown): o is SubClassOfRule {
  return isRule(o) && o.name === 'subClassOf';
}
