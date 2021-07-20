import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { InputModule } from '@cognizone/legi-shared/input';
import { LoggerModule } from '@cognizone/ng-core';
import { TranslocoModule } from '@ngneat/transloco';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/cz-input',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslocoModule,
        LegiSharedModule.forRoot(),
        LoggerModule.forRoot('storybook'),
        InputModule
      ]
    })
  ]
};

export const Input1 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3" [formGroup]="formGroup">
          <cz-input [label]="label" placeholder="Jacques" formControlName="name"></cz-input>
          <div>value: {{ formGroup.value | json }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formGroup: new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.email])
    }),
    label: 'Email'
  }
});

Input1.story = {
  name: 'basic'
};

export const Input3 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-input prefixIcon="search" [label]="label" placeholder="Jacques" [formControl]="formControl"></cz-input>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl(null, Validators.required),
    label: 'Name'
  }
});

Input3.story = {
  name: 'with prefix icon'
};

export const Input4 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-input prefixButton="search" [label]="label" placeholder="Jacques" [formControl]="formControl"></cz-input>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl(null, Validators.required),
    label: 'Name'
  }
});

Input4.story = {
  name: 'with prefix button'
};

export const Input2 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-input [readonly]="true" [label]="label" placeholder="Jacques" [formControl]="formControl"></cz-input>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl({ value: null, disabled: true }),
    label: 'Name'
  }
});

Input2.story = {
  name: 'readonly'
};
