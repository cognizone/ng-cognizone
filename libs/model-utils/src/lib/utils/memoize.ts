/* eslint-disable */
/**
 * Memoization cache interface
 */
interface MemoCache {
  [key: string]: any;
}

export const memoizeCacheKey = Symbol('memoizeCacheKey');
export const memoizeClearCacheKey = Symbol('memoizeClearCacheKey');

/**
 * Interface for instances with memoization
 */
interface MemoizedInstance {
  [memoizeCacheKey]?: { [methodName: string]: MemoCache };
  [memoizeClearCacheKey]?: (methodName?: string) => void;
}

/**
 * Memoize function that caches results based on function arguments
 * @param fn - The function to memoize
 * @returns A memoized version of the function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T & { cache: MemoCache; clearCache: () => void } {
  const cache: MemoCache = {};

  const memoized = ((...args: any[]) => {
    // Create a cache key from the function arguments
    const key = JSON.stringify(args);

    // Check if result is already cached
    if (key in cache) {
      return cache[key];
    }

    // Execute function and cache result
    const result = fn(...args);
    cache[key] = result;

    return result;
  }) as T & { cache: MemoCache; clearCache: () => void };

  // Attach cache and clearCache method to the memoized function
  memoized.cache = cache;
  memoized.clearCache = () => {
    Object.keys(cache).forEach(key => delete cache[key]);
  };

  return memoized;
}

/**
 * Memoization decorator for class methods
 * @param target - The prototype of the class
 * @param propertyKey - The name of the method
 * @param descriptor - The PropertyDescriptor
 */
// eslint-disable-next-line
export function Memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const RECURSION_PLACEHOLDER = Symbol('recursion');

  function memoizedMethod(this: MemoizedInstance, ...args: any[]) {
    this[memoizeCacheKey] ??= {};

    if (!this[memoizeCacheKey]?.[propertyKey]) {
      this[memoizeCacheKey][propertyKey] = {};
    }
    const cache = this[memoizeCacheKey]![propertyKey];
    const key = JSON.stringify(args);
    if (key in cache) {
      if (cache[key] === RECURSION_PLACEHOLDER) {
        throw new Error('Circular reference detected in memoized method');
      }
      return cache[key];
    }
    // Set placeholder before calling the original method to handle recursion
    cache[key] = RECURSION_PLACEHOLDER;
    const result = originalMethod.apply(this, args);
    cache[key] = result;
    return result;
  }

  descriptor.value = memoizedMethod;

  if (!target[memoizeClearCacheKey]) {
    target[memoizeClearCacheKey] = function (this: MemoizedInstance, methodName?: string) {
      if (!this[memoizeCacheKey]) {
        return;
      }
      if (methodName) {
        const methodCache = this[memoizeCacheKey]![methodName];
        if (methodCache) {
          Object.keys(methodCache).forEach(key => {
            delete methodCache[key];
          });
        }
      } else {
        Object.keys(this[memoizeCacheKey]!).forEach(method => {
          const methodCache = this[memoizeCacheKey]![method];
          if (methodCache) {
            Object.keys(methodCache).forEach(key => {
              delete methodCache[key];
            });
          }
        });
      }
    };
  }

  return descriptor;
}

/**
 * Clear memoization cache for a specific method or all methods
 * @param target - The class instance
 * @param methodName - Optional method name to clear cache for
 */
export function clearMemoCache(target: any, methodName?: string): void {
  if (target[memoizeClearCacheKey]) {
    target[memoizeClearCacheKey](methodName);
  }
}
