import { Component } from '@angular/core';

@Component({
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss'],
})
export class TypographyComponent {
  modifiers: Modifier[] = [
    { className: '', label: 'Default' },
    { className: 'is-medium-emphasis', label: 'Medium emphasis' },
    { className: 'is-high-emphasis', label: 'High emphasis' },
    { className: 'is-disabled', label: 'Disabled' },
  ];
  typographies: Typography[] = [
    {
      className: 'czls-h1',
      selector: '.czls-h1, h1',
      label: 'h1',
    },
    {
      className: 'czls-h2',
      selector: '.czls-h2, h2',
      label: 'h2',
    },
    {
      className: 'czls-h3',
      selector: '.czls-h3, h3',
      label: 'h3',
    },
    {
      className: 'czls-h4',
      selector: '.czls-h4, h4',
      label: 'h4',
    },
    {
      className: 'czls-h5',
      selector: '.czls-h5, h5',
      label: 'h5',
    },
    {
      className: 'czls-title',
      label: 'title',
    },
    {
      className: 'czls-body-1',
      selector: '.czls-body-1, body',
      label: 'Body 1',
    },
    {
      className: 'czls-body-2',
      label: 'Body 2',
    },
    {
      className: 'czls-caption',
      label: 'Caption',
    },
    {
      className: 'czls-overline',
      label: 'Overline',
    },
    {
      className: 'czls-btn',
      label: 'Button',
    },
  ];
}

type Typography = {
  className: string;
  selector?: string;
  label: string;
};

type Modifier = {
  className: string;
  label: string;
};
