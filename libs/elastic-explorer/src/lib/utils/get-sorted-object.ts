export function getSortedObject<T extends {}>(obj: T): T {
  const newObj = {} as T;
  Object.keys(obj)
    .sort()
    .forEach(key => {
      newObj[key] = obj[key];
    });
  return newObj;
}
