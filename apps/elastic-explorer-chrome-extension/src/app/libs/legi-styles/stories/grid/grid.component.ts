import { Component } from '@angular/core';

@Component({
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  cols: number[] = new Array(12).fill(0);
}
