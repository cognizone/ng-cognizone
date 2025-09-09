import { inject, Injectable, NgZone } from '@angular/core';
import { MonoTypeOperatorFunction, Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TtlCacheFactory {
  private ngZone = inject(NgZone);

  create<K, V>(options: TtlCacheOptions): TtlCache<K, V> {
    return new TtlCache(options, this.ngZone);
  }
}

export class TtlCache<K, V> {
  private map: Map<K, V> = new Map();
  private ttls: Map<K, Subscription> = new Map();

  constructor(private options: TtlCacheOptions, private ngZone: NgZone) {}

  has(key: K): boolean {
    return this.map.has(key);
  }

  get(key: K): V | undefined {
    return this.map.get(key);
  }

  set(key: K, value: V): void {
    this.map.set(key, value);
    this.ngZone.runOutsideAngular(() => {
      this.ttls.get(key)?.unsubscribe();
      this.ttls.set(
        key,
        timer(this.options.ttl).subscribe(() => {
          this.map.delete(key);
          this.ttls.delete(key);
        })
      );
    });
  }
}

export function cacheIt<K, V>(cache: TtlCache<K, V>, key: K): MonoTypeOperatorFunction<V> {
  return obs$ => obs$.pipe(tap(value => cache.set(key, value)));
}

export type TtlCacheOptions = {
  ttl: number;
};
