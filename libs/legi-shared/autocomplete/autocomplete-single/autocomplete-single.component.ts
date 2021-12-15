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
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { I18nService } from '@cognizone/i18n';
import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { CzLabel, getAllSelectOptions, Nil, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { combineLatest, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

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

  get options(): SelectOption<T>[] {
    return this._options;
  }

  @Input()
  set optionsProvider(value: SelectOptionsProvider<T>) {
    this._optionsProvider = value;
    this.useOptionsProvider();
  }
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

  singleInputControl: FormControl = new FormControl();

  queryChanges: Subject<string> = new Subject();

  modelChanged$: Subject<T> = new Subject();

  set model(val: T) {
    this._model = val;
    this.modelChanged$.next(this._model);
  }

  get model(): T {
    return this._model;
  }

  modelAsOptions: SelectOption<T>[] = [];

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  private _options: SelectOption<T>[] = [];
  private storedValueOptions: SelectOption<T>[] = [];
  private _optionsProvider!: SelectOptionsProvider<T>;
  private refreshInput$: Subject<void> = new Subject();

  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    private i18n: I18nService,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subSink = this.refreshInput$.pipe(debounceTime(100)).subscribe(() => this.refreshInput());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.lang && !changes.lang.isFirstChange()) {
      this.refreshInput$.next();
    }
  }

  displayFn: (value?: T) => Nil<string> = value => {
    if (value == null) return undefined;
    const allOptions = [...this.storedValueOptions, ...this.options];
    const option = allOptions.find(o => o.value === value);
    if (option) return this.i18n.translate(option.label, undefined, this.lang);
    this.storeValueOption(value);
    return (value as unknown) as string;
  };

  trackByFn: TrackByFunction<SelectOption<T>> = (index, option) => option.value;

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.optionSelection.emit(event.option.value);
    this.setModelAndEmit(event.option.value);
  }

  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (isDisabled) {
      this.singleInputControl.disable();
    } else {
      this.singleInputControl.enable();
    }
    this.cdr.markForCheck();
  }

  writeValue(value: T): void {
    super.writeValue(value);
    this.singleInputControl.setValue(value);
  }

  onSingleBlur(): void {
    if (!this.singleInput.nativeElement.value.trim() && this.model) {
      this.setModelAndEmit((undefined as unknown) as T);
    }
    if (!this.model) {
      this.singleInput.nativeElement.value = '';
    }
  }

  discard(): void {
    this.optionSelection.emit(undefined);
    this.setModelAndEmit((undefined as unknown) as T);
  }

  private refreshInput(): void {
    const value = this.singleInputControl.value;
    this.singleInputControl.setValue(value);
    this.cdr.markForCheck();
  }

  private useOptionsProvider(): void {
    this.modelChanged$.next(this.model);
    this.checkRawValue();

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

  private async storeValueOption(value: T): Promise<SelectOption<T> | undefined> {
    if (!this._optionsProvider || !value) return undefined;
    const hasOption = await this.optionsProvider.hasOptionFor(value).toPromise();
    if (!hasOption) return undefined;
    const option = await this._optionsProvider.getValueOption(value).toPromise();
    this.storedValueOptions.push(option);
    this.refreshInput$.next();
    return option;
  }

  private checkRawValue(): void {
    this.subSink = this.queryChanges
      .pipe(
        distinctUntilChanged(),
        filter(query => typeof query === 'string'),
        switchMap(query => combineLatest([this._optionsProvider.hasOptionFor((query as unknown) as T), of(query)]))
      )
      .subscribe(([hasOption, value]) => {
        if (hasOption) {
          this.setModelAndEmit((value as unknown) as T);
        }
      });
  }
}
