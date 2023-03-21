import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { ControlContainer, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { I18nService } from '@cognizone/i18n';

import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import {
  getAllSelectOptions,
  groupSelectOptions,
  LangString,
  LangStringSimple,
  Nil,
  SelectOption,
  SelectOptionCounts,
  SelectOptionGroup,
  SelectOptionsProvider,
  trackBySelectOption,
} from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { startWith, switchMap } from 'rxjs/operators';

/**
 * `CheckboxGroupComponent` allows user to pass a list of options and check
 *  multiple ones using checkboxes. It is possible to filter the list of
 *  options by a search query using a searchControl,
 * this option is determined using `canBeFiltered`.
 *  The CheckboxGroupComponent is connected to an embeddedControl, and every change
 *  on selection, should reflect on control value.
 *
 */
@Component({
  selector: 'cz-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxGroupComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => CheckboxGroupComponent)),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupComponent<T> extends ControlComponent<T[]> implements HasOptionsProvider<T>, OnInit, OnChanges {
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
  canBeFiltered = false;
  @Input()
  direction: 'row' | 'column' = 'column';
  @Input()
  sortType?: SelectOptionSortType;
  @Input()
  removeDisabledOptions = true;
  @Input()
  inputLabel?: string;

  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<unknown>;

  seeMore = false;

  selectedOption?: SelectOption<T>;
  selectedOptionIndex = -1;

  embeddedControl: UntypedFormControl = new UntypedFormControl();
  searchControl: UntypedFormControl = new UntypedFormControl();
  trackBySelectOption: typeof trackBySelectOption = trackBySelectOption;
  optionsGroups: SelectOptionGroup<T>[] = [];

  private _optionsProvider!: SelectOptionsProvider<T>;
  private _counts: Nil<SelectOptionCounts>;
  private allOptions: SelectOption<T>[] = [];

  constructor(private i18n: I18nService, logger: Logger, cdr: ChangeDetectorRef, @Optional() controlContainer: ControlContainer) {
    super(logger, cdr, controlContainer);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.embeddedControl.valueChanges.pipe(this.untilDestroyed()).subscribe(value => {
      this.searchControl.setValue(null);
      this.selectedOptionIndex = this.options.findIndex(option => option.value === value);
      this.selectedOption = this.options[this.selectedOptionIndex];
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options) {
      this.setOptions();
    }
  }

  /**
   * @ignore
   */
  isString(label: string | LangString | LangStringSimple): label is string {
    return typeof label === 'string';
  }

  /**
   * @ignore
   */
  isChecked(option: SelectOption<T>): boolean {
    const model = this.model ?? [];
    return model.includes(option.value);
  }

  /**
   * `onChange` update list of checked options and refreshes the value of embeddedControl
   */
  onChange(event: MatCheckboxChange, option: SelectOption<T>): void {
    let model = this.model ?? [];
    if (event.checked) model = [...model, option.value];
    else model = model.filter(m => m !== option.value);
    this.embeddedControl.setValue(model);
  }

  /**
   * @ignore
   */
  toggleSeeMore(): void {
    this.seeMore = !this.seeMore;
    this.cdr.markForCheck();
  }

  /**
   * `getCount` provides count of each option
   */
  getCount(option: SelectOption<T>): number {
    return this.counts ? this.counts[option.value as unknown as string] : 0;
  }

  /**
   * @ignore
   */
  showSelectedOptionAtTheEnd(actualOptions: SelectOption<T>[]): boolean {
    const index = this.selectedOption ? actualOptions.findIndex(o => o.value === this.selectedOption?.value) : -1;
    return index > actualOptions.length - 1;
  }

  /**
   * `getContext` provides option context for ng-template
   * adding more flexibility for customizing chip template of selected options
   */
  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

  /**
   * `setOptions` provides the list of options and optionsGroups
   *
   * list updates with searchControl value changes, which filters list of options
   * based on search query
   */
  private setOptions(): void {
    this.emptySink();
    if (this.options && !this.optionsProvider) {
      this.optionsGroups = groupSelectOptions(this.options);
      return;
    }
    if (!this.optionsProvider) return;
    this.subSink = this.searchControl.valueChanges
      .pipe(
        startWith(this.searchControl.value),
        switchMap(q =>
          this.optionsProvider.getOptions(q, {
            lang: this.i18n.getActiveSimpleLang(),
            counts: this.counts,
          })
        )
      )
      .subscribe(options => {
        const groups = groupSelectOptions(options);
        this.options = getAllSelectOptions(options);
        this.optionsGroups = groups;
        if(this.removeDisabledOptions) {
          this.optionsGroups = this.optionsGroups.map(group => {
            return {
              ...group,
              options: group.options.filter(o => !o.disabled)
            };
          })
        }

        this.cdr.markForCheck();
      });
  }
}
