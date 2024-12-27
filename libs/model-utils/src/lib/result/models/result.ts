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

/**
 * @description fetching the resource had resulted in error, which is stored in `error`
 */
export type ResultError<E> = {
  type: 'error';
  error: E;
};
