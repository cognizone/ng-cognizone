export function keys<T extends {}>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function stringKeys<T extends {}>(obj: T): StringKeys<T>[] {
  return keys(obj).filter(key => typeof key === 'string') as StringKeys<T>[];
}

type StringKeys<T> = Exclude<keyof T, number | symbol>;
