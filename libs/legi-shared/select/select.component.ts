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
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HasOptionsProvider, provideHasOptionsProvider } from '@cognizone/legi-cv';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { I18nService } from '@cognizone/i18n';

import { SelectOptionSortType } from '@cognizone/legi-shared/select-option-sort';
import { getAllSelectOptions, LangString, LangStringSimple, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';

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
  @ContentChild(TemplateRef, { static: false })
  template!: TemplateRef<unknown>;

  @Input()
  hint?: string;

  @Output()
  selectionChange: EventEmitter<unknown> = new EventEmitter();

  embeddedControl: FormControl = new FormControl();

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  private allOptions?: SelectOption<T>[];

  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    private i18nService: I18nService,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  writeValue(value: T): void {
    super.writeValue(value);
    this.evaluateOptions();
  }

  getContext(option: SelectOption<T>): { $implicit: SelectOption<T>; option: SelectOption<T> } {
    return { $implicit: option, option };
  }

  isString(label: LangString | LangStringSimple | string): label is string {
    return typeof label === 'string';
  }

  private evaluateOptions(): void {
    this.options = (this.allOptions ?? this.options ?? []).filter(option => {
      if (option.disabled && this.removeDisabledOptions) {
        return option.value === this.model;
      }
      return true;
    });
  }

  private useOptionsProvider(provider: SelectOptionsProvider<T>): void {
    this.subSink = provider.getOptions(undefined, { lang: this.i18nService.getActiveSimpleLang() }).subscribe(options => {
      this.allOptions = getAllSelectOptions(options);
      this.evaluateOptions();
      this.cdr.markForCheck();
    });
  }
}
