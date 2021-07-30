import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { DatePickerModule } from '@cognizone/legi-shared/date-picker';
import { LoggerModule } from '@cognizone/ng-core';
import { TranslocoModule } from '@ngneat/transloco';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/DatePicker',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TranslocoModule,
        LegiSharedModule.forRoot(),
        DatePickerModule,
        LoggerModule.forRoot('storybook'),
      ],
    }),
  ],
};

export const DatePicker1 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-date-picker [label]="label" placeholder="Please pick a date" [formControl]="formControl"></cz-date-picker>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl(null, Validators.required),
    label: 'Pick a date',
  },
});

DatePicker1.story = {
  name: 'basic',
};

export const DatePicker2 = () => ({
  template: `
  <div class="container mt-3">
  <div class="row">
    <div class="col-3">
      <cz-date-picker [label]="label" placeholder="Please pick a date" [formControl]="formControl"></cz-date-picker>
      <div>value: {{ formControl.value }}</div>
    </div>
  </div>
</div>
  `,
  props: {
    label: 'Pick a date',
    formControl: new FormControl(new Date()),
  },
});

DatePicker2.story = {
  name: 'filled',
};

const days = (n: number) => n * 24 * 60 * 60 * 1000;

export const DatePicker3 = () => ({
  template: `
  <div class="container mt-3">
  <div class="row">
    <div class="col-3">
      <cz-date-picker [label]="label" placeholder="Please pick a date" [formControl]="formControl" [min]="min" [max]="max"></cz-date-picker>
      <div>value: {{ formControl.value }}</div>
    </div>
  </div>
</div>
  `,
  props: {
    label: 'Pick a date',
    formControl: new FormControl(new Date()),
    min: new Date(Date.now() - days(7)),
    max: new Date(Date.now() + days(7)),
  },
});

DatePicker3.story = {
  name: 'with min/max',
};

export const DatePicker4 = () => ({
  template: `
  <div class="container mt-3">
  <div class="row">
    <div class="col-3">
      <cz-date-picker [label]="label" placeholder="Please pick a date" [formControl]="formControl" [min]="min" [max]="max"></cz-date-picker>
      <div>value: {{ formControl.value }}</div>
    </div>
  </div>
</div>
  `,
  props: {
    label: 'Disabled date picker',
    formControl: new FormControl({ value: new Date(), disabled: true }),
  },
});

DatePicker4.story = {
  name: 'disabled',
};

export const DatePicker5 = () => ({
  template: `
  <div class="container mt-3">
  <div class="row">
    <div class="col-3">
      <cz-date-picker [readonly]="true" [label]="label" placeholder="Please pick a date" [formControl]="formControl" [min]="min" [max]="max"></cz-date-picker>
      <div>value: {{ formControl.value }}</div>
    </div>
  </div>
</div>
  `,
  props: {
    label: 'Readonly date picker (need to be disabled as well)',
    formControl: new FormControl({ value: new Date(), disabled: true }),
  },
});

DatePicker5.story = {
  name: 'readonly',
};
