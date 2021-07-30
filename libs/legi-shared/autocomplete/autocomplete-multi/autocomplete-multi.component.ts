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
  TemplateRef,
  TrackByFunction,
  ViewChild,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { I18nService } from '@cognizone/i18n';

import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { getAllSelectOptions, manyToArray, Nil, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cz-autocomplete-multi',
  templateUrl: './autocomplete-multi.component.html',
  styleUrls: ['./autocomplete-multi.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AutocompleteMultiComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => AutocompleteMultiComponent)),
  ],
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

  get model(): T[] {
    return this._model;
  }

  newModel!: T[] | undefined;

  modelAsOptions: SelectOption<T>[] = [];

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  private _options: SelectOption<T>[] = [];
  private storedValueOptions: SelectOption<T>[] = [];
  private _optionsProvider!: SelectOptionsProvider<T>;

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
    this.initModelChange();
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

  removeValue(value: SelectOption<T>): void {
    const currentModel = Array.isArray(this.model) ? this.model : [];
    const newModel = currentModel.filter(v => v !== value.value);
    this.setModelAndEmit(newModel);
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    const currentModel = Array.isArray(this.model) ? this.model : [];
    this.newModel = [...currentModel, value];

    if (this.classicMode) {
      this.addSelectedValue();
    }
  }

  addSelectedValue(): void {
    this.setModelAndEmit(this.newModel as T[]);
    this.newModel = undefined;
    this.multiInput.nativeElement.value = '';
  }

  setDisabledState(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.cdr.markForCheck();
  }

  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

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

  private async storeValueOption(value: T): Promise<SelectOption<T> | undefined> {
    if (!this._optionsProvider || !value) return undefined;
    const hasOption = await this.optionsProvider.hasOptionFor(value).toPromise();
    if (!hasOption) return undefined;
    const option = await this._optionsProvider.getValueOption(value).toPromise();
    this.storedValueOptions.push(option);
    return option;
  }

  private async getSelectOption(value: T): Promise<SelectOption<T> | undefined> {
    if (value == null) return undefined;
    const allOptions = [...this.storedValueOptions, ...this.options];
    const option = allOptions.find(o => o.value === value);
    return option ?? this.storeValueOption(value);
  }

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
                label: (value as unknown) as string,
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
