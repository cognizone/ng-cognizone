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
  QueryList,
  SimpleChanges,
  TemplateRef,
  TrackByFunction,
  ViewChildren,
} from '@angular/core';
import { ControlContainer, NG_VALUE_ACCESSOR, UntypedFormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { I18nService } from '@cognizone/i18n';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import {
  getAllSelectOptions,
  groupSelectOptions,
  LangString,
  LangStringSimple,
  Nil,
  notNil,
  SelectOption,
  SelectOptionCounts,
  SelectOptionGroup,
  SelectOptionsProvider,
  trackBySelectOption,
} from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { first, startWith, switchMap } from 'rxjs/operators';

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
  standalone: false,
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
  direction: 'column' | 'row' = 'column';
  @Input()
  sortType?: SelectOptionSortType;
  @Input()
  removeDisabledOptions = true;
  @Input()
  inputLabel?: string;
  @Input()
  set groupAriaLabelledBy(value: string | undefined) {
    this._groupAriaLabelledBy = value;
  }
  get groupAriaLabelledBy(): string | undefined {
    if (this._groupAriaLabelledBy) return this._groupAriaLabelledBy;
    if (this.label) return this.labelId;
  }

  get actualSeeMoreThreshold(): number {
    return this.seeMore || this.seeMoreThreshold == null ? Number.POSITIVE_INFINITY : this.seeMoreThreshold;
  }

  get canSeeMore(): boolean {
    return this.seeMoreThreshold != null ? this.options.length > this.seeMoreThreshold : false;
  }

  static count: number = 0;

  @Input()
  inputAriaLabel?: string;
  @Input()
  inputClearLabel?: string;
  @Input()
  inputClearLabelledby?: string;

  @Input()
  seeMoreThreshold?: number;

  labelId: string = `cz-checkbox-group-label-id-${++CheckboxGroupComponent.count}`;
  inputClearBtnId: string = `${this.labelId}-clear-btn`;

  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<unknown>;

  seeMore = false;

  selectedOption?: SelectOption<T>;
  selectedOptionIndex = -1;

  embeddedControl: UntypedFormControl = new UntypedFormControl();
  searchControl: UntypedFormControl = new UntypedFormControl();
  trackBySelectOption: typeof trackBySelectOption = trackBySelectOption;
  trackByGroup: TrackByFunction<SelectOptionGroupWithId<T>> = (_, item) => item.id;
  optionsGroups: SelectOptionGroupWithId<T>[] = [];

  private _optionsProvider!: SelectOptionsProvider<T>;
  private _counts: Nil<SelectOptionCounts>;
  private _groupAriaLabelledBy?: string;

  @ViewChildren(MatCheckbox)
  checkboxes!: QueryList<MatCheckbox>;

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
  isString(label: LangString | LangStringSimple | string): label is string {
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
    model = event.checked ? [...model, option.value] : model.filter(m => m !== option.value);
    this.embeddedControl.setValue(model);
  }

  /**
   * @ignore
   */
  toggleSeeMore(): void {
    this.seeMore = !this.seeMore;
    if (this.seeMore) {
      const firstNewCheckboxIndex = this.checkboxes.length;
      this.subSink = this.checkboxes.changes.pipe(first()).subscribe(() => {
        this.checkboxes.toArray()[firstNewCheckboxIndex]?.focus();
      });
    }
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

  getSeeMoreCount(): number {
    return this.options.length - this.actualSeeMoreThreshold;
  }

  getClearBtnLabelledBy(): string {
    return [this.inputClearBtnId, this.inputClearLabelledby].filter(notNil).join(' ');
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
      this.optionsGroups = this.addIds(this.optionsGroups);
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
        if (this.removeDisabledOptions) {
          this.optionsGroups = this.optionsGroups.map(group => ({
            ...group,
            options: group.options.filter(o => !o.disabled),
          }));
        }
        this.optionsGroups = this.addIds(this.optionsGroups);

        this.cdr.markForCheck();
      });
  }

  private addIds(groups: SelectOptionGroup<T>[]): SelectOptionGroupWithId<T>[] {
    return groups.map((g, i) => ({ ...g, id: i.toString() }));
  }
}

interface SelectOptionGroupWithId<T> extends SelectOptionGroup<T> {
  id?: string;
}
