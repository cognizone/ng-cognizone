import { ChangeDetectionStrategy, Component, Inject, OnInit, Provider } from '@angular/core';
import { ApplicationProfile } from '@cognizone/application-profile';
import produce from 'immer';

import {
  DETAIL_VIEW_CONTEXT_TOKEN,
  DETAIL_VIEW_PROVIDER_TOKEN,
  DetailViewContext,
  DetailViewProvider
} from '../../services/detail-view-provider.service';
import { DetailViewService } from '../../services/detail-view.service';
import { getSortedObject } from '../../utils/get-sorted-object';

@Component({
  selector: 'cz-ap-details',
  templateUrl: './ap-details.component.html',
  styleUrls: ['./ap-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApDetailsComponent implements OnInit {
  ap!: ApplicationProfile;

  textFilter$ = this.detailViewService.textFilter$;

  constructor(@Inject(DETAIL_VIEW_CONTEXT_TOKEN) private context: DetailViewContext, private detailViewService: DetailViewService) {}

  ngOnInit(): void {
    const ap = JSON.parse((this.context.model.hit._source as ApHitSource).json) as ApplicationProfile;
    this.ap = produce(ap, draft => {
      draft.types = getSortedObject(draft.types);

      Object.keys(draft.types).forEach(type => {
        draft.types[type].attributes = getSortedObject(draft.types[type].attributes);
      });
    });
  }
}

export const apDetailsViewProvider: Provider = {
  provide: DETAIL_VIEW_PROVIDER_TOKEN,
  multi: true,
  useValue: {
    component: ApDetailsComponent,
    label: 'Ap',
    shouldShow: model => 'json' in (model.hit._source as ApHitSource)
  } as DetailViewProvider
};

interface ApHitSource {
  json: string;
}
