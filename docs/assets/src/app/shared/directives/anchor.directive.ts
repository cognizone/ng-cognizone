import { Directive, ElementRef, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Anchor } from '../models/anchor';
import { AnchorService } from '../services/anchor.service';

@Directive({
  selector: '[appAnchor]',
})
export class AnchorDirective implements OnInit, OnDestroy {
  @HostBinding('id')
  id!: string;

  private anchor!: Anchor;

  constructor(
    private readonly anchorService: AnchorService,
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const text = this.elRef.nativeElement.innerText;
    if (!this.id) this.id = text.toLowerCase().replace(/ /g, '-');
    this.anchor = {
      text,
      id: this.id,
      route: this.route,
      target: this.elRef.nativeElement,
    };
    this.anchorService.register(this.anchor);
  }

  ngOnDestroy(): void {
    this.anchorService.unregister(this.anchor);
  }
}
