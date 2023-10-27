/* eslint-disable @typescript-eslint/naming-convention */
export type Namespace<KEYS extends string, BASE_URI extends string> = Readonly<BaseNamespace<KEYS, BASE_URI>>;

type BaseNamespace<KEYS extends string, BASE_URI extends string> = {
  [key in KEYS]: `${BASE_URI}${key}`;
};
/**
 * Creates a type safe namespace. Can also be used to create a type safe const enum for concept schemes for example.
 *
 * @example
 * ```ts
 * const xsd = createNamespace('http://www.w3.org/2001/XMLSchema#', ['boolean', 'dateTime', 'string']);
 * console.log(xsd.boolean) // http://www.w3.org/2001/XMLSchema#boolean
 * console.log(xsd.dateTime) // http://www.w3.org/2001/XMLSchema#dateTime
 * console.log(xsd.string) // http://www.w3.org/2001/XMLSchema#string
 * console.log(xsd.number) // typescript error: Argument of type '"number"' is not assignable to parameter of type '"boolean" | "dateTime" | "string"'.
 * ```
 */
export function createNamespace<KEYS extends string, BASE_URI extends string>(
  baseUri: BASE_URI,
  members: KEYS[]
): Namespace<KEYS, BASE_URI> {
  return members.reduce((acc, member) => {
    acc[member] = `${baseUri}${member}`;
    return acc;
  }, {} as BaseNamespace<KEYS, BASE_URI>);
}
