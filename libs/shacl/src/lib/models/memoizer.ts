/* eslint-disable @typescript-eslint/no-explicit-any */
import { memoize } from 'lodash-es';

export type Memoized = ReturnType<typeof memoize>;
type MemoizeParams<T extends (...args: any) => any> = Parameters<typeof memoize<T>>;

// could be put in model-utils or something, but annoying to have a dependency to lodash then
export class Memoizer {
  private memoizedList: Memoized[] = [];

  memoize<T extends (...args: any) => any>(...args: MemoizeParams<T>): Memoized & T {
    const memoized = memoize(...args);
    this.memoizedList.push(memoized);
    return memoized as Memoized & T;
  }

  clearCache(): void {
    this.memoizedList.forEach(memoized => memoized.cache.clear?.());
  }
}
