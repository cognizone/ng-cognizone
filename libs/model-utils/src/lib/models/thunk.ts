export type Thunk<T, U extends unknown[] = never[]> = T | ((...args: U) => T);
