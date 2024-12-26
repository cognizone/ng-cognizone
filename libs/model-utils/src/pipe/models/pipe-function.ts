/**
 * Type representing a function that takes a value and optional additional arguments
 * and returns a new value of potentially different type
 */
export type PipeFunction<TInput, TOutput, TArgs extends unknown[] = []> = (value: TInput, ...args: TArgs) => TOutput;
