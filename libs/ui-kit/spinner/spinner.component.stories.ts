/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-default-export */
import { Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';

export default {
  title: 'SpinnerComponent',
  component: SpinnerComponent,
  argTypes: {
    size: {
      name: 'Size ("--size" css variable)',
      description: 'Size of the spinner.',
      defaultValue: '20px',
      control: {
        type: 'text',
      },
    },
    color: {
      name: 'Color ("--color" css variable)',
      description: 'Forefront color of the spinner.',
      defaultValue: 'var(--cz-color-primary, #007bff)',
      control: {
        type: 'color',
      },
    },
    bgColor: {
      name: 'Background Color ("--color-background" css variable)',
      description: 'Background color of the spinner.',
      defaultValue: '#ccc',
      control: {
        type: 'color',
      },
    },
  },
} as Meta<SpinnerComponent>;

const Template: Story<SpinnerComponent> = (args: SpinnerComponent) => ({
  props: args,
  moduleMetadata: {
    imports: [CommonModule],
  },
  template: `
    <cz-spinner [style.--size]="size" [style.--color]="color" [style.--color-background]="bgColor"></cz-spinner>
  `,
});

export const Primary = Template.bind({});
Primary.args = {};
