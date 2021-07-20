import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Input,
  OnInit,
  Optional,
  TemplateRef
} from '@angular/core';
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { I18nService } from '@cognizone/legi-shared/core';
import {
  getAllSelectOptions,
  LangString,
  LangStringSimple,
  Nil,
  SelectOption,
  SelectOptionCounts,
  SelectOptionsProvider,
  trackBySelectOption
} from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cz-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => RadioGroupComponent))
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  canBeDiscarded: boolean = false;
  @Input()
  canBeFiltered: boolean = false;
  @Input()
  direction: 'row' | 'column' = 'column';
  @Input()
  inputLabel?: string;
  @Input()
  filterOutZeroCounts: boolean = true;
  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<unknown>;

  embeddedControl: FormControl = new FormControl();
  searchControl: FormControl = new FormControl();
  trackBySelectOption: typeof trackBySelectOption = trackBySelectOption;

  private _optionsProvider!: SelectOptionsProvider<T>;
  private _counts: Nil<SelectOptionCounts>;

  constructor(private i18nService: I18nService, logger: Logger, cdr: ChangeDetectorRef, @Optional() controlContainer: ControlContainer) {
    super(logger, cdr, controlContainer);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.embeddedControl.valueChanges.pipe(this.untilDestroyed()).subscribe(value => {
      this.searchControl.setValue(null);
    });
  }

  isString(label: string | LangString | LangStringSimple): label is string {
    return typeof label === 'string';
  }

  discard(): void {
    this.embeddedControl.setValue(null);
  }

  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

  getCount(option: SelectOption<T>): number {
    return this.counts?.[(option.value as unknown) as string] ?? 0;
  }

  private setOptions(): void {
    this.emptySink();
    if (!this.optionsProvider) return;
    this.subSink = this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        switchMap(q =>
          this.optionsProvider.getOptions(q, {
            counts: this.counts ?? undefined,
            lang: this.i18nService.getActiveSimpleLang()
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

  private checkForMissing(options: SelectOption<T>[]): Observable<SelectOption<T>[]> {
    const value = this.model;
    if (value && !this.options.find(o => o.value === value)) {
      return this.optionsProvider.getValueOption(value).pipe(
        map(missingOption => {
          return [missingOption, ...options];
        })
      );
    }

    return of(options);
  }
}
