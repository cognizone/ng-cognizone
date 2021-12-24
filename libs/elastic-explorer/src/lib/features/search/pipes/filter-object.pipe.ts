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

  private _transform<T>(draft: T, key?: string): boolean {
    if (key?.toLowerCase().includes(this.query)) return true;
    if (draft instanceof Date) return false;
    if (draft == null) return false;
    if (typeof draft === 'number' || typeof draft === 'string') return draft.toString().includes(this.query);
    if (Array.isArray(draft)) {
      let foundSome = false;
      for (let i = draft.length - 1; i >= 0; --i) {
        const doesMatch = this._transform(draft[i], key);
        if (doesMatch) foundSome = true;
        if (!doesMatch && !this.alwaysKeptKeys.includes(key as string)) {
          draft.splice(i, 1);
        }
      }
      return foundSome;
    }
    if (typeof draft === 'object') {
      let foundSome = false;
      for (const [loopKey, value] of Object.entries(draft)) {
        const doesMatch = this._transform(value, key ? `${key}.${loopKey}` : loopKey);
        if (doesMatch) foundSome = true;
        else if (!this.alwaysKeptKeys.includes(loopKey)) {
          delete draft[loopKey as keyof T];
        }
      }
      return foundSome;
    }
    return false;
  }
}
