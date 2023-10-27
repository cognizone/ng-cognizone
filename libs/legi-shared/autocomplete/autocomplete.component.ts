import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { I18nService } from '@cognizone/i18n';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { LabelComponent } from '@cognizone/legi-shared/label';
import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { getAllSelectOptions, manyToArray, Nil, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { combineLatest, firstValueFrom, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

let deprecatedWarned = false;

/**
 * @deprecated use cz-autocomplete-single or cz-autocomplete-multi instead, depending
 */
@Component({
  selector: 'cz-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutocompleteComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => AutocompleteComponent)),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<T> extends ControlComponent<T | T[]> implements HasOptionsProvider<T>, OnChanges, OnInit {
  @Input()
  placeholder?: string;
  @Input()
  label?: string;
  @Input()
  lang?: string;
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
  multi = false;

  @Input()
  maxOptionsSize = 15;

  @Input()
  sortType?: SelectOptionSortType;
  @Input()
  panelWidth?: number | string;

  @Input()
  removeDisabledOptions = true;

  @ViewChild('multiInput')
  multiInput!: ElementRef<HTMLInputElement>;
  @ViewChild('singleInput')
  singleInput!: ElementRef<HTMLInputElement>;
  @ContentChild(LabelComponent, { static: false, read: LabelComponent })
  labelComponent?: LabelComponent;

  singleInputControl: UntypedFormControl = new UntypedFormControl();

  queryChanges: Subject<string> = new Subject();

  modelChanged$: Subject<T | T[]> = new Subject();

  set model(val: T | T[]) {
    this._model = val;
    this.modelChanged$.next(this._model);
  }

  get model(): T | T[] {
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
    if (deprecatedWarned) {
      deprecatedWarned = true;
      this.logger.warn('cz-autocomplete is deprecated, please use cz-autocomplete-single or cz-autocomplete-multi instead');
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.initModelChange();
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
    return value as unknown as string;
  };

  trackByFn: TrackByFunction<SelectOption<T>> = (index, option) => option.value;

  removeValue(value: SelectOption<T>): void {
    const currentModel = Array.isArray(this.model) ? this.model : [];
    const newModel = currentModel.filter(v => v !== value.value);
    this.setModelAndEmit(newModel);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    if (this.multi) {
      const value = event.option.value;
      const currentModel = Array.isArray(this.model) ? this.model : [];
      const newModel = [...currentModel, value];
      this.setModelAndEmit(newModel);
      this.multiInput.nativeElement.value = '';
    } else {
      this.setModelAndEmit(event.option.value);
    }
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

  writeValue(value: T | T[]): void {
    super.writeValue(value);
    if (!this.multi) {
      this.singleInputControl.setValue(value);
    }
  }

  onSingleBlur(): void {
    if (!this.singleInput.nativeElement.value.trim() && this.model) {
      this.setModelAndEmit(undefined as unknown as T);
    }
    if (!this.model) {
      this.singleInput.nativeElement.value = '';
    }
  }

  private refreshInput(): void {
    if (!this.multi) {
      const value = this.singleInputControl.value;
      this.singleInputControl.setValue(value);
    }
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
    const hasOption = await firstValueFrom(this.optionsProvider.hasOptionFor(value));
    if (!hasOption) return undefined;
    const option = await firstValueFrom(this._optionsProvider.getValueOption(value));
    this.storedValueOptions.push(option);
    this.refreshInput$.next();
    return option;
  }

  private checkRawValue(): void {
    if (this.multi) return;

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

  private async getSelectOption(value: T): Promise<SelectOption<T> | undefined> {
    if (value == null) return undefined;
    const allOptions = [...this.storedValueOptions, ...this.options];
    const option = allOptions.find(o => o.value === value);
    return option ?? this.storeValueOption(value);
  }

  private initModelChange(): void {
    if (!this.multi) return;
    this.subSink = this.modelChanged$
      .pipe(
        startWith(this.model),
        map(model => (model ? manyToArray(model) : [])),
        switchMap(async values => {
          const options: SelectOption<T>[] = [];
          for (const value of values) {
            const option =
              (await this.getSelectOption(value)) ??
              ({
                value,
                label: value as unknown as string,
              } as SelectOption<T>);
            options.push(option);
          }
          return options;
        })
      )
      .subscribe(options => {
        if (!options) {
          this.modelAsOptions = [];
          return;
        }
        this.modelAsOptions = manyToArray(options);
        this.cdr.markForCheck();
      });
  }
}
