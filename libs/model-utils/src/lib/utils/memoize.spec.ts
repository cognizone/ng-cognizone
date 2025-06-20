/* eslint-disable */
import { memoize, Memoize, clearMemoCache } from './memoize';

// Interface to define the memoization methods added by the decorator
interface MemoizedClass {
  clearMemoCache(methodName?: string): void;
  _memoizeCache?: { [key: string]: any };
}

describe('memoize', () => {
  describe('memoize function', () => {
    it('should cache function results', () => {
      let callCount = 0;
      const expensiveFunction = (a: number, b: number) => {
        callCount++;
        return a + b;
      };

      const memoizedFn = memoize(expensiveFunction);

      expect(memoizedFn(1, 2)).toBe(3);
      expect(callCount).toBe(1);

      expect(memoizedFn(1, 2)).toBe(3);
      expect(callCount).toBe(1); // Should not call again
    });

    it('should handle different arguments separately', () => {
      let callCount = 0;
      const expensiveFunction = (a: number, b: number) => {
        callCount++;
        return a * b;
      };

      const memoizedFn = memoize(expensiveFunction);

      expect(memoizedFn(2, 3)).toBe(6);
      expect(memoizedFn(3, 4)).toBe(12);
      expect(callCount).toBe(2);

      expect(memoizedFn(2, 3)).toBe(6);
      expect(memoizedFn(3, 4)).toBe(12);
      expect(callCount).toBe(2); // Should not call again
    });

    it('should handle complex arguments', () => {
      let callCount = 0;
      const complexFunction = (obj: any, arr: any[]) => {
        callCount++;
        return { ...obj, length: arr.length };
      };

      const memoizedFn = memoize(complexFunction);
      const obj = { name: 'test' };
      const arr = [1, 2, 3];

      const result1 = memoizedFn(obj, arr);
      expect(result1).toEqual({ name: 'test', length: 3 });
      expect(callCount).toBe(1);

      const result2 = memoizedFn(obj, arr);
      expect(result2).toEqual({ name: 'test', length: 3 });
      expect(callCount).toBe(1); // Should not call again
    });

    it('should provide cache access', () => {
      const fn = (x: number) => x * 2;
      const memoizedFn = memoize(fn);

      memoizedFn(5);
      expect(memoizedFn.cache).toBeDefined();
      expect(Object.keys(memoizedFn.cache).length).toBe(1);
    });

    it('should allow cache clearing', () => {
      let callCount = 0;
      const fn = (x: number) => {
        callCount++;
        return x * 2;
      };

      const memoizedFn = memoize(fn);

      memoizedFn(5);
      expect(callCount).toBe(1);

      memoizedFn(5);
      expect(callCount).toBe(1); // Cached

      memoizedFn.clearCache();
      memoizedFn(5);
      expect(callCount).toBe(2); // Called again after clearing
    });

    it('should handle functions with no arguments', () => {
      let callCount = 0;
      const fn = () => {
        callCount++;
        return Math.random();
      };

      const memoizedFn = memoize(fn);

      const result1 = memoizedFn();
      const result2 = memoizedFn();

      expect(result1).toBe(result2);
      expect(callCount).toBe(1);
    });

    it('should handle undefined and null arguments', () => {
      let callCount = 0;
      const fn = (a: any, b: any) => {
        callCount++;
        return { a, b };
      };

      const memoizedFn = memoize(fn);

      memoizedFn(undefined, null);
      expect(callCount).toBe(1);

      memoizedFn(undefined, null);
      expect(callCount).toBe(1); // Should be cached
    });
  });

  describe('Memoize decorator', () => {
    class TestCalculator {
      callCount = 0;

      @Memoize
      add(a: number, b: number): number {
        this.callCount++;
        return a + b;
      }

      @Memoize
      multiply(a: number, b: number): number {
        this.callCount++;
        return a * b;
      }

      @Memoize
      fibonacci(n: number): number {
        this.callCount++;
        if (n <= 1) return n;
        return this.fibonacci(n - 1) + this.fibonacci(n - 2);
      }
    }

    it('should cache method results', () => {
      const calc = new TestCalculator();

      expect(calc.add(2, 3)).toBe(5);
      expect(calc.callCount).toBe(1);

      expect(calc.add(2, 3)).toBe(5);
      expect(calc.callCount).toBe(1); // Should not increment
    });

    it('should handle different methods separately', () => {
      const calc = new TestCalculator();

      expect(calc.add(2, 3)).toBe(5);
      expect(calc.multiply(2, 3)).toBe(6);
      expect(calc.callCount).toBe(2);

      expect(calc.add(2, 3)).toBe(5);
      expect(calc.multiply(2, 3)).toBe(6);
      expect(calc.callCount).toBe(2); // Should not increment
    });

    it('should handle recursive methods', () => {
      const calc = new TestCalculator();

      expect(calc.fibonacci(5)).toBe(5);
      expect(calc.callCount).toBe(6); // Should call 6 times for fibonacci(5)

      expect(calc.fibonacci(5)).toBe(5);
      expect(calc.callCount).toBe(6); // Should not increment, all cached
    });

    it('should provide clearMemoCache method', () => {
      const calc = new TestCalculator();

      calc.add(2, 3);
      expect(calc.callCount).toBe(1);

      calc.add(2, 3);
      expect(calc.callCount).toBe(1); // Cached

      clearMemoCache(calc, 'add');
      calc.add(2, 3);
      expect(calc.callCount).toBe(2); // Called again after clearing
    });

    it('should clear all caches when no method specified', () => {
      const calc = new TestCalculator();

      calc.add(2, 3);
      calc.multiply(2, 3);
      expect(calc.callCount).toBe(2);

      calc.add(2, 3);
      calc.multiply(2, 3);
      expect(calc.callCount).toBe(2); // Both cached

      clearMemoCache(calc);
      calc.add(2, 3);
      calc.multiply(2, 3);
      expect(calc.callCount).toBe(4); // Both called again
    });

    it('should handle multiple instances independently', () => {
      const calc1 = new TestCalculator();
      const calc2 = new TestCalculator();

      calc1.add(2, 3);
      calc2.add(2, 3);

      expect(calc1.callCount).toBe(1);
      expect(calc2.callCount).toBe(1);

      calc1.add(2, 3);
      calc2.add(2, 3);

      expect(calc1.callCount).toBe(1); // Still cached
      expect(calc2.callCount).toBe(1); // Still cached
    });
  });

  describe('clearMemoCache utility function', () => {
    class TestClass implements MemoizedClass {
      callCount = 0;

      @Memoize
      testMethod(x: number): number {
        this.callCount++;
        return x * 2;
      }

      // These methods are added by the decorator
      clearMemoCache(methodName?: string): void {}
      _memoizeCache?: { [key: string]: any };
    }

    it('should clear cache for specific method', () => {
      const instance = new TestClass();

      instance.testMethod(5);
      expect(instance.callCount).toBe(1);

      instance.testMethod(5);
      expect(instance.callCount).toBe(1); // Cached

      clearMemoCache(instance, 'testMethod');
      instance.testMethod(5);
      expect(instance.callCount).toBe(2); // Called again
    });

    it('should clear all caches when no method specified', () => {
      const instance = new TestClass();

      instance.testMethod(5);
      expect(instance.callCount).toBe(1);

      instance.testMethod(5);
      expect(instance.callCount).toBe(1); // Cached

      clearMemoCache(instance);
      instance.testMethod(5);
      expect(instance.callCount).toBe(2); // Called again
    });

    it('should handle instances without memoization gracefully', () => {
      class RegularClass {
        testMethod() {
          return 'test';
        }
      }

      const instance = new RegularClass();

      // Should not throw error
      expect(() => clearMemoCache(instance)).not.toThrow();
      expect(() => clearMemoCache(instance, 'testMethod')).not.toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle functions that return undefined', () => {
      let callCount = 0;
      const fn = (x: number) => {
        callCount++;
        return undefined;
      };

      const memoizedFn = memoize(fn);

      expect(memoizedFn(1)).toBeUndefined();
      expect(memoizedFn(1)).toBeUndefined();
      expect(callCount).toBe(1); // Should be cached
    });

    it('should handle functions that return functions', () => {
      let callCount = 0;
      const fn = (x: number) => {
        callCount++;
        return (y: number) => x + y;
      };

      const memoizedFn = memoize(fn);

      const result1 = memoizedFn(5);
      const result2 = memoizedFn(5);

      expect(result1(3)).toBe(8);
      expect(result2(3)).toBe(8);
      expect(callCount).toBe(1); // Should be cached
    });

    it('should handle circular references gracefully', () => {
      let callCount = 0;
      const fn = (obj: any) => {
        callCount++;
        return obj;
      };

      const memoizedFn = memoize(fn);
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;

      // Should not throw when trying to stringify circular reference
      expect(() => memoizedFn(circularObj)).toThrow();
    });
  });
});
