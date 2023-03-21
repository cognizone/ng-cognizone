import { Many } from '@cognizone/model-utils';

/**
 * Application Profile as they are stored in src to be consumed by BE code. This
 * format is never seen by FE code, so better to look at {@link ApplicationProfile}
 * instead.
 */
export interface ApplicationProfileRaw {
  /**
   * For each class existing in the defined ontology, there is an associated
   * {@link TypeProfileRaw} that describes that class and its constraints.
   *
   * It is to be noted that `| string` is here only so that `uri: string` can be put
   * on this interface.
   */
  [classId: string]: TypeProfileRaw | string;

  /**
   * uri of that particular AP
   */
  uri: string;
}

/**
 * Describes a class in the context of an {@link ApplicationProfileRaw}
 */
export interface TypeProfileRaw {
  /**
   * Map of {@link AttributeProfileRaw} where each attributes of the given class
   * are described
   */
  [attributeKey: string]: AttributeProfileRaw | Record<string, Many<string>>;

  /**
   * Set of rules that entities of this class need to follow to be valid
   */
  constraints: Record<string, Many<string>>;
}

export interface AttributeProfileRaw {
  /**
   * Map of reules and their properties, used to validate if this attribute is
   * valid and to, in general, describe its model.
   */
  [ruleId: string]: Record<string, unknown> | string;

  /**
   * uri of the attribute.
   */
  uri: string;
}
