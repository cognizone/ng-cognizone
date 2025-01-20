import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';

import { notNil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { identity, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MetaId, MetaPropertyDirectiveProps, SEO_OPTIONS } from '../models';
import { MetaValueCmd, SeoService } from '../services';

@Directive({
  selector: '[czMetaProperty]',
  standalone: true,
})
export class MetaPropertyDirective extends OnDestroy$ implements AfterViewInit, OnDestroy, MetaPropertyDirectiveProps, ContentProvider {
  @Input('czMetaProperty')
  metaId!: MetaId;

  @Input('czMetaPropertySubValuesSeparator')
  set subValuesSeparator(value: string | undefined) {
    this._subValuesSeparator = value;
  }

  get subValuesSeparator(): string | undefined {
    return this.getPropFromKey('subValuesSeparator', this._subValuesSeparator);
  }

  @Input('czMetaPropertyWatchForChanges')
  public get watchForChanges(): boolean | undefined {
    return this.getPropFromKey('watchForChanges', this._watchForChanges);
  }
  public set watchForChanges(value: boolean | undefined) {
    this._watchForChanges = value;
  }

  @Input('czMetaPropertyOnDestroyStrategy')
  public get onDestroyStrategy(): MetaPropertyDirectiveProps['onDestroyStrategy'] {
    return this.getPropFromKey('onDestroyStrategy', this._onDestroyStrategy) ?? 'remove';
  }
  public set onDestroyStrategy(value: MetaPropertyDirectiveProps['onDestroyStrategy']) {
    this._onDestroyStrategy = value;
  }

  @Input('czMetaPropertyDebounceTime')
  debounceTime?: number = 200;
  @Input('czMetaPropertyObserverOptions')
  observerOptions?: MutationObserverInit = { childList: true, subtree: true };

  children: ContentProvider[] = [];

  private cmd?: MetaValueCmd;
  private _subValuesSeparator?: string;
  private _watchForChanges?: boolean | undefined;
  private _onDestroyStrategy?: MetaPropertyDirectiveProps['onDestroyStrategy'];
  private seoOptions = inject(SEO_OPTIONS);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private seoService = inject(SeoService);

  private getPropFromKey<T extends keyof MetaPropertyDirectiveProps>(
    key: T,
    localValue: MetaPropertyDirectiveProps[T]
  ): MetaPropertyDirectiveProps[T] {
    return (
      localValue ??
      this.seoService.getDescriptor(this.metaId).metaPropertyDirectiveProps?.[key] ??
      this.seoOptions.globalMetaPropertyDirectiveProps?.[key]
    );
  }

  ngAfterViewInit(): void {
    if (!this.metaId) return;
    const content = this.getContent();
    this.setValue(content);

    if (this.watchForChanges) {
      this.observeContentChange();
    }
  }

  ngOnDestroy(): void {
    if (this.onDestroyStrategy === 'remove') {
      this.cmd?.remove();
    } else if (this.onDestroyStrategy === 'reset' && this.metaId) {
      this.seoService.resetMeta(this.metaId);
    }
  }

  registerChild(child: ContentProvider): void {
    this.children.push(child);
  }

  unregisterChild(child: ContentProvider): void {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
    }
  }

  getContent(): string {
    if (this.children.length > 0) {
      return this.children.map(subValue => subValue.getContent()).join(this.subValuesSeparator ?? '');
    }
    return this.elRef.nativeElement.textContent?.trim() ?? '';
  }

  private setValue(content: string): void {
    if (this.cmd) {
      this.cmd.update(content);
      return;
    }

    const { multi } = this.seoService.getDescriptor(this.metaId);
    this.cmd = multi ? this.seoService.appendMetaValue(this.metaId, content) : this.seoService.setMetaValue(this.metaId, content);
  }

  private observeContentChange(): void {
    this.subSink = new Observable<MutationRecord[]>(observer => {
      const obs = new MutationObserver(mutations => observer.next(mutations));
      obs.observe(this.elRef.nativeElement, this.observerOptions);
      return () => obs.disconnect();
    })
      .pipe(
        this.debounceTime ? debounceTime(this.debounceTime) : identity,
        map(() => this.getContent()),
        filter(notNil),
        distinctUntilChanged()
      )
      .subscribe(content => {
        this.setValue(content);
      });
  }
}

export interface ContentProvider {
  getContent(): string;
}

@Directive({
  selector: '[czMetaPropertyPart]',
  standalone: true,
})
export class MetaPropertyPartDirective implements OnDestroy, OnInit, ContentProvider {
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private parent? = inject(MetaPropertyDirective, { optional: true });

  ngOnInit(): void {
    this.parent?.registerChild(this);
  }

  ngOnDestroy(): void {
    this.parent?.unregisterChild(this);
  }

  getContent(): string {
    return this.elRef.nativeElement.textContent?.trim() ?? '';
  }
}
