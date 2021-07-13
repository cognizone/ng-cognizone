/**
 * Describes a function to be used as argument for `Array<T>::sort`
 */
export type Sorter<T> = (a: T, b: T) => number;
