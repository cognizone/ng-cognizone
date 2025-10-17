# Result Type

A type-safe, functional approach to error handling in TypeScript that forces consumers to explicitly handle both success and error cases.

## Table of Contents

- [Overview](#overview)
- [Why Use Result?](#why-use-result)
- [Core Concepts](#core-concepts)
- [API Reference](#api-reference)
  - [Type Definitions](#type-definitions)
  - [Constructors](#constructors)
  - [Type Guards](#type-guards)
  - [Transformations](#transformations)
  - [Unwrapping](#unwrapping)
  - [Side Effects](#side-effects)
  - [Recovery](#recovery)
  - [Composition](#composition)
- [Usage Examples](#usage-examples)
- [Common Patterns](#common-patterns)
- [RxJS Integration](#rxjs-integration)

## Overview

The `Result` type wraps values that can represent either a successful operation (`Ok`) or a failed operation (`Error`). This pattern encourages explicit error handling and eliminates reliance on try/catch blocks and implicit error propagation.

```typescript
type Result<T, E> = ResultOk<T> | ResultError<E>;
```

## Why Use Result?

1. **Explicit Error Handling**: Forces consumers to acknowledge and handle error cases
2. **Type Safety**: Error types are part of the function signature
3. **Composability**: Chain operations that may fail using functional utilities
4. **No Exceptions**: Avoid try/catch blocks and make control flow more predictable
5. **Self-Documenting**: Function signatures clearly indicate potential failures

## Core Concepts

### ResultOk

Represents a successful operation with a content value:

```typescript
type ResultOk<T> = {
  type: 'ok';
  content: T;
};
```

### ResultError

Represents a failed operation with an error value:

```typescript
type ResultError<E> = {
  type: 'error';
  error: E;
};
```

## API Reference

### Type Definitions

#### `Result<T, E>`

Main union type representing either success or failure.

- `T`: Type of the success value
- `E`: Type of the error value (defaults to `unknown`)

#### `Mapper<T, U>`

Function type for transforming values:

```typescript
type Mapper<T, U> = (o: T) => U;
```

### Constructors

#### `ok<T>(content: T): ResultOk<T>`

Creates a successful result.

```typescript
import { ok } from './utils';

const result = ok(42);
// { type: 'ok', content: 42 }

const user = ok({ id: 1, name: 'John' });
// { type: 'ok', content: { id: 1, name: 'John' } }
```

#### `error<E>(err: E): ResultError<E>`

Creates an error result.

```typescript
import { error } from './utils';

const result = error('Something went wrong');
// { type: 'error', error: 'Something went wrong' }

const httpError = error({ status: 404, message: 'Not Found' });
// { type: 'error', error: { status: 404, message: 'Not Found' } }
```

### Type Guards

#### `isOk<T>(result: Result<T>): result is ResultOk<T>`

Checks if a result is successful.

```typescript
import { isOk, ok, error } from './utils';

const success = ok(42);
const failure = error('oops');

if (isOk(success)) {
  console.log(success.content); // 42 - TypeScript knows this is safe
}

console.log(isOk(success)); // true
console.log(isOk(failure)); // false
```

#### `isOkP<T>(): (result: Result<T>) => boolean`

Point-free version for use in higher-order functions.

```typescript
import { isOkP } from './utils';

const results = [ok(1), error('fail'), ok(2)];
const successes = results.filter(isOkP());
```

#### `isError<E>(result: Result<unknown, E>): result is ResultError<E>`

Checks if a result is an error.

```typescript
import { isError, ok, error } from './utils';

const failure = error('Something went wrong');

if (isError(failure)) {
  console.log(failure.error); // 'Something went wrong'
}
```

#### `isErrorP<E>(): (result: Result<unknown, E>) => boolean`

Point-free version for filtering errors.

```typescript
import { isErrorP } from './utils';

const results = [ok(1), error('fail'), ok(2)];
const failures = results.filter(isErrorP());
```

### Transformations

#### `mapOk<T1, T2, E>(result: Result<T1, E>, mapper: Mapper<T1, T2>): Result<T2, E>`

Transforms the content of an `Ok` result, leaving `Error` results unchanged.

```typescript
import { mapOk, ok, error } from './utils';

const num = ok(5);
const doubled = mapOk(num, x => x * 2);
// { type: 'ok', content: 10 }

const err = error('failed');
const attempted = mapOk(err, x => x * 2);
// { type: 'error', error: 'failed' } - unchanged
```

#### `mapOkP<T1, T2, E>(mapper: Mapper<T1, T2>): (result: Result<T1, E>) => Result<T2, E>`

Point-free version for composition.

```typescript
import { mapOkP } from './utils';

const double = mapOkP((x: number) => x * 2);
const result = double(ok(5)); // { type: 'ok', content: 10 }
```

#### `mapError<T, E1, E2>(result: Result<T, E1>, mapper: Mapper<E1, E2>): Result<T, E2>`

Transforms the error of an `Error` result, leaving `Ok` results unchanged.

```typescript
import { mapError, error, ok } from './utils';

const err = error('not found');
const httpError = mapError(err, msg => ({ status: 404, message: msg }));
// { type: 'error', error: { status: 404, message: 'not found' } }

const success = ok(42);
const unchanged = mapError(success, msg => msg.toUpperCase());
// { type: 'ok', content: 42 } - unchanged
```

#### `mapErrorP<T, E1, E2>(mapper: Mapper<E1, E2>): (result: Result<T, E1>) => Result<T, E2>`

Point-free version for composition.

```typescript
import { mapErrorP } from './utils';

const toHttpError = mapErrorP((msg: string) => ({ status: 500, message: msg }));
```

### Unwrapping

#### `unwrap<T>(result: Result<T>, defaultValue: T): T`

Extracts the content or returns a default value.

```typescript
import { unwrap, ok, error } from './utils';

const value1 = unwrap(ok(42), 0);
// 42

const value2 = unwrap(error('failed'), 0);
// 0
```

#### `unwrapP<T>(defaultValue: T): (result: Result<T>) => T`

Point-free version.

```typescript
import { unwrapP } from './utils';

const getOrZero = unwrapP(0);
const value = getOrZero(ok(42)); // 42
```

#### `lazyUnwrap<T, E>(result: Result<T, E>, defaultValue: () => T): T`

Like `unwrap`, but with a lazy default value (computed only if needed).

```typescript
import { lazyUnwrap, ok, error } from './utils';

const value1 = lazyUnwrap(ok(42), () => {
  console.log('Computing default...'); // Not called
  return 0;
});
// 42

const value2 = lazyUnwrap(error('failed'), () => {
  console.log('Computing default...'); // Called
  return 0;
});
// 0
```

#### `lazyUnwrapP<T, E>(defaultValue: () => T): (result: Result<T, E>) => T`

Point-free version with lazy default.

#### `unwrapBoth<T>(result: Result<T, T>): T`

Unwraps a result where both success and error have the same type.

```typescript
import { unwrapBoth, ok, error } from './utils';

const value1 = unwrapBoth(ok('success'));
// 'success'

const value2 = unwrapBoth(error('failure'));
// 'failure'
```

#### `unwrapBothP<T>(): (result: Result<T, T>) => T`

Point-free version.

### Side Effects

#### `on<T, E>(result: Result<T, E>, onResult: OnResult<T, E>): void`

Execute side effects based on the result type.

```typescript
import { on, ok, error } from './utils';

on(ok(42), {
  ok: value => console.log('Success:', value),
  error: err => console.error('Error:', err),
});
// Logs: "Success: 42"

on(error('failed'), {
  ok: value => console.log('Success:', value),
  error: err => console.error('Error:', err),
});
// Logs: "Error: failed"
```

**Interface:**

```typescript
interface OnResult<T, E> {
  ok?: (content: T) => void;
  error?: (err: E) => void;
}
```

#### `onP<T, E>(onResult: OnResult<T, E>): (result: Result<T, E>) => void`

Point-free version.

```typescript
import { onP } from './utils';

const logResult = onP({
  ok: value => console.log('Success:', value),
  error: err => console.error('Error:', err),
});

logResult(ok(42));
```

### Recovery

#### `or<T>(result: Result<T>, orValue: Result<T>): Result<T>`

Returns the first result if it's `Ok`, otherwise returns the alternative.

```typescript
import { or, ok, error } from './utils';

const value1 = or(ok(42), ok(0));
// { type: 'ok', content: 42 }

const value2 = or(error('failed'), ok(0));
// { type: 'ok', content: 0 }
```

#### `orP<T>(orValue: Result<T>): (result: Result<T>) => Result<T>`

Point-free version.

#### `lazyOr<T>(result: Result<T>, orValue: () => Result<T>): Result<T>`

Like `or`, but with a lazy alternative (computed only if needed).

```typescript
import { lazyOr, ok, error } from './utils';

const value = lazyOr(error('failed'), () => {
  console.log('Computing alternative...'); // Called only if needed
  return ok(0);
});
```

#### `lazyOrP<T>(orValue: () => Result<T>): (result: Result<T>) => Result<T>`

Point-free version with lazy alternative.

#### `tryRecover<T, E1, E2>(result: Result<T, E1>, recover: (err: E1) => Result<T, E2>): Result<T, E2>`

Attempt to recover from an error by providing a recovery function.

```typescript
import { tryRecover, error, ok } from './utils';

const result = error(404);
const recovered = tryRecover(result, code => {
  if (code === 404) {
    return ok('Using cached data');
  }
  return error(`Unrecoverable error: ${code}`);
});
// { type: 'ok', content: 'Using cached data' }
```

#### `tryRecoverP<T, E1, E2>(recover: (err: E1) => Result<T, E2>): (result: Result<T, E1>) => Result<T, E2>`

Point-free version.

```typescript
import { tryRecoverP } from './utils';

const recoverFromNotFound = tryRecoverP((code: number) => (code === 404 ? ok('default') : error('fatal')));
```

### Composition

#### `toOk<T, E>(result: Result<T, E>): ResultOk<T | E>`

Converts any result to an `Ok` result, wrapping errors in the content.

```typescript
import { toOk, ok, error } from './utils';

const success = toOk(ok(42));
// { type: 'ok', content: 42 }

const fromError = toOk(error('failed'));
// { type: 'ok', content: 'failed' }
```

#### `toError<T, E>(result: Result<T, E>): ResultError<T | E>`

Converts any result to an `Error` result, wrapping success values in the error.

```typescript
import { toError, ok, error } from './utils';

const fromSuccess = toError(ok(42));
// { type: 'error', error: 42 }

const failure = toError(error('failed'));
// { type: 'error', error: 'failed' }
```

## Usage Examples

### Basic Error Handling

```typescript
import { Result, ok, error, isOk } from './result';

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return error('Division by zero');
  }
  return ok(a / b);
}

const result = divide(10, 2);
if (isOk(result)) {
  console.log('Result:', result.content); // 5
} else {
  console.error('Error:', result.error);
}
```

### Chaining Operations

```typescript
import { Result, ok, error, mapOk, mapError } from './result';

interface User {
  id: number;
  name: string;
}

function fetchUser(id: number): Result<User, string> {
  // Simulate API call
  if (id === 1) {
    return ok({ id: 1, name: 'John' });
  }
  return error('User not found');
}

// Transform the user name to uppercase
const result = fetchUser(1);
const upperCaseUser = mapOk(result, user => ({
  ...user,
  name: user.name.toUpperCase(),
}));

// Transform error messages
const withFormattedError = mapError(upperCaseUser, err => `Error: ${err}`);
```

### Functional Pipeline

```typescript
import { ok, mapOk, unwrap } from './result';

const result = ok(5);
const finalValue = [result]
  .map(mapOkP((x: number) => x * 2))
  .map(mapOkP((x: number) => x + 10))
  .map(unwrapP(0))[0];
// 20
```

### Error Recovery

```typescript
import { Result, error, ok, tryRecover } from './result';

interface CacheError {
  type: 'cache-miss' | 'cache-error';
  message: string;
}

function getCached(key: string): Result<string, CacheError> {
  return error({ type: 'cache-miss', message: 'Not in cache' });
}

function fetchFromAPI(key: string): Result<string, string> {
  return ok('Fresh data from API');
}

const result = tryRecover(getCached('user:1'), err => {
  if (err.type === 'cache-miss') {
    return fetchFromAPI('user:1');
  }
  return error('Fatal error');
});
```

## Common Patterns

### HTTP Response Handling

```typescript
import { Result, ok, error, mapOk } from './result';

interface HttpError {
  status: number;
  message: string;
}

async function fetchData<T>(url: string): Promise<Result<T, HttpError>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return error({
        status: response.status,
        message: response.statusText,
      });
    }
    const data = await response.json();
    return ok(data);
  } catch (err) {
    return error({
      status: 0,
      message: err instanceof Error ? err.message : 'Unknown error',
    });
  }
}
```

### Form Validation

```typescript
import { Result, ok, error, mapError } from './result';

interface ValidationError {
  field: string;
  message: string;
}

function validateEmail(email: string): Result<string, ValidationError> {
  if (!email.includes('@')) {
    return error({
      field: 'email',
      message: 'Invalid email format',
    });
  }
  return ok(email);
}

function validateAge(age: number): Result<number, ValidationError> {
  if (age < 18) {
    return error({
      field: 'age',
      message: 'Must be 18 or older',
    });
  }
  return ok(age);
}
```

### Parsing with Fallbacks

```typescript
import { ok, error, unwrap, lazyUnwrap } from './result';

function parseJSON<T>(json: string): Result<T, string> {
  try {
    return ok(JSON.parse(json));
  } catch (err) {
    return error('Invalid JSON');
  }
}

// With static default
const config1 = unwrap(parseJSON('invalid'), { default: true });

// With computed default
const config2 = lazyUnwrap(parseJSON('invalid'), () => {
  console.log('Using default config');
  return { default: true };
});
```

## RxJS Integration

The Result type works seamlessly with RxJS observables:

```typescript
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Result, ok, error, mapOkP, isOk } from './result';

function fetchUserData(id: number): Observable<Result<User, string>> {
  return ajax.getJSON(`/api/users/${id}`).pipe(
    map(user => ok(user as User)),
    catchError(err => of(error(err.message)))
  );
}

// Transform successful results
fetchUserData(1)
  .pipe(map(mapOkP(user => user.name)))
  .subscribe(result => {
    if (isOk(result)) {
      console.log('User name:', result.content);
    } else {
      console.error('Error:', result.error);
    }
  });

// Filter only successful results
fetchUserData(1)
  .pipe(
    filter(isOk),
    map(result => result.content)
  )
  .subscribe(user => {
    console.log('User:', user);
  });
```

## Best Practices

1. **Always use type parameters**: Specify both success and error types for clarity

   ```typescript
   // Good
   function fetchUser(id: number): Result<User, HttpError>;

   // Avoid
   function fetchUser(id: number): Result<User>;
   ```

2. **Use point-free style for pipelines**: Leverage the `*P` versions for cleaner composition

   ```typescript
   const pipeline = [mapOkP((x: number) => x * 2), mapOkP((x: number) => x + 1), unwrapP(0)];
   ```

3. **Prefer lazy versions for expensive defaults**: Use `lazyUnwrap` and `lazyOr` when defaults are costly

   ```typescript
   lazyUnwrap(result, () => expensiveComputation());
   ```

4. **Use `on` for side effects only**: Keep `on` for logging, notifications, etc., not for transformations. You would typically use `onP` in a subscribe.

   ```typescript
   on(result, {
     ok: value => logger.info('Success', value),
     error: err => logger.error('Failure', err),
   });
   ```

## Advantages Over Exceptions

- **Predictable**: No hidden control flow
- **Composable**: Easy to chain and combine operations
- **Type-safe**: Error types are part of the signature
- **Explicit**: Forces acknowledgment of error cases
- **Testable**: Easier to test error paths
- **Functional**: Works well with functional programming patterns

## Migration from try/catch

**Before:**

```typescript
function processData(data: string): User {
  try {
    const json = JSON.parse(data);
    return transformUser(json);
  } catch (error) {
    throw new Error('Failed to process data');
  }
}
```

**After:**

```typescript
function processData(data: string): Result<User, string> {
  const parsed = parseJSON(data);
  return mapOk(parsed, json => transformUser(json));
}
```
