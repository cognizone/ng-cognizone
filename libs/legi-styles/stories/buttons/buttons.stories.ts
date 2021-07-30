import { moduleMetadata } from '@storybook/angular';
import { ButtonsComponent } from './buttons.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// tslint:disable
export default {
  title: 'legi-styles/Buttons',
  component: ButtonsComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonsComponent],
      imports: [CommonModule, MatButtonModule, MatIconModule],
    }),
  ],
};

export const Buttons = () => ({
  component: ButtonsComponent,
  props: {},
});

Buttons.story = {
  name: 'buttons',
};
