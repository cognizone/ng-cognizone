import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Provider } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';

import {
  DETAIL_VIEW_CONTEXT_TOKEN,
  DETAIL_VIEW_PROVIDER_TOKEN,
  DetailViewContext,
  DetailViewProvider,
} from '../../services/detail-view-provider.service';
import { DetailViewService } from '../../services/detail-view.service';

@Component({
  selector: 'cz-raw-details',
  templateUrl: './raw-details.component.html',
  styleUrls: ['./raw-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RawDetailsComponent extends OnDestroy$ implements OnInit {
  textFilter?: string;

  constructor(
    @Inject(DETAIL_VIEW_CONTEXT_TOKEN) public context: DetailViewContext,
    private detailViewService: DetailViewService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.detailViewService.textFilter$.subscribe(textFilter => {
      this.textFilter = textFilter;
      this.cdr.markForCheck();
    });
  }
}

export const rawDetailsViewProvider: Provider = {
  provide: DETAIL_VIEW_PROVIDER_TOKEN,
  multi: true,
  useValue: {
    component: RawDetailsComponent,
    label: 'Raw',
    shouldShow: () => true,
  } as DetailViewProvider,
};
