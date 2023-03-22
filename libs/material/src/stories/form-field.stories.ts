// Button.stories.ts

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Meta, Story } from '@storybook/angular';

@Component({
  template: `
    <mat-form-field appearance="outline">
      <mat-label>An Awesome Label</mat-label>
      <input matInput placeholder="First name" />
    </mat-form-field>
  `,
  imports: [MatInputModule, MatFormFieldModule],
  standalone: true,
})
class Button {}

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Mat form field',
  component: Button,
} as Meta;

export const Primary: Story = () => ({
  props: {
    label: 'Button',
    primary: true,
  },
});
