import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';

/**
 *  `LoadingButtonDirective` passed on a button to show a spinner when `loading` input boolean is true
 *
 */
@Directive({
  selector: '[czLoadingButton]',
})
export class LoadingButtonDirective implements OnInit, OnChanges, OnDestroy {
  @Input('czLoadingButton')
  loading: boolean = false;

  private spinnerDiv?: HTMLElement;
  private loadingOnce: boolean = false;
  private spinner?: ComponentRef<MatProgressSpinner>;

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions
  ) {}

  /**
   * @ignore
   *
   */
  ngOnInit(): void {
    this.toggleLoading();
  }

  /**
   * @ignore
   *
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.loading.isFirstChange()) {
      this.toggleLoading();
    }
  }

  /**
   * @ignore
   *
   */
  ngOnDestroy(): void {
    this.spinner?.destroy();
  }

  /**
   * `toggleLoading` shows/hides spinner on button based on `this.loading` value
   *
   */
  private toggleLoading(): void {
    const wrapper = this.elRef.nativeElement.getElementsByClassName('mat-button-wrapper').item(0);

    if (this.loading) {
      this.loadingOnce = true;

      this.elRef.nativeElement.setAttribute('style', 'position: relative;');
      wrapper?.setAttribute('style', 'visibility: hidden');
      this.elRef.nativeElement.appendChild(this.getSpinnerDiv());
    } else if (this.loadingOnce) {
      this.spinnerDiv?.remove();
      this.elRef.nativeElement.removeAttribute('style');
      wrapper?.removeAttribute('style');
    }
  }

  /**
   * `getSpinnerDiv` creates a div element, and appends a spinner to it.
   * Styles of this div vary based on config.appearance
   *
   */
  private getSpinnerDiv(): HTMLElement {
    if (this.spinnerDiv) return this.spinnerDiv;
    const factory = this.componentFactoryResolver.resolveComponentFactory(MatProgressSpinner);
    this.spinner = factory.create(this.injector);
    this.spinner.instance.diameter = 20;
    this.spinner.instance.mode = 'indeterminate';
    this.spinner.hostView.detectChanges();

    const div = document.createElement('div');
    const styles = ['position: absolute;', ' top: 0;', ' left: 0; ', 'width: 100%; ', 'height: 100%;'];
    if (this.config.appearance === 'urban') {
      styles.push('background-color: white;', 'border-radius: 4px; border: 2px solid #4a90e2');
      this.spinner.instance.color = 'primary';
    }
    div.setAttribute('class', 'd-flex align-items-center justify-content-center');
    div.setAttribute('style', styles.join(''));

    div.appendChild(this.spinner.location.nativeElement);

    return (this.spinnerDiv = div);
  }
}
