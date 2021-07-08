import { FormControl } from '@angular/forms';

export class DisabledControl extends FormControl {
  constructor() {
    super();
    this.disable();
  }

  enable(): void {
    return;
  }
}
