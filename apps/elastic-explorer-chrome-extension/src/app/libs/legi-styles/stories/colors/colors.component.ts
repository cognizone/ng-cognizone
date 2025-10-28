import { Component } from '@angular/core';

@Component({
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent {
  colorGroups: ColorGroup[] = [
    {
      label: 'Surfaces',
      colors: [
        {
          value: '#ffffff',
          label: 'White',
          var: '$czls-color-white',
        },
      ],
    },
    {
      label: 'Primary and Secondary colors',
      colors: [
        { label: 'Primary color', value: '#4a90e2', var: '$czls-color-primary' },
        { label: 'Active state', value: '#3a73b6', var: '$czls-color-primary-active' },
        { label: 'Hover', value: '#50a0ff', var: '$czls-color-primary-hovered' },
        { label: 'Primary light', value: '#e4f1fc', var: '$czls-color-primary-background-light' },
      ],
    },
    {
      label: 'Status colors',
      colors: [
        { label: 'Success', value: '#00bfa5', var: '$czls-color-success' },
        { label: 'Warning', value: '#ffc400', var: '$czls-color-warning' },
        { label: 'Error', value: '#ef3340', var: '$czls-color-error' },
      ],
    },
    {
      label: 'Text colors',
      colors: [
        { label: 'High emphasis', value: 'rgba(0, 0, 0, 0.87)', var: '$czls-font-color-high' },
        { label: 'Medium emphasis', value: 'rgba(0, 0, 0, 0.6)', var: '$czls-font-color-medium' },
        { label: 'Disabled', value: 'rgba(0, 0, 0, 0.38)', var: '$czls-font-color-disabled' },
      ],
    },
    {
      label: 'Borders',
      colors: [{ label: 'Borders', value: 'rgba(0, 0, 0, 0.12)', var: '$czls-border-color' }],
    },
    {
      label: 'Others',
      colors: [
        { label: 'Off white', value: '#fafafa', var: '$czls-color-off-white' },
        { label: 'Light grey', value: 'rgba(0, 0, 0, 0.08)', var: '$czls-color-light-grey' },
        { label: 'Grey', value: 'rgba(0, 0, 0, 0.12)', var: '$czls-color-grey or $czls-color-hovered' },
        { label: 'Grey', value: '#eeeeee', var: '$czls-background-color-disabled' },
        { label: 'Highlight', value: '#faffa8', var: '$czls-color-highlight' },
        { label: 'Black', value: '#000000', var: '$czls-color-black' },
      ],
    },
  ];
}

type Color = {
  var: string;
  value: string;
  label: string;
};

type ColorGroup = {
  colors: Color[];
  label: string;
};
