import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-img-tooltip',
  templateUrl: './img-tooltip.component.html',
  styleUrls: ['./img-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgTooltipComponent extends OnDestroy$ implements OnInit {
  @Input()
  src!: string;

  @Input()
  target?: string;

  @Input()
  style?: unknown;

  @ViewChild('img', { static: true })
  img!: ElementRef<HTMLImageElement>;

  loading?: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.showSpinnerIfLoadingTooLong();

    this.img.nativeElement.onload = () => {
      this.loading = false;
      this.cdr.markForCheck();
    };
  }

  private showSpinnerIfLoadingTooLong(): void {
    timer(500)
      .pipe(
        filter(() => this.loading == null),
        this.untilDestroyed()
      )
      .subscribe(() => {
        this.loading = true;
        this.cdr.markForCheck();
      });
  }
}
