import { PipeFunction } from '../models';

/**
 * Pipes a value through a series of functions, where each function can take additional arguments.
 * Similar to Gleam's pipe operator, each function is called with the result of the previous function
 * as its first argument, plus any additional arguments specified.
 *
 * @example
 * ```typescript
 * const addOne = (x: number) => x + 1;
 * const multiply = (x: number, factor: number) => x * factor;
 * const toString = (x: number) => x.toString();
 *
 * const result = pipe(
 *   5,
 *   addOne,                  // 6
 *   [multiply, 2],          // 12
 *   toString                // "12"
 * );
 * ```
 *
 * @param initialValue The initial value to pipe through the functions
 * @param operations Array of either functions or tuples of [function, ...args]
 * @returns The result of piping the initial value through all functions
 */
export function pipe<T>(initialValue: T): T;
export function pipe<T, A>(initialValue: T, op1: PipeFunction<T, A>): A;
export function pipe<T, A, B>(initialValue: T, op1: PipeFunction<T, A>, op2: PipeFunction<A, B>): B;
export function pipe<T, A, B, C>(initialValue: T, op1: PipeFunction<T, A>, op2: PipeFunction<A, B>, op3: PipeFunction<B, C>): C;
export function pipe<T, A, B, C, D>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>
): D;
export function pipe<T, A, B, C, D, E>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>
): E;
export function pipe<T, A, B, C, D, E, F>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>
): F;
export function pipe<T, A, B, C, D, E, F, G>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>
): G;
export function pipe<T, A, B, C, D, E, F, G, H>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>,
  op8: PipeFunction<G, H>
): H;
export function pipe<T, A, B, C, D, E, F, G, H, I>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>,
  op8: PipeFunction<G, H>,
  op9: PipeFunction<H, I>
): I;
export function pipe<T, A, B, C, D, E, F, G, H, I, J>(
  initialValue: T,
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>,
  op8: PipeFunction<G, H>,
  op9: PipeFunction<H, I>,
  op10: PipeFunction<I, J>
): J;
export function pipe(initialValue: unknown, ...operations: PipeFunction<unknown, unknown>[]): unknown {
  return operations.reduce((value, operation) => operation(value), initialValue);
}

export function pipeP<T, A>(op1: PipeFunction<T, A>): (initialValue: T) => A;
export function pipeP<T, A, B>(op1: PipeFunction<T, A>, op2: PipeFunction<A, B>): (initialValue: T) => B;
export function pipeP<T, A, B, C>(op1: PipeFunction<T, A>, op2: PipeFunction<A, B>, op3: PipeFunction<B, C>): (initialValue: T) => C;
export function pipeP<T, A, B, C, D>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>
): (initialValue: T) => D;
export function pipeP<T, A, B, C, D, E>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>
): (initialValue: T) => E;
export function pipeP<T, A, B, C, D, E, F>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>
): (initialValue: T) => F;
export function pipeP<T, A, B, C, D, E, F, G>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>
): (initialValue: T) => G;
export function pipeP<T, A, B, C, D, E, F, G, H>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>,
  op8: PipeFunction<G, H>
): (initialValue: T) => H;
export function pipeP<T, A, B, C, D, E, F, G, H, I>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>,
  op8: PipeFunction<G, H>,
  op9: PipeFunction<H, I>
): (initialValue: T) => I;
export function pipeP<T, A, B, C, D, E, F, G, H, I, J>(
  op1: PipeFunction<T, A>,
  op2: PipeFunction<A, B>,
  op3: PipeFunction<B, C>,
  op4: PipeFunction<C, D>,
  op5: PipeFunction<D, E>,
  op6: PipeFunction<E, F>,
  op7: PipeFunction<F, G>,
  op8: PipeFunction<G, H>,
  op9: PipeFunction<H, I>,
  op10: PipeFunction<I, J>
): (initialValue: T) => J;
export function pipeP(...operations: PipeFunction<unknown, unknown>[]): (initialValue: unknown) => unknown {
  return initialValue => operations.reduce((value, operation) => operation(value), initialValue);
}
