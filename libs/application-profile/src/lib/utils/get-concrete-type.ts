import { Many, manyToArray, notNil } from '@cognizone/model-utils';

import { ApplicationProfile } from '../models/application-profile';
import { isRdfTypesRule, isSubClassOfRule } from '../models/rule';

/**
 * Extract from `classIds` the id id of the class that is the "most concrete".
 * By most concrete, we mean that the set of classes that are given are all
 * related to one another by inheritance, and we want to find the furthest down
 * in the inheritance chain. So if we have a case were `A` is the
 * parent of `B` and `B` is the parent of `C`, then the most concrete class of
 * `['B', 'A', 'C']` will be `C`.
 *
 * Depending on the information available in the Ap, this function will
 * internally use either {@link getConcreteTypeFromRdfTypesRule} or {@link getConcreteTypeFromSubClassOfRules},
 * where the later is the safest.
 *
 * @param ap the Ap in which were are searching for the different classes definitions
 * @param classIds the set of class ids from which we need to extract the most concrete type
 * @returns the classId of the most concrete type.
 */
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

/**
 *
 * @param ap the Ap in which we are searching for the most concrete type
 * @param classIds
 * @returns
 */
export function getConcreteTypeFromSubClassOfRules(ap: ApplicationProfile, classIds: string[]): string {
  let possibilities = [...classIds];
  classIds.forEach(classId => {
    const typeProfile = ap.types[classId];
    if (!typeProfile) {
      console.warn(`Failed to find class '${classId}' in AP while searching for concrete type in [${classIds.join(', ')}], skipping`);
      return;
    }
    const subClassOfRule = typeProfile.rules.find(isSubClassOfRule);
    if (!subClassOfRule) return;
    const parent = subClassOfRule.value;
    possibilities = possibilities.filter(p => p !== parent);
  });

  return possibilities[0];
}
