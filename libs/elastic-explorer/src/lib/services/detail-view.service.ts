import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DetailViewService {
  textFilter$: Observable<string | undefined>;

  private _textFilter$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');

  constructor() {
    this._textFilter$ = new BehaviorSubject<string | undefined>(undefined);
    this.textFilter$ = this._textFilter$.asObservable();
  }

  setTextFilter(value: string): void {
    this._textFilter$.next(value);
  }
}
