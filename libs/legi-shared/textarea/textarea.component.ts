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
import { ControlContainer, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LEGI_SHARED_OPTIONS_TOKEN, LegiSharedOptions } from '@cognizone/legi-shared/core';
import { ControlComponent, Logger } from '@cognizone/ng-core';

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
  autoTrim: boolean = true;
  @Input()
  hint?: string;
  @Input()
  autosize: boolean = true;

  @ContentChild('czPrefix', { static: false, read: TemplateRef })
  prefixTpl?: TemplateRef<unknown>;
  @ContentChild('czSuffix', { static: false, read: TemplateRef })
  suffixTpl?: TemplateRef<unknown>;

  embeddedControl: FormControl = new FormControl();

  get classicMode(): boolean {
    return this.config.appearance === 'classic';
  }

  constructor(
    @Inject(LEGI_SHARED_OPTIONS_TOKEN) private config: LegiSharedOptions,
    logger: Logger,
    cdr: ChangeDetectorRef,
    @Optional() controlContainer: ControlContainer
  ) {
    super(logger, cdr, controlContainer);
  }

  onBlur(): void {
    if (!this.model || !this.autoTrim) return;
    const newVal = this.model.trim();
    if (newVal !== this.model) this.setModelAndEmit(newVal);
  }
}
