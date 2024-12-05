/**
 * @description Wraps a value in an ok if the related operations went well, otherwise wrap the result in an error.
 * The idea is to force consumers for `Result` to handle error cases, and not be dependant on try/catch behaviors
 */
export type Result<T = unknown, E = unknown> = ResultOk<T> | ResultError<E>;

/**
 * @description the resource has been successfully retrieved and is stored in `content`
 */
export type ResultOk<T> = {
  type: 'ok';
  content: T;
};

export function ok<T>(content: T): ResultOk<T> {
  return { type: 'ok', content };
}

/**
 * @description fetching the resource had resulted in error, which is stored in `error`
 */
export type ResultError<E> = {
  type: 'error';
  error: E;
};

export function error<T>(err: T): ResultError<T> {
  return { type: 'error', error: err };
}
