import { Many, Nil, manyToArray } from '@cognizone/model-utils';

export type Processor<T = string> = (value: T, index: number, arr: T[]) => T;

export class Processors {
  private constructor() {
    throw new Error('Cannot instantiate static class');
  }

  static withMaxLength(maxLength: number, suffix = '', ellipsis = '...'): Processor {
    return value => {
      const full = `${value}${suffix}`;
      if (full.length <= maxLength) return full;
      const shortened = value.substring(0, maxLength - ellipsis.length - suffix.length);
      return [shortened, ellipsis, suffix].join('');
    };
  }

  static html(): Processor {
    return value => {
      const div = document.createElement('div');
      div.innerHTML = value;
      return (div.textContent ?? div.innerText ?? '').trim();
    };
  }

  static url(options: UrlProcessorOptions): Processor {
    return value => {
      if (options.forceW3 && !value.startsWith('http://www.') && !value.startsWith('https://www.')) {
        value = value.replace(/(http:\/\/|https:\/\/)/, '$1www.');
      }
      return value;
    };
  }
}

export interface UrlProcessorOptions {
  forceW3?: boolean;
}

export function composeProcessors<T>(preprocessors: Nil<Many<Processor<T>>>): Processor<T> {
  if (!preprocessors) return value => value;
  return (value, index, arr) => manyToArray(preprocessors).reduce((acc, curr) => curr(acc, index, arr), value);
}
