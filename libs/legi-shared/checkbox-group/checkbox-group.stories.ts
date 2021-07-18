import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxGroupModule } from '@cognizone/legi-shared/checkbox-group';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { SelectOption } from '@cognizone/model-utils';
import { LoggerModule } from '@cognizone/ng-core';
import { TranslocoModule } from '@ngneat/transloco';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/cz-checkbox-group',
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
        CheckboxGroupModule
      ]
    })
  ]
};

const options: SelectOption[] = [
  {
    value: '1',
    label: {
      en: ['Hello you']
    }
  },
  {
    value: '2',
    label: {
      en: ['How you doing?']
    }
  }
];

export const CheckboxGroup1 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-checkbox-group 
            [label]="label" placeholder="Please pick a value" 
            [formControl]="formControl"
            [options]="options">
          </cz-checkbox-group>
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

CheckboxGroup1.story = {
  name: 'direction column (default)'
};

export const CheckboxGroup2 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-checkbox-group 
            [label]="label" placeholder="Please pick a value" 
            [formControl]="formControl" 
            direction="row"
            [options]="options">
          </cz-checkbox-group>
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

CheckboxGroup2.story = {
  name: 'direction row'
};
