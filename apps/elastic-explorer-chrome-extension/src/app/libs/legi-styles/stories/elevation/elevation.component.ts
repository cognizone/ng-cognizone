import { Component } from '@angular/core';

@Component({
  templateUrl: './elevation.component.html',
  styleUrls: ['./elevation.component.scss'],
})
export class ElevationComponent {
  cols: number[] = new Array(11).fill(0).map((_, index) => index);
}
