import { Pipe, PipeTransform } from '@angular/core';
import produce from 'immer';

@Pipe({
  name: 'filterObject',
})
export class FilterObjectPipe implements PipeTransform {
  transform(value: {}, query: string): {} {
    if (!query) return value;
    return produce(value, draft => {
      this._transform(draft, query.toLowerCase(), '');
    });
  }

  private _transform<T>(draft: T, query: string, key: string): boolean {
    if (key.toLowerCase().includes(query)) return true;
    if (draft instanceof Date) return false;
    if (draft == null) return false;
    if (typeof draft === 'number') return draft.toString().includes(query) || key.includes(query);
    if (typeof draft === 'string') return draft.toLowerCase().includes(query) || key.toLowerCase().includes(query);
    if (Array.isArray(draft)) {
      for (let i = draft.length - 1; i >= 0; --i) {
        const found = this._transform(draft[i], query, '');
        if (!found) {
          draft.splice(i, 1);
        }
      }
      return draft.length > 0;
    }
    if (typeof draft === 'object') {
      let findsome = false;
      for (const [loopKey, value] of Object.entries(draft)) {
        const doesMatch = this._transform(value, query, loopKey);
        if (doesMatch) findsome = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        else delete (draft as any)[loopKey];
      }
      return findsome;
    }
    return false;
  }
}
