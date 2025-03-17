import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  ViewContainerRef,
} from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { fromEvent } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { ToggletipComponent } from './toggletip.component';

@Directive({
  selector: '[czToggletipTriggerFor]',
  exportAs: 'czToggletipTriggerFor',
  standalone: true,
})
export class ToggletipTriggerForDirective extends OnDestroy$ implements OnDestroy {
  @Input('czToggletipTriggerFor')
  toggletip?: ToggletipComponent;

  @HostBinding('attr.aria-expanded')
  opened = false;

  @HostBinding('attr.aria-haspopup')
  hasPopup = true;

  @HostBinding('attr.aria-controls')
  get ariaControls(): string | undefined {
    return this.opened ? this.toggletip?.dialogId : undefined;
  }

  private injector = inject(Injector);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private elRef = inject(ElementRef);
  private ngZone = inject(NgZone);
  private overlayRef?: OverlayRef;
  private portal?: TemplatePortal;

  private processingClick = false;

  @HostListener('click')
  async onClick(): Promise<void> {
    if (this.processingClick) return;
    this.processingClick = true;
    if (!this.toggletip) return;

    const boundingBox = this.elRef.nativeElement.getBoundingClientRect();
    const positionClass = boundingBox.left < window.innerWidth / 2 ? 'is-left' : 'is-right';

    if (!this.overlayRef) {
      const positionStrategy = this.overlay
        .position()
        .flexibleConnectedTo(this.elRef)
        .withPositions([
          {
            originX: positionClass === 'is-left' ? 'end' : 'start',
            originY: 'center',
            overlayX: positionClass === 'is-left' ? 'start' : 'end',
            overlayY: 'center',
          },
        ])
        .withDefaultOffsetX(positionClass === 'is-left' ? 8 : -8);

      this.overlayRef = this.overlay.create({
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
        panelClass: positionClass,
      });
    } else {
      this.overlayRef.detach();
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    this.portal = new TemplatePortal(this.toggletip.tpl, this.viewContainerRef, undefined, this.injector);
    this.subSink = this.toggletip.toggletipClose.subscribe(() => this.close());
    this.overlayRef.attach(this.portal);
    this.initInteractions();
    this.subSink = this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.overlayRef?.overlayElement.querySelector('button')?.focus();
    });
    this.opened = true;
    this.processingClick = false;
  }

  @HostListener('window:keydown.escape')
  close(): void {
    if (!this.overlayRef?.hasAttached()) return;
    this.emptySink();
    const hasFocus = !!this.overlayRef.overlayElement.querySelector('*:focus-within');
    if (hasFocus) {
      this.elRef.nativeElement.focus();
    }
    this.overlayRef.detach();
    this.opened = false;
  }

  ngOnDestroy(): void {
    this.close();
  }

  private initInteractions(): void {
    const overlayEl = this.overlayRef?.overlayElement;
    if (!overlayEl) return;

    this.subSink = fromEvent<KeyboardEvent>(overlayEl, 'keydown')
      .pipe(filter(e => e.key === 'Tab'))
      .subscribe(event => {
        const list = this.getAllFocusableElements(overlayEl);
        const target = event.getModifierState('Shift') ? list.item(0) : list.item(list.length - 1);
        if (event.target === target) {
          event.preventDefault();
          this.close();
        }
      });
  }

  getAllFocusableElements<T extends Element = Element>(parent: HTMLElement): NodeListOf<T> {
    return parent.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)'
    );
  }
}
