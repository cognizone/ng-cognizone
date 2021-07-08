/**
 * Shorthand type for type being either itself, null or undefined
 */
export type Nil<T> = T | undefined | null;

/**
 * Checking that the argument is not {@link Nil}, so basically `o != null`. Its main usage is to be used in array filtering or rxjs stream filtering. For example
 * `const myStringArray = ['a', undefined, null, 'b'].filter(notNil);`
 */
export function notNil<T>(o: T): o is Exclude<T, null | undefined> {
  return o != null;
}
