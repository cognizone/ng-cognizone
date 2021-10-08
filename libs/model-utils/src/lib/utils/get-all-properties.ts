/**
 * get all properties of the given object, and goes up the prototype chain. This
 * is mostly useful for debugging purposes and javascript digging.
 */
export function getAllProperties(obj: {}): string[] {
  const allProps: Set<string> = new Set();
  for (let curr = obj; curr != null; curr = Object.getPrototypeOf(curr)) {
    const props = Object.getOwnPropertyNames(curr);
    props.forEach(prop => allProps.add(prop));
  }
  return Array.from(allProps).sort();
}
