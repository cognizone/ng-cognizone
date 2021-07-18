import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Inject,
  Input,
  OnInit,
  Optional,
  Self,
  TemplateRef
} from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, NgControl } from '@angular/forms';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { extractControlFromNgControl } from '@cognizone/legi-shared/utils';
import { ControlComponent, Logger } from '@cognizone/ng-core';

@Component({
  selector: 'cz-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
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
  autoTrim: boolean = true;
  @Input()
  hint?: string;
  @Input()
  readonly: boolean = false;
  @Input()
  type: string = 'text';
  @Input()
  inputAutocomplete: string = 'off';

  @ContentChild('czPrefix', { static: false, read: TemplateRef })
  prefixTpl?: TemplateRef<unknown>;
  @ContentChild('czSuffix', { static: false, read: TemplateRef })
  suffixTpl?: TemplateRef<unknown>;

  embeddedControl: AbstractControl = new FormControl();

  get legacyMode(): boolean {
    return this.config.appearance === 'legacy';
  }

  private _label?: string;

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

  ngOnInit(): void {
    this.controlChanged.complete();
    super.ngOnInit();
    if (this.ngControl) {
      const control = extractControlFromNgControl(this.ngControl);
      this.embeddedControl.validator = control.validator;
      this.subSink = control.statusChanges.subscribe(() => this.embeddedControl.updateValueAndValidity());
    }
  }

  onBlur(): void {
    if (!this.model || !this.autoTrim) return;
    const newVal = this.model.trim();
    if (newVal !== this.model) this.embeddedControl.setValue(newVal);
  }
}
