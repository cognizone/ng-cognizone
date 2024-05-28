/* eslint-disable @typescript-eslint/naming-convention */
export const NamespaceUri = Symbol('NamespaceUri');

export type Namespace<KEYS extends string, URI extends string> = Readonly<BaseNamespace<KEYS, URI>>;

type BaseNamespace<KEYS extends string, URI extends string> = {
  [key in KEYS | typeof NamespaceUri]: key extends KEYS ? `${URI}${key}` : URI;
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
export function createNamespace<KEYS extends string, URI extends string>(uri: URI, members: KEYS[]): Namespace<KEYS, URI> {
  return members.reduce(
    (acc, member) => {
      acc[member] = `${uri}${member}` as typeof member extends KEYS ? `${URI}${typeof member}` : URI;
      return acc;
    },
    { [NamespaceUri]: uri } as BaseNamespace<KEYS, URI>
  );
}

export function createDynamicNamespace<KEYS extends string, URI extends string>(uri: URI): Namespace<KEYS, URI> {
  const cache: { [key: string | symbol]: string | undefined } = {};
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        if (prop === NamespaceUri) return uri;
        return cache[prop] ?? (cache[prop] = typeof prop === 'string' ? `${uri}${prop}` : undefined);
      },
    }
  ) as BaseNamespace<KEYS, URI>;
}

export function extendNamespace<NEW_KEYS extends string, KEYS extends string, URI extends string>(
  src: Namespace<KEYS, URI>,
  newMembers: NEW_KEYS[]
): Namespace<KEYS | NEW_KEYS, URI> {
  const uri = src[NamespaceUri];
  const members = Object.keys(src) as KEYS[];
  return createNamespace(uri, [...members, ...newMembers]);
}
