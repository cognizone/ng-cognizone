import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-on-push-cd-ref',
  templateUrl: './on-push-cd-ref.component.html',
  styleUrls: ['./on-push-cd-ref.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushCdRefComponent extends OnDestroy$ implements OnInit {
  num!: number;

  templateEvaluations = 0;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    interval(1000)
      .pipe(this.untilDestroyed())
      .subscribe(num => {
        this.num = num;
        this.cdr.markForCheck();
      });
  }

  getDouble(x: number): number {
    ++this.templateEvaluations;
    return 2 * x;
  }
}
