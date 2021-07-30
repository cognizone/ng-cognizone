/* eslint-disable @angular-eslint/contextual-lifecycle */
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AfterViewInit, Directive, ElementRef, HostListener, Injectable, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { Subscription, timer } from 'rxjs';

@Directive()
@Injectable()
export abstract class AbstractTooltipDirective<T> extends OnDestroy$ implements AfterViewInit, OnDestroy {
  protected abstract component: Type<T>;

  private overlayRef!: OverlayRef;

  private portal!: ComponentPortal<T>;

  private detachTimeout?: Subscription;

  constructor(private readonly overlay: Overlay, private readonly elRef: ElementRef, private readonly vcRef: ViewContainerRef) {
    super();
  }

  ngAfterViewInit(): void {
    this.portal = new ComponentPortal(this.component, this.vcRef);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);
    this.overlayRef = this.overlay.create({ positionStrategy });
    this.onDestroy$.subscribe(() => this.overlayRef.dispose());
  }

  @HostListener('mouseover')
  onMouseOver(): void {
    this.cancelDetach();
    if (this.overlayRef.hasAttached()) return;
    const ref = this.overlayRef.attach(this.portal);
    this.linkInputs(ref.instance);
    ref.changeDetectorRef.detectChanges();
    ref.hostView.markForCheck();
    ref.location.nativeElement.onmouseover = () => this.cancelDetach();
    ref.location.nativeElement.onmouseout = () => this.onMouseOut();
  }

  @HostListener('mouseout')
  onMouseOut(): void {
    this.detachTimeout = timer(200)
      .pipe(this.untilDestroyed())
      .subscribe(() => this.overlayRef.detach());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected linkInputs(instance: T): void {
    // let children decide
  }

  private cancelDetach(): void {
    if (this.detachTimeout != null) {
      this.detachTimeout.unsubscribe();
      this.detachTimeout = undefined;
    }
  }
}
