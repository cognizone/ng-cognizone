/**
 * Checking that the argument is not {@link Nil}, so basically `o != null`. Its
 * main usage is to be used in array filtering or rxjs stream filtering, like:
 * ```typescript
 * const myStringArray = ['a', undefined, null, 'b'].filter(notNil); // ['a', 'b']
 * from(['a', undefined, null, 'b']).pipe(filter(notNil)).subscribe(console.log); // logs: 'a' and 'b'
 * ```
 */
export function notNil<T>(o: T): o is Exclude<T, null | undefined> {
  return o != null;
}
