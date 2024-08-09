import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { I18nService } from '@cognizone/i18n';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { CzLabel, getAllSelectOptions, Nil, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { combineLatest, firstValueFrom, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

/**
 * `AutocompleteSingleComponent` allows user to pass a set of options and select one
 *  along with other inputs, the optionsProvider determines the set of options passed to the autocomplete list
 *  component is connected to a model, and every change on selection, should reflect on model value.
 *
 *  Component has 2 modes, classic and urban, which determine it's appearance
 *  appearance config should be passed in app.module
 */
@Component({
  selector: 'cz-autocomplete-single',
  templateUrl: './autocomplete-single.component.html',
  styleUrls: ['./autocomplete-single.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutocompleteSingleComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => AutocompleteSingleComponent)),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteSingleComponent<T> extends ControlComponent<T> implements HasOptionsProvider<T>, OnChanges, OnInit {
  @Input()
  placeholder?: string;
  @Input()
  label?: string;
  @Input()
  lang?: string;
  @Input()
  getTooltip: (option: SelectOption) => CzLabel = option => option.label;
  @Input()
  set options(value: SelectOption<T>[]) {
    this._options = value;
    // force rendering of displayed value when options are changed, cannot use ngOnChange because of how CvOptionsDirective works
    this.refreshInput$.next();
  }

  /**
   * @ignore
   */
  get options(): SelectOption<T>[] {
    return this._options;
  }

  /**
   * @ignore
   */
  @Input()
  set optionsProvider(value: SelectOptionsProvider<T>) {
    this._optionsProvider = value;
    this.useOptionsProvider();
  }

  /**
   * @ignore
   */
  get optionsProvider(): SelectOptionsProvider<T> {
    return this._optionsProvider;
  }

  @Input()
  maxOptionsSize = 15;

  @Input()
  sortType?: SelectOptionSortType;
  @Input()
  panelWidth?: number | string;

  @Input()
  removeDisabledOptions = true;
  @Input()
  canBeDiscarded = false;
  @Input()
  hint?: string;
  @Output()
  optionSelection: EventEmitter<string | undefined> = new EventEmitter();

  @ViewChild('singleInput')
  singleInput!: ElementRef<HTMLInputElement>;

  singleInputControl: UntypedFormControl = new UntypedFormControl();

  queryChanges: Subject<string> = new Subject();

  modelChanged$: Subject<T> = new Subject();

  set model(val: T) {
    this._model = val;
    this.modelChanged$.next(this._model);
  }

  /**
   * @ignore
   */
  get model(): T {
    return this._model;
  }

  modelAsOptions: SelectOption<T>[] = [];

  /**
   * @ignore
   */
  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  private _options: SelectOption<T>[] = [];
  private storedValueOptions: SelectOption<T>[] = [];
  private _optionsProvider!: SelectOptionsProvider<T>;
  private refreshInput$: Subject<void> = new Subject();

  /**
   * @ignore
   */
  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    private i18n: I18nService,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    super.ngOnInit();
    this.subSink = this.refreshInput$.pipe(debounceTime(100)).subscribe(() => this.refreshInput());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lang && !changes.lang.isFirstChange()) {
      this.refreshInput$.next();
    }
  }

  /**
   * Linked to displayWith property of mat-autocomplete
   *
   * @param value The `displayFn` searches for option inside list of options.
   *  when option matching the value is found, displayFn translates the label of
   *  the option found, considering that label is an instance of @typedef SelectOptionLabel
   */
  displayFn: (value?: T) => Nil<string> = value => {
    if (value == null) return undefined;
    const allOptions = [...this.storedValueOptions, ...this.options];
    const option = allOptions.find(o => o.value === value);
    if (option) return this.i18n.translate(option.label, undefined, this.lang);
    this.storeValueOption(value);
    return value as unknown as string;
  };

  /**
   * @ignore
   */
  trackByFn: TrackByFunction<SelectOption<T>> = (index, option) => option.value;

  /**
   * `onOptionSelected` sets the value of the current model to the selected option
   */
  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.optionSelection.emit(event.option.value);
    this.setModelAndEmit(event.option.value);
  }

  /**
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (isDisabled) {
      this.singleInputControl.disable();
    } else {
      this.singleInputControl.enable();
    }
    this.cdr.markForCheck();
  }

  /**
   * @ignore
   */
  writeValue(value: T): void {
    super.writeValue(value);
    this.singleInputControl.setValue(value);
  }

  onSingleBlur(): void {
    if (!this.singleInput.nativeElement.value.trim() && this.model) {
      this.setModelAndEmit(undefined as unknown as T);
    }
    if (!this.model) {
      this.singleInput.nativeElement.value = '';
    }
  }

  /**
   * `discard` removes the value of the current model
   */
  discard(): void {
    this.optionSelection.emit(undefined);
    this.setModelAndEmit(undefined as unknown as T);
  }

  /**
   * `refreshInput` refreshes value of singleInputControl
   */
  private refreshInput(): void {
    const value = this.singleInputControl.value;
    this.singleInputControl.setValue(value);
    this.cdr.markForCheck();
  }

  /**
   * `useOptionsProvider` updates the list of options based on user query changes,
   * filtering disabled options, and returning all the matched options (or a
   *  slice of options list with a predefined maxOptionsSize)
   */
  private useOptionsProvider(): void {
    this.modelChanged$.next(this.model);
    this.updateModelValue();

    this.subSink = this.queryChanges
      .pipe(
        distinctUntilChanged(),
        filter(query => typeof query === 'string'),
        switchMap(query =>
          this._optionsProvider.getOptions(query, {
            lang: this.i18n.getActiveSimpleLang(),
          })
        ),
        map(getAllSelectOptions)
      )
      .subscribe(options => {
        if (this.removeDisabledOptions) {
          options = options.filter(o => !o.disabled);
        }
        this.options = options.slice(0, this.maxOptionsSize || options.length);
        this.cdr.markForCheck();
      });

    this.refreshInput$.next();
  }

  /**
   * `storeValueOption` stores an option in storedValueOptions list of options
   *
   */
  private async storeValueOption(value: T): Promise<SelectOption<T> | undefined> {
    if (!this._optionsProvider || !value) return undefined;
    const hasOption = await firstValueFrom(this.optionsProvider.hasOptionFor(value));
    if (!hasOption) return undefined;
    const option = await firstValueFrom(this._optionsProvider.getValueOption(value));
    this.storedValueOptions.push(option);
    this.refreshInput$.next();
    return option;
  }

  /**
   * @ignore
   */
  private updateModelValue(): void {
    this.subSink = this.queryChanges
      .pipe(
        distinctUntilChanged(),
        filter(query => typeof query === 'string'),
        switchMap(query => combineLatest([this._optionsProvider.hasOptionFor(query as unknown as T), of(query)]))
      )
      .subscribe(([hasOption, value]) => {
        if (hasOption) {
          this.setModelAndEmit(value as unknown as T);
        }
      });
  }
}
