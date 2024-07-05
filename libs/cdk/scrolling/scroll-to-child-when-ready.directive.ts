import { AfterViewInit, Directive, ElementRef, inject, InjectionToken, Input, NgZone, OnChanges } from '@angular/core';
import { Nil, notNil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { identity, Observable } from 'rxjs';
import { debounceTime, filter, first, map, startWith } from 'rxjs/operators';

interface ScrollToChildWhenReadyOptions {
  debounceTime?: number;
  scrollingOptions?: Parameters<HTMLElement['scrollIntoView']>[0];
  observerOptions?: MutationObserverInit;
}

export const defaultScrollToChildWhenReadyOptions: ScrollToChildWhenReadyOptions = {
  debounceTime: 100,
  scrollingOptions: { behavior: 'smooth', block: 'start' },
  observerOptions: { childList: true, subtree: true },
};

export const DEFAULT_SCROLL_TO_CHILD_WHEN_READY_OPTIONS = new InjectionToken<ScrollToChildWhenReadyOptions>(
  'SCROLL_TO_CHILD_WHEN_READY_OPTIONS',
  {
    factory: () => defaultScrollToChildWhenReadyOptions,
  }
);

@Directive({
  selector: '[czScrollToChildWhenReady]',
  standalone: true,
})
export class ScrollToChildWhenReadyDirective extends OnDestroy$ implements OnChanges, AfterViewInit, ScrollToChildWhenReadyOptions {
  private options: ScrollToChildWhenReadyOptions = inject(DEFAULT_SCROLL_TO_CHILD_WHEN_READY_OPTIONS);

  @Input('czScrollToChildWhenReady')
  selector: string | undefined;
  @Input('czScrollToChildWhenReadyDebounceTime')
  debounceTime = this.options.debounceTime;
  @Input('czScrollToChildWhenReadyScrollingOptions')
  scrollingOptions = this.options.scrollingOptions;
  @Input('czScrollToChildWhenReadyObserverOptions')
  observerOptions = this.options.observerOptions;

  private elRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private ngZone = inject(NgZone);

  ngOnChanges(): void {
    this.initScrolling();
  }

  ngAfterViewInit(): void {
    this.initScrolling();
  }

  scrollToTarget(): void {
    this.initScrolling();
  }

  private initScrolling(): void {
    this.ngZone.runOutsideAngular(() => {
      this.emptySink();
      if (!this.elRef.nativeElement || !this.selector) return;

      this.subSink = new Observable<MutationRecord[]>(observer => {
        const obs = new MutationObserver(mutations => observer.next(mutations));
        obs.observe(this.elRef.nativeElement, this.observerOptions);
        return () => obs.disconnect();
      })
        .pipe(
          startWith(null),
          this.debounceTime ? debounceTime(this.debounceTime) : identity,
          map(() => this.getTarget()),
          filter(notNil),
          first()
        )
        .subscribe(target => {
          target.scrollIntoView(this.scrollingOptions);
        });
    });
  }

  private getTarget(): Nil<Element> {
    if (!this.selector) return undefined;
    return this.elRef.nativeElement.querySelector(this.selector);
  }
}
