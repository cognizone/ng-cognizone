import { LegiSharedModule } from '@cognizone/legi-shared/core';
import { LabelModule } from '@cognizone/legi-shared/label';
import { LoggerModule } from '@cognizone/ng-core';
import { moduleMetadata } from '@storybook/angular';

// tslint:disable
export default {
  title: 'legi-shared/cz-label',
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [LegiSharedModule.forRoot(), LoggerModule.forRoot('storybook'), LabelModule],
    }),
  ],
};

export const Label1 = () => ({
  template: `
    <cz-label>Hello</cz-label>
  `,
  props: {},
});

Label1.story = {
  name: 'basic',
};
