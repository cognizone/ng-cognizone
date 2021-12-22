import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { extractControlFromNgControl } from '@cognizone/legi-shared/utils';
import { OnDestroy$ } from '@cognizone/ng-core';

/**
 * `ErrorComponent` lists the errors of a provided control.
 */
@Component({
  selector: 'cz-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent extends OnDestroy$ implements OnInit {
  @Input()
  control!: AbstractControl;

  errors: ValidationError[] = [];

  /**
   * @ignore
   */
  constructor(private cdr: ChangeDetectorRef, @Optional() private ngControl?: NgControl) {
    super();
  }

  /**
   * @ignore
   */
  ngOnInit(): void {
    if (!this.control && this.ngControl) {
      this.control = extractControlFromNgControl(this.ngControl);
    }

    if (this.control.statusChanges) {
      this.computeError();
      this.subSink = this.control.statusChanges.subscribe(() => this.computeError());
    }
  }

  /**
   * @ignore
   */
  private computeError(): void {
    this.errors = Object.entries(this.control.errors ?? {}).map(([key, value]) => ({ key: `global.validation.${key}`, value }));
    this.cdr.markForCheck();
  }
}

type ValidationError = { key: string; value: unknown };
