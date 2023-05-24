import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  TemplateRef,
} from '@angular/core';
import { ControlContainer, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { LabelComponent } from '@cognizone/legi-shared/label';
import { I18nService } from '@cognizone/i18n';

import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { getAllSelectOptions, LangString, LangStringSimple, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';

/**
 * `SelectComponent` shows a list of options in a dropdown list, where user can select only one
 *
 *  The SelectComponent value is connected to an embeddedControl, and every change
 *  on selection, should reflect on the control value.
 *
 *  This component has 2 modes, classic and urban, which determine it's appearance
 *  appearance config should be passed in app.module
 *
 */
@Component({
  selector: 'cz-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
    provideHasOptionsProvider(forwardRef(() => SelectComponent)),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> extends ControlComponent<T> implements HasOptionsProvider<T> {
  @Input()
  placeholder?: string;
  @Input()
  label?: string;
  @Input()
  options: SelectOption<T>[] = [];
  @Input()
  set optionsProvider(value: SelectOptionsProvider<T>) {
    if (!value) return;
    this.useOptionsProvider(value);
  }
  @Input()
  sortType?: SelectOptionSortType;

  @Input()
  canBeDiscarded = false;
  @Input()
  removeDisabledOptions = true;
  @Input()
  isCompact = false;
  @ContentChild('optionTpl', { static: false, read: TemplateRef })
  template?: TemplateRef<unknown>;
  @ContentChild(LabelComponent, { static: false, read: LabelComponent })
  labelComponent?: LabelComponent;

  @Input()
  hint?: string;

  @Output()
  selectionChange: EventEmitter<unknown> = new EventEmitter();

  embeddedControl: UntypedFormControl = new UntypedFormControl();

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  private allOptions?: SelectOption<T>[];

  /**
   * @ignore
   */
  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    private i18nService: I18nService,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  /**
   * @ignore
   */
  writeValue(value: T): void {
    super.writeValue(value);
    this.evaluateOptions();
  }

  /**
   * `getContext` provides option context for ng-template
   * adding more flexibility for customizing option template of mat-radio-button
   */
  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

  /**
   * @ignore
   */
  isString(label: LangString | LangStringSimple | string): label is string {
    return typeof label === 'string';
  }

  /**
   * `evaluateOptions` removes disabled option from list of options
   *  if @Input() removeDisabledOptions is true
   */
  private evaluateOptions(): void {
    this.options = (this.allOptions ?? this.options ?? []).filter(option => {
      if (option.disabled && this.removeDisabledOptions) {
        return option.value === this.model;
      }
      return true;
    });
  }

  /**
   * `useOptionsProvider` sets the list of allOptions from @param {provider: SelectOptionsProvider}
   */
  private useOptionsProvider(provider: SelectOptionsProvider<T>): void {
    this.subSink = provider.getOptions(undefined, { lang: this.i18nService.getActiveSimpleLang() }).subscribe(options => {
      this.allOptions = getAllSelectOptions(options);
      this.evaluateOptions();
      this.cdr.markForCheck();
    });
  }
}
