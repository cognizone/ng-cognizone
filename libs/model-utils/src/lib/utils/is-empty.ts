/**
 * @description Check if a value is empty. A value is considered empty if it is:
 * - null or undefined
 * - an empty array
 * - a string containing only whitespace
 * - a number that is NaN
 */
export function isEmpty(value: unknown): boolean {
  switch (true) {
    case value == null:
    case Array.isArray(value) && value.length === 0:
    case typeof value === 'string' && value.trim().length === 0:
    case typeof value === 'number' && isNaN(value):
      return true;
    default:
      return false;
  }
}
