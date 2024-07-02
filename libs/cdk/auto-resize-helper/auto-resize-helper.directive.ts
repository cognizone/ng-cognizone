/* eslint-disable @angular-eslint/no-input-rename */
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AfterViewInit, Directive, ElementRef, inject, InjectionToken, Input, NgZone } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

export interface AutoResizeHelperDirectiveProps {
  debounceTime?: number;
  resizeObserverOptions?: ResizeObserverOptions;
}

export const DEFAULT_AUTO_RESIZE_HELPER_DIRECTIVE_PROPS: AutoResizeHelperDirectiveProps = {
  debounceTime: 100,
  resizeObserverOptions: { box: 'border-box' },
};

export const AUTO_RESIZE_HELPER_DIRECTIVE_PROPS = new InjectionToken<AutoResizeHelperDirectiveProps>('AUTO_RESIZE_HELPER_DIRECTIVE_PROPS', {
  factory: () => DEFAULT_AUTO_RESIZE_HELPER_DIRECTIVE_PROPS,
});

@Directive({ selector: 'textarea[cdkTextareaAutosize][czAutoResizeHelper]', standalone: true })
export class AutoResizeHelperDirective extends OnDestroy$ implements AfterViewInit, AutoResizeHelperDirectiveProps {
  @Input('czAutoResizeHelperDebounceTime')
  get debounceTime(): number | undefined {
    return this._debounceTime;
  }
  set debounceTime(value: number | undefined) {
    this._debounceTime = value ?? this.props.debounceTime;
  }
  private _debounceTime?: number | undefined;

  @Input('czAutoResizeHelperResizeObserverOptions')
  get resizeObserverOptions(): ResizeObserverOptions | undefined {
    return this._resizeObserverOptions ?? this.props.resizeObserverOptions;
  }
  set resizeObserverOptions(value: ResizeObserverOptions | undefined) {
    this._resizeObserverOptions = value;
  }
  private _resizeObserverOptions?: ResizeObserverOptions | undefined;

  private elRef: ElementRef<HTMLElement> = inject(ElementRef);
  private autoSize = inject(CdkTextareaAutosize);
  private ngZone = inject(NgZone);
  private props = inject(AUTO_RESIZE_HELPER_DIRECTIVE_PROPS);

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      const el = this.elRef.nativeElement;
      const resize$ = new Observable(observer => {
        const obs = new ResizeObserver(() => observer.next());
        obs.observe(el, this.resizeObserverOptions);
        observer.add(() => {
          obs.disconnect();
        });
      });

      this.subSink = resize$
        .pipe(
          this.debounceTime ? debounceTime(this.debounceTime) : tap(),
          map(() => el.clientWidth),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.autoSize.resizeToFitContent(true);
        });
    });
  }
}
