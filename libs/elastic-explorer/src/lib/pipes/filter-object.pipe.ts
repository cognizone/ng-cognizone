import { Pipe, PipeTransform } from '@angular/core';
import produce from 'immer';

@Pipe({
  name: 'filterObject',
})
export class FilterObjectPipe implements PipeTransform {
  private query!: string;
  private alwaysKeptKeys: string[] = [];

  transform(value: {}, query: string, alwaysKeptKeys: string[] = []): {} {
    if (!query) return value;
    this.query = query.toLowerCase();
    this.alwaysKeptKeys = alwaysKeptKeys;
    return produce(value, draft => {
      this._transform(draft, '');
    });
  }

  private _transform<T>(draft: T, key: string): boolean {
    if (this.alwaysKeptKeys.includes(key)) return true;
    if (key.toLowerCase().includes(this.query)) return true;
    if (draft instanceof Date) return false;
    if (draft == null) return false;
    if (typeof draft === 'number') return draft.toString().includes(this.query) || key.includes(this.query);
    if (typeof draft === 'string') return draft.toLowerCase().includes(this.query) || key.toLowerCase().includes(this.query);
    if (Array.isArray(draft)) {
      for (let i = draft.length - 1; i >= 0; --i) {
        const found = this._transform(draft[i], '');
        if (!found) {
          draft.splice(i, 1);
        }
      }
      return draft.length > 0;
    }
    if (typeof draft === 'object') {
      let foundSome = false;
      for (const [loopKey, value] of Object.entries(draft)) {
        const doesMatch = this._transform(value, loopKey);
        if (doesMatch) foundSome = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        else delete (draft as any)[loopKey];
      }
      return foundSome;
    }
    return false;
  }
}
