import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Self,
  TemplateRef,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NgControl, UntypedFormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { I18nService } from '@cognizone/i18n';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { extractControlFromNgControl } from '@cognizone/legi-shared/utils';
import { getAllSelectOptions, manyToArray, Nil, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { firstValueFrom, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

/**
 * `AutocompleteMultiComponent` allows user to pass a set of options and select multiple ones
 *  along with other inputs, the optionsProvider determines the set of options passed to the autocomplete list
 *  component is connected to a model, and every change on selection, should reflect on model value.
 *
 *  Component has 2 modes, classic and urban, which determine it's appearance
 *  appearance config should be passed in app.module
 */
@Component({
  selector: 'cz-autocomplete-multi',
  templateUrl: './autocomplete-multi.component.html',
  styleUrls: ['./autocomplete-multi.component.scss'],
  providers: [provideHasOptionsProvider(forwardRef(() => AutocompleteMultiComponent))],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteMultiComponent<T> extends ControlComponent<T[]> implements HasOptionsProvider<T>, OnInit {
  @Input()
  placeholder?: string;
  @Input()
  label?: string;
  @Input()
  btnLabel?: string;
  @Input()
  lang?: string;
  @Input()
  set options(value: SelectOption<T>[]) {
    this._options = value;
  }

  /**
   * @ignore
   */
  get options(): SelectOption<T>[] {
    return this._options;
  }

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
  hint?: string;
  @Input()
  removeDisabledOptions = true;

  @ViewChild('multiInput')
  multiInput!: ElementRef<HTMLInputElement>;

  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<unknown>;

  queryChanges: Subject<string> = new Subject();

  modelChanged$: Subject<T[]> = new Subject();

  set model(val: T[]) {
    this._model = val;
    this.modelChanged$.next(this._model);
  }

  /**
   * @ignore
   */
  get model(): T[] {
    return this._model;
  }

  newModel!: T[] | undefined;

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
  //custom error control. Added to explicitly show formControl error
  errorControl = new UntypedFormControl([null]);

  /**
   * @ignore
   */
  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    private i18n: I18nService,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer,
    @Optional() @Self() private ngControl?: NgControl
  ) {
    super(logger, cdr, controlContainer);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.controlChanged.complete();

    super.ngOnInit();
    this.initModelChange();
    if (this.ngControl) {
      const control = extractControlFromNgControl(this.ngControl);

      this.subSink = control.statusChanges.subscribe(a => {
        if (a === 'VALID' && this.errorControl?.errors) {
          this.errorControl.setErrors(null);
        } else if (a === 'INVALID' && this.errorControl?.errors !== control.errors) {
          this.errorControl?.setErrors(control.errors);
          this.errorControl?.markAsTouched();
          this.cdr.markForCheck();
        }
      });
    }
  }

  /**
   * Linked to displayWith property of mat-autocomplete
   *
   * @param value The `displayFn` searches for option inside list of options.
   * when option matching the value is found, displayFn translates the label of
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
   * `removeValue` will filter the value of the current model list of selected values
   */
  removeValue(value: SelectOption<T>): void {
    const currentModel = Array.isArray(this.model) ? this.model : [];
    const newModel = currentModel.filter(v => v !== value.value);
    this.setModelAndEmit(newModel);
  }

  /**
   * `onOptionSelected` adds the selected option value to the list of current
   *  model selected values
   */
  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    const currentModel = Array.isArray(this.model) ? this.model : [];
    this.newModel = [...currentModel, value];

    if (this.classicMode) {
      this.addSelectedValue();
    }
  }

  /**
   * `addSelectedValue` resets value of input,
   * this behavior is only necessary in classic mode
   */
  addSelectedValue(): void {
    this.setModelAndEmit(this.newModel as T[]);
    this.newModel = undefined;
    this.multiInput.nativeElement.value = '';
  }

  /**
   * @ignore
   */
  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.cdr.markForCheck();
  }

  /**
   * `getContext` provides option context for ng-template
   * adding more flexibility for customizing chip template of selected options
   */
  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

  /**
   * `useOptionsProvider` updates the list of options based on user query changes,
   * filtering disabled options, and returning all the matched options (or a
   *  slice of options list with a predefined maxOptionsSize)
   */
  private useOptionsProvider(): void {
    this.modelChanged$.next(this.model);

    this.subSink = this.queryChanges
      .pipe(
        distinctUntilChanged(),
        filter(query => typeof query === 'string'),
        switchMap(query => this._optionsProvider.getOptions(query, { lang: this.i18n.getActiveSimpleLang() })),
        map(getAllSelectOptions)
      )
      .subscribe(options => {
        if (this.removeDisabledOptions) {
          options = options.filter(o => !o.disabled);
        }
        this.options = options.slice(0, this.maxOptionsSize || options.length);
        this.cdr.markForCheck();
      });
  }

  /**
   * `storeValueOption` stores an option in storedValueOptions
   *
   */
  private async storeValueOption(value: T): Promise<SelectOption<T> | undefined> {
    if (!this._optionsProvider || !value) return undefined;
    const hasOption = await firstValueFrom(this.optionsProvider.hasOptionFor(value));
    if (!hasOption) return undefined;
    const option = await firstValueFrom(this._optionsProvider.getValueOption(value));
    this.storedValueOptions.push(option);
    return option;
  }

  /**
   * `getSelectOption` returns option object with a matching value
   *
   */
  private async getSelectOption(value: T): Promise<SelectOption<T> | undefined> {
    if (value == null) return undefined;
    const allOptions = [...this.storedValueOptions, ...this.options];
    const option = allOptions.find(o => o.value === value);
    return option ?? this.storeValueOption(value);
  }

  /**
   * `initModelChange` updates model value with selected options
   */
  private initModelChange(): void {
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
