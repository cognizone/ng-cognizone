/**
 * @description Represents a remote data and its related state
 */
export type AsyncResult<T = unknown, E = unknown> = ResultSuccess<T> | ResultError<E> | ResultLoading | ResultNotAsked;
export type Result<T = unknown, E = unknown> = ResultSuccess<T> | ResultError<E>;

/**
 * @description the resource has not been requested yet
 */
export type ResultNotAsked = {
  type: 'notAsked';
};

// always the same, no need to re-create it every time
const _notAsked = { type: 'notAsked' as const };
export function notAsked(): ResultNotAsked {
  return _notAsked;
}

/**
 * @description the resource has been successfully retrieved and is stored in `content`
 */
export type ResultSuccess<T> = {
  type: 'success';
  content: T;
};

export function success<T>(content: T): ResultSuccess<T> {
  return { type: 'success', content };
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

/**
 * @description the query to fetch the resource has been started but the response did not arrive yet
 */
export type ResultLoading = {
  type: 'loading';
};

// always the same, no need to re-create it every time
const _loading = { type: 'loading' as const };
export function loading(): ResultLoading {
  return _loading;
}
