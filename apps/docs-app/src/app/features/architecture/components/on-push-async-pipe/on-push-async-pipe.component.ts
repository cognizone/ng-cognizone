import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-on-push-async-pipe',
  templateUrl: './on-push-async-pipe.component.html',
  styleUrls: ['./on-push-async-pipe.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushAsyncPipeComponent {
  number$: Observable<string> = interval(1000).pipe(map(i => `${i}`));

  templateEvaluations = 0;

  getDouble(x: number): number {
    ++this.templateEvaluations;
    return 2 * x;
  }
}
