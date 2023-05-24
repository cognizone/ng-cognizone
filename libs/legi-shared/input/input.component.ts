import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
} from '@angular/core';
import { AbstractControl, ControlContainer, UntypedFormControl, NgControl } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { bindControls, extractControlFromNgControl } from '@cognizone/legi-shared/utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';
import { LabelComponent } from '@cognizone/legi-shared/label';

/**
 * `InputComponent` uses a standard mat-input, with customized parameters and properties,
 * like label and placeholder, passed as `@Input()` by the app that uses the component.
 *  the component text entry is connected to an embeddedControl, and every change
 *  on the text entered, should reflect on the control value.
 *  This component has 2 modes, classic and urban, which determine it's appearance
 *  appearance config should be passed in app.module
 */
@Component({
  selector: 'cz-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends ControlComponent<string> implements OnInit {
  @Input()
  placeholder?: string;
  @Input()
  set label(label: string | undefined) {
    this._label = label;
    if (!this.ariaLabel) this.ariaLabel = label;
  }
  get label(): string | undefined {
    return this._label;
  }
  @Input()
  ariaLabel?: string;
  @Input()
  autoTrim = true;
  @Input()
  hint?: string;
  @Input()
  readonly = false;
  @Input()
  type = 'text';
  @Input()
  inputAutocomplete = 'off';

  @Output()
  inputFocus: EventEmitter<FocusEvent> = new EventEmitter();
  @Output()
  inputBlur: EventEmitter<FocusEvent> = new EventEmitter();

  @ContentChild('czPrefix', { static: false, read: TemplateRef })
  prefixTpl?: TemplateRef<unknown>;
  @ContentChild('czSuffix', { static: false, read: TemplateRef })
  suffixTpl?: TemplateRef<unknown>;
  @ContentChild(LabelComponent, { static: false, read: LabelComponent })
  labelComponent?: LabelComponent;

  embeddedControl: AbstractControl = new UntypedFormControl();

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  private _label?: string;

  /**
   * @ignore
   */
  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() @Self() private ngControl?: NgControl,
    @Optional() controlContainer?: ControlContainer
  ) {
    super(logger, cdr, controlContainer);

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.controlChanged.complete();
    super.ngOnInit();
    if (this.ngControl) {
      const control = extractControlFromNgControl(this.ngControl) as UntypedFormControl;
      bindControls(control, this.embeddedControl, this.cdr);
    }
  }

  /**
   * `onBlur` update embeddedControl value with `model.trim()` latest value,
   * triggered by @event blur
   */
  onBlur(event: FocusEvent): void {
    this.onModelTouched?.();
    if (!this.model || !this.autoTrim) return;
    if (typeof this.model === 'string') {
      const newVal = this.model.trim();
      if (newVal !== this.model) this.embeddedControl.setValue(newVal);
    }
    this.inputBlur.emit(event);
  }

  /**
   * @ignore
   */
  onFocus(event: FocusEvent, matFormField: MatFormField): void {
    matFormField.updateOutlineGap();
    this.inputFocus.emit(event);
  }
}
