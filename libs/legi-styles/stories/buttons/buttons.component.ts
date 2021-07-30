import { Component } from '@angular/core';

@Component({
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  trueOrFalse: boolean[] = [false, true];
}
