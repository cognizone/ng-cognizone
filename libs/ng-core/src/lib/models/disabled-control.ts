import { UntypedFormControl } from '@angular/forms';

export class DisabledControl extends UntypedFormControl {
  constructor() {
    super();
    this.disable();
  }

  enable(): void {
    return;
  }
}
