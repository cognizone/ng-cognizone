import { AfterContentChecked, Directive, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';

import { MetaId, SEO_OPTIONS } from '../models';
import { MetaValueCmd, SeoService } from '../services';

@Directive({
  selector: '[czMetaProperty]',
  standalone: true,
})
export class MetaPropertyDirective implements AfterContentChecked, OnDestroy, OnInit {
  @Input('czMetaProperty')
  metaId?: MetaId;

  @Input('czMetaPropertySubValuesSeparator')
  set subValuesSeparator(value: string | undefined) {
    this._subValuesSeparator = value;
  }

  get subValuesSeparator(): string | undefined {
    return this._subValuesSeparator ?? this.parent?.subValuesSeparator ?? this.seoOptions.metaPropertyDirective?.subValuesSeparator;
  }

  @Input('czMetaPropertyWatchForChanges')
  public get watchForChanges(): boolean | undefined {
    return this._watchForChanges ?? this.parent?.watchForChanges ?? this.seoOptions.metaPropertyDirective?.watchForChanges;
  }
  public set watchForChanges(value: boolean | undefined) {
    this._watchForChanges = value;
  }

  children: MetaPropertyDirective[] = [];

  private firstChange = true;
  private lastContent = '';
  private cmd?: MetaValueCmd;
  private _subValuesSeparator?: string;
  private _watchForChanges?: boolean | undefined;
  private seoOptions = inject(SEO_OPTIONS);
  private elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private parent? = inject(MetaPropertyDirective, { skipSelf: true, optional: true });
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.parent?.registerChild(this);
  }

  ngAfterContentChecked(): void {
    if (this.parent || (!this.watchForChanges && !this.firstChange) || !this.metaId) return;
    const content = this.getContent();
    if (content === this.lastContent) return;
    this.firstChange = false;
    if (this.cmd) {
      this.cmd.update(content);
      return;
    }

    const { multi } = this.seoService.getDescriptor(this.metaId);
    this.cmd = multi ? this.seoService.appendMetaValue(this.metaId, content) : this.seoService.setMetaValue(this.metaId, content);
  }

  ngOnDestroy(): void {
    this.parent?.unregisterChild(this);
    this.cmd?.remove();
  }

  registerChild(child: MetaPropertyDirective): void {
    this.children.push(child);
  }

  unregisterChild(child: MetaPropertyDirective): void {
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
}
