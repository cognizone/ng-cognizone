import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { TextareaModule } from '@cognizone/legi-shared/textarea';
import { LoggerModule } from '@cognizone/ng-core';
import { TranslocoModule } from '@ngneat/transloco';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/cz-textarea',
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
        TextareaModule,
      ],
    }),
  ],
};

export const Textarea1 = () => ({
  template: `
    <div class="container mt-3">
      <div class="row">
        <div class="col-3">
          <cz-textarea [label]="label" placeholder="Bla bla bla" [formControl]="formControl"></cz-textarea>
          <div>value: {{ formControl.value }}</div>
        </div>
      </div>
    </div>
  `,
  props: {
    formControl: new FormControl(),
    label: 'Textarea bla bli blou',
  },
});

Textarea1.story = {
  name: 'basic',
};
