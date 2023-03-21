import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, UntypedFormControl, NgControl } from '@angular/forms';
import { extractControlFromNgControl } from '@cognizone/legi-shared/utils';

/**
 * `LabelComponent` wraps up an HTML content inside a div with a `czls-title`
 */
@Component({
  selector: 'cz-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements OnInit {
  @Input()
  required?: boolean;

  /**
   * @ignore
   */
  constructor(@Optional() public ngControl: NgControl, @Optional() controlContainer: ControlContainer) {}

  /**
   * @ignore
   */
  ngOnInit(): void {
    this.computeRequired();
  }

  /**
   * `computeRequired` checks if the control wrapping cz-label component is required
   */
  private computeRequired(): void {
    const control = extractControlFromNgControl(this.ngControl);
    if (this.required != null || !control?.validator) return;
    const errors = control.validator(new UntypedFormControl());
    if (errors && errors.required) this.required = true;
  }
}
