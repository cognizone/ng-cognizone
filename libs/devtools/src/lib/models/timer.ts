/* eslint-disable no-console */
import { debounce } from 'lodash-es';

export class Timer {
  private starts = {} as Record<string, number>;
  private totals = {} as Record<string, number>;
  private lasts = {} as Record<string, number>;
  private calls = {} as Record<string, number>;

  constructor(debounceTime: number = 500) {
    this.log = debounce(this.log.bind(this), debounceTime);
  }

  start(name: string, modifier: string): void {
    this.calls[name] = (this.calls[name] ?? 0) + 1;
    if (this.starts[name + modifier] == null) {
      this.starts[name + modifier] = window.performance.now();
    }
  }

  end(name: string, modifier: string): void {
    this.totals[name] = this.totals[name] ?? 0;
    const timeDiff = window.performance.now() - this.starts[name + modifier];
    this.lasts[name] = timeDiff;
    this.totals[name] += timeDiff;
    delete this.starts[name + modifier];
    this.log();
  }

  log(): void {
    Object.keys(this.totals).forEach(name => {
      console.group(name);
      console.log('Time ', this.totals[name], ' ms');
      console.log('Avg ', this.totals[name] / this.calls[name], ' ms');
      console.log('Last ', this.lasts[name], ' ms');
      console.log('Count ', this.calls[name]);
      console.groupEnd();
    });
  }
}

export function time(): MethodDecorator {
  let count = 0;
  const timer = new Timer();
  return function (target, propertyKey, descriptor): void {
    const old = descriptor.value as unknown as Function;
    (descriptor.value as unknown) = function (...args: unknown[]): unknown {
      const mod = (++count).toString();
      timer.start(propertyKey as string, mod);
      //@ts-expect-error not sure why "this" is not working
      const r = old.apply(this, args);
      timer.end(propertyKey as string, mod);
      return r;
    };
  };
}

export function timeAsync(): MethodDecorator {
  let count = 0;
  const timer = new Timer();
  return function (target, propertyKey, descriptor): void {
    const old = descriptor.value as unknown as Function;
    (descriptor.value as unknown) = async function (...args: unknown[]): Promise<unknown> {
      const mod = (++count).toString();
      timer.start(propertyKey as string, mod);
      //@ts-expect-error not sure why "this" is not working
      const r = await old.apply(this, args);
      timer.end(propertyKey as string, mod);
      return r;
    };
  };
}
