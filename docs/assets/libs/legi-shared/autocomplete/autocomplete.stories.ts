import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteModule } from '@cognizone/legi-shared/autocomplete';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { SelectOption } from '@cognizone/model-utils';
import { LoggerModule } from '@cognizone/ng-core';
import { TranslocoModule } from '@ngneat/transloco';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/cz-autocomplete',
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
        AutocompleteModule
      ]
    })
  ]
};

const options: SelectOption[] = [
  {
    value: '1',
    label: {
      en: ['bonjour']
    }
  },
  {
    value: '2',
    label: {
      en: ['hello']
    }
  }
];

export const Autocomplete1 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-autocomplete [options]="options" [label]="label" placeholder="Please pick a value" [formControl]="formControl"></cz-autocomplete>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl(),
    label: 'Pick a value',
    options
  }
});

Autocomplete1.story = {
  name: 'simple'
};

export const Autocomplete2 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-autocomplete [multi]="true" [label]="label" placeholder="Please pick a value" [formControl]="formControl"></cz-autocomplete>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl(),
    label: 'Pick a value'
  }
});

Autocomplete2.story = {
  name: 'multi'
};
