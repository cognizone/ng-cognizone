import { Rule } from './rule';

/**
 * Represents an ApplicationProfile (Ap for short) as it is used in our libraries.
 * An Ap describes the data model of one or multiple types of graphs. For more
 * information about this, please take a look at [this doc](https://www.notion.so/cognizone/Application-profile-1b42b93912814062b20371ccd53a9d47).
 *
 * @example
 * ```json
 * {
 *   "uri": "http://my-domain/my-ap",
 *   "types": {
 *     "Animal": {...},
 *     "Cat": {...},
 *     "Dog": {...}
 *   }
 * }
 * ```
 */
export interface ApplicationProfile {
  /**
   * uri of the Ap
   */
  uri: string;
  /**
   * Map of TypeProfile that constitutes the Ap
   */
  types: { [classId: string]: TypeProfile };
}

/**
 * Describes the data model a node of this particular type need to follow to be
 * considered valid.
 */
export interface TypeProfile {
  /**
   * Set of rules a node of this class need to follow.
   */
  rules: Rule[];
  /**
   * Set of ids of this class. In practice, this is usually a `[string]`
   * (so only ever of size 1).
   */
  classIds: string[];
  /**
   * Map of {@link AttributeProfile} that describes the attributes of this
   * particular class.
   */
  attributes: { [attributeId: string]: AttributeProfile };
}

/**
 * Describes an attribute of a particular class, and the constraints it needs to
 * follow.
 */
export interface AttributeProfile {
  /**
   * uri of this particular attribute
   */
  uri: string;
  /**
   * set of rules the attribute follows and that describe its model.
   */
  rules: Rule[];
  /**
   * In the context of a particular class, this is the unique id of that attribute.
   */
  attributeId: string;
}

/**
 * @hidden
 */
export const EMPTY_APPLICATION_PROFILE: ApplicationProfile = {
  uri: 'this is an empty Ap',
  types: {},
};

/**
 * Since Aps are usually loaded on application boot, we usually store them in the
 * state and refer to them by their unique name. With that in mind, most services
 * we created that deals with Aps can receive as parameter either the Ap itself
 * or a reference to it, which is its name.
 */
export type ApplicationProfileOrApName = ApplicationProfile | string;
