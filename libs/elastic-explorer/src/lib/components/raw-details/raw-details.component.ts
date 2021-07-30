import { ChangeDetectionStrategy, Component, Inject, Provider } from '@angular/core';

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
export class RawDetailsComponent {
  textFilter$ = this.detailViewService.textFilter$;

  constructor(@Inject(DETAIL_VIEW_CONTEXT_TOKEN) public context: DetailViewContext, private detailViewService: DetailViewService) {}
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
