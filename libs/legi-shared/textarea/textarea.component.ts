import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  forwardRef,
  Inject,
  Input,
  Optional,
  TemplateRef,
} from '@angular/core';
import { ControlContainer, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { LabelComponent } from '@cognizone/legi-shared/label';
import { ControlComponent, Logger } from '@cognizone/ng-core';

/**
 * `TextareaComponent` uses a standard textarea, with customized parameters and properties,
 * like label and placeholder, passed as `@Input()` by the app that uses the component.
 *  the component text entry is connected to an embeddedControl, and every change
 *  on the text entered, should reflect on the control value.
 * This component has 2 modes, classic and urban, which determine it's appearance
 *  appearance config should be passed in app.module
 */
@Component({
  selector: 'cz-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent extends ControlComponent<string> {
  @Input()
  placeholder?: string;
  @Input()
  label?: string;
  @Input()
  autoTrim = true;
  @Input()
  hint?: string;
  @Input()
  autosize = true;

  @ContentChild('czPrefix', { static: false, read: TemplateRef })
  prefixTpl?: TemplateRef<unknown>;
  @ContentChild('czSuffix', { static: false, read: TemplateRef })
  suffixTpl?: TemplateRef<unknown>;
  @ContentChild(LabelComponent, { static: false, read: LabelComponent })
  labelComponent?: LabelComponent;

  embeddedControl: UntypedFormControl = new UntypedFormControl();

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  /**
   * @ignore
   */
  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  /**
   * `onBlur` update embeddedControl value with `model.trim()` latest value
   *  triggered by @event blur
   */
  onBlur(): void {
    if (!this.model || !this.autoTrim) return;
    const newVal = this.model.trim();
    if (newVal !== this.model) this.setModelAndEmit(newVal);
  }
}
