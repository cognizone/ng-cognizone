import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { ControlContainer, FormControl, NgControl } from '@angular/forms';
import { extractControlFromNgControl } from '@cognizone/legi-shared/utils';

@Component({
  selector: 'cz-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent implements OnInit {
  @Input()
  required?: boolean;

  constructor(@Optional() public ngControl: NgControl, @Optional() controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.computeRequired();
  }

  private computeRequired(): void {
    const control = extractControlFromNgControl(this.ngControl);
    if (this.required != null || !control?.validator) return;
    const errors = control.validator(new FormControl());
    if (errors && errors.required) this.required = true;
  }
}
