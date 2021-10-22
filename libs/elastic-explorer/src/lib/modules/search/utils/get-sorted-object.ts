export function getSortedObject<T extends {}>(obj: T): T {
  const newObj = {} as T;
  (Object.keys(obj) as (keyof T)[]).sort().forEach(key => {
    newObj[key] = obj[key];
  });
  return newObj;
}
