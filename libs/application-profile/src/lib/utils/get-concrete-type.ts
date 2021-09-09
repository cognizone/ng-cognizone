import { Many, manyToArray, notNil } from '@cognizone/model-utils';

import { ApplicationProfile } from '../models/application-profile';
import { isRdfTypesRule, isSubClassOfRule } from '../models/rule';

export function getConcreteType(ap: ApplicationProfile, classIds: Many<string>): string {
  const classIdsList = manyToArray(classIds);
  if (classIdsList.length === 0) {
    throw new Error('Failed to find most concrete type in empty list');
  }
  if (classIdsList.length === 1) return classIdsList[0];
  const hasSubClassOfRule = classIdsList
    .map(classId => {
      const typeProfile = ap.types[classId];
      if (!typeProfile) {
        console.warn(`Failed to find class '${classId}' in AP while searching for concrete type in [${classIdsList.join(', ')}], skipping`);
        return undefined;
      }
      return typeProfile;
    })
    .filter(notNil)
    .some(typeProfile => typeProfile.rules.some(isSubClassOfRule));

  if (hasSubClassOfRule) {
    return getConcreteTypeFromSubClassOfRules(ap, classIdsList);
  }
  return getConcreteTypeFromRdfTypesRule(ap, classIdsList);
}

export function getConcreteTypeFromRdfTypesRule(ap: ApplicationProfile, classIds: string[]): string {
  return classIds.find(classId => {
    const typeProfile = ap.types[classId];
    if (!typeProfile) {
      console.warn(`Failed to find class '${classId}' in AP while searching for concrete type in [${classIds.join(', ')}], skipping`);
      return false;
    }
    const rdfTypesRule = typeProfile.rules.find(isRdfTypesRule);
    if (!rdfTypesRule) {
      console.warn(`Failed to find rule of type 'rdfTypes' for classId '${classId}', skipping`);
      return false;
    }
    const types = rdfTypesRule.value.map(fullLengthType => fullLengthType.split(/[#/]/).pop());
    // because sometimes we have jolux:Collection in node types
    return classIds.map(type => type.split(':').pop() as string).every(type => types.includes(type));
  }) as string;
}

export function getConcreteTypeFromSubClassOfRules(ap: ApplicationProfile, classIds: string[]): string {
  let possibilities = [...classIds];
  classIds.forEach(classId => {
    const typeProfile = ap.types[classId];
    if (!typeProfile) {
      console.warn(`Failed to find class '${classId}' in AP while searching for concrete type in [${classIds.join(', ')}], skipping`);
      return false;
    }
    const subClassOfRule = typeProfile.rules.find(isSubClassOfRule);
    if (!subClassOfRule) return;
    const parent = subClassOfRule.value;
    possibilities = possibilities.filter(p => p !== parent);
  });

  return possibilities[0];
}
