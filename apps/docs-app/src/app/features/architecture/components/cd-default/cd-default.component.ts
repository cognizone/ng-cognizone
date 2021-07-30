import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cd-default',
  templateUrl: './cd-default.component.html',
  styleUrls: ['./cd-default.component.scss'],
})
export class CdDefaultComponent {
  @Input()
  number!: number;

  templateEvaluations = 0;

  getDouble(x: number): number {
    ++this.templateEvaluations;
    return 2 * x;
  }

  onButtonClick(): void {
    // do something
  }
}
