import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Input,
  OnInit,
  Optional,
  TemplateRef,
} from '@angular/core';
import { ControlContainer, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { I18nService } from '@cognizone/i18n';
import {
  getAllSelectOptions,
  LangString,
  LangStringSimple,
  Nil,
  SelectOption,
  SelectOptionCounts,
  SelectOptionsProvider,
  trackBySelectOption,
} from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

/**
 * `RadioGroupComponent` allows user to pass a list of options and choose one
 *  using radio buttons. It is possible to filter the list of
 *  options by a search query using a searchControl,
 * this option is determined using `canBeFiltered`
 *  the RadioGroupComponent value is connected to an embeddedControl, and every change
 *  on selection, should reflect on the control value.
 *
 */
@Component({
  selector: 'cz-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => RadioGroupComponent)),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent<T> extends ControlComponent<T> implements HasOptionsProvider<T>, OnInit {
  @Input()
  label?: string;
  @Input()
  set optionsProvider(value: SelectOptionsProvider<T>) {
    this._optionsProvider = value;
    this.setOptions();
  }
  get optionsProvider(): SelectOptionsProvider<T> {
    return this._optionsProvider;
  }
  @Input()
  options: SelectOption<T>[] = [];
  @Input()
  get counts(): Nil<SelectOptionCounts> {
    return this._counts;
  }
  set counts(value: Nil<SelectOptionCounts>) {
    this._counts = value;
    this.setOptions();
  }
  @Input()
  canBeDiscarded = false;
  @Input()
  canBeFiltered = false;
  @Input()
  direction: 'column' | 'row' = 'column';
  @Input()
  inputLabel?: string;
  @Input()
  filterOutZeroCounts = true;
  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<unknown>;

  embeddedControl: UntypedFormControl = new UntypedFormControl();
  searchControl: UntypedFormControl = new UntypedFormControl();
  trackBySelectOption: typeof trackBySelectOption = trackBySelectOption;

  private _optionsProvider!: SelectOptionsProvider<T>;
  private _counts: Nil<SelectOptionCounts>;

  /**
   * @ignore
   */
  constructor(private i18nService: I18nService, logger: Logger, cdr: ChangeDetectorRef, @Optional() controlContainer: ControlContainer) {
    super(logger, cdr, controlContainer);
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    super.ngOnInit();

    this.embeddedControl.valueChanges.pipe(this.untilDestroyed()).subscribe(value => {
      this.searchControl.setValue(null);
    });
  }

  /**
   * @ignore
   */
  isString(label: LangString | LangStringSimple | string): label is string {
    return typeof label === 'string';
  }

  /**
   * @ignore
   */
  discard(): void {
    this.embeddedControl.setValue(null);
  }

  /**
   * `getContext` provides option context for ng-template
   * adding more flexibility for customizing option template of mat-radio-button
   */
  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

  /**
   * `getCount` provides count of each option
   */
  getCount(option: SelectOption<T>): number {
    return this.counts?.[option.value as unknown as string] ?? 0;
  }

  /**
   * `setOptions` provides the list of options and count on each one
   *
   * list updates with searchControl value changes, which filters list of options
   * based on search query
   */
  private setOptions(): void {
    this.emptySink();
    if (!this.optionsProvider) return;
    this.subSink = this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        switchMap(q =>
          this.optionsProvider.getOptions(q, {
            counts: this.counts ?? undefined,
            lang: this.i18nService.getActiveSimpleLang(),
          })
        ),
        map(getAllSelectOptions),
        switchMap(options => this.checkForMissing(options))
      )
      .subscribe(options => {
        this.options = options;
        this.cdr.markForCheck();
      });
  }

  /**
   * @ignore
   */
  private checkForMissing(options: SelectOption<T>[]): Observable<SelectOption<T>[]> {
    const value = this.model;
    if (value && !options.find(o => o.value === value)) {
      return this.optionsProvider.getValueOption(value).pipe(map(missingOption => [missingOption, ...options]));
    }

    return of(options);
  }
}
