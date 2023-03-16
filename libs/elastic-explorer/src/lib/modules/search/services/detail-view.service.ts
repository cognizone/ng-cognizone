import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { selectProp, SubSink } from '@cognizone/model-utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DetailViewService {
  textFilter$: Observable<string | undefined>;

  private _textFilter$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>('');
  private subSink: SubSink = new SubSink();

  constructor(private router: Router) {
    this._textFilter$ = new BehaviorSubject<string | undefined>(undefined);
    this.textFilter$ = this._textFilter$.asObservable();
  }

  onPageLoad(route: ActivatedRoute): void {
    this.subSink.add = this.textFilter$.subscribe(async textFilter => {
      await this.router.navigate([], {
        relativeTo: route,
        queryParamsHandling: 'merge',
        skipLocationChange: true,
        queryParams: {
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- handling empty string
          detailFilter: textFilter || undefined,
        },
      });
    });
    this.subSink.add = route.queryParams.pipe(selectProp('detailFilter')).subscribe(textFilter => {
      this._textFilter$.next(textFilter);
    });
  }

  onPageUnload(): void {
    this.subSink.empty();
  }

  setTextFilter(value: string): void {
    this._textFilter$.next(value);
  }
}
