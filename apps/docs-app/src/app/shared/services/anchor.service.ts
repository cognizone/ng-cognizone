import { Injectable } from '@angular/core';
import { Maybe } from '@cognizone/ng-core';
import { combineLatest, fromEvent, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, throttleTime } from 'rxjs/operators';

import { Anchor } from '../models/anchor';

@Injectable({
  providedIn: 'root',
})
export class AnchorService {
  anchors$: Observable<Anchor[]>;

  activeAnchor$: Observable<Maybe<Anchor>>;

  private _anchors$: Subject<Anchor[]> = new ReplaySubject(0);

  private anchors: Anchor[] = [];

  constructor() {
    this.anchors$ = this._anchors$.asObservable();
    const scroll$ = fromEvent(window, 'scroll').pipe(
      startWith(0),
      throttleTime(50),
      map(() => {
        if (document.scrollingElement) {
          return document.scrollingElement.scrollTop;
        }
        return 0;
      })
    );
    this.activeAnchor$ = combineLatest(scroll$, this.anchors$).pipe(
      map(([scrollTop, anchors]) => {
        const getTopOffset = (a: Anchor) => a.target.offsetTop;
        const activeAnchor = anchors
          .filter(a => getTopOffset(a) >= scrollTop)
          .reduce<Maybe<Anchor>>((min, current) => {
            if (min == null) return current;
            return getTopOffset(min) < getTopOffset(current) ? min : current;
          }, undefined);
        if (!activeAnchor && anchors.length > 0) {
          return anchors[anchors.length - 1];
        }
        return activeAnchor;
      })
    );
  }

  register(anchor: Anchor): void {
    this.anchors = [...this.anchors, anchor];
    this._anchors$.next(this.anchors);
  }

  unregister(anchor: Anchor): void {
    this.anchors = this.anchors.filter(a => a !== anchor);
    this._anchors$.next(this.anchors);
  }
}
