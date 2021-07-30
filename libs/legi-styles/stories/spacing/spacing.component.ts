import { Component } from '@angular/core';

@Component({
  templateUrl: './spacing.component.html',
  styleUrls: ['./spacing.component.scss'],
})
export class SpacingComponent {
  // md: string = md;
  spacings: Spacing[] = [
    {
      name: 0,
      multiplier: 0,
    },
    {
      name: 1,
      multiplier: 0.25,
    },
    {
      name: 2,
      multiplier: 0.5,
    },
    {
      name: 3,
      multiplier: 1,
    },
    {
      name: 4,
      multiplier: 1.5,
    },
    {
      name: 5,
      multiplier: 2,
    },
    {
      name: 6,
      multiplier: 3,
    },
    {
      name: 7,
      multiplier: 4,
    },
    {
      name: 8,
      multiplier: 7.5,
    },
  ];
}

type Spacing = {
  name: number;
  multiplier: number;
};
