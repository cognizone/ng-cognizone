import { ChangeDetectionStrategy, Component, Inject, OnInit, Provider } from '@angular/core';
import { JsonModel } from '@cognizone/ng-application-profile';

import {
  DETAIL_VIEW_CONTEXT_TOKEN,
  DETAIL_VIEW_PROVIDER_TOKEN,
  DetailViewContext,
  DetailViewProvider,
} from '../../services/detail-view-provider.service';
import { DetailViewService } from '../../services/detail-view.service';

@Component({
  selector: 'cz-json-model-details',
  templateUrl: './json-model-details.component.html',
  styleUrls: ['./json-model-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonModelDetailsComponent implements OnInit {
  jsonModel!: JsonModel;

  textFilter$ = this.detailViewService.textFilter$;

  constructor(@Inject(DETAIL_VIEW_CONTEXT_TOKEN) private context: DetailViewContext, private detailViewService: DetailViewService) {}

  ngOnInit(): void {
    this.jsonModel = this.context.model.jsonModel as JsonModel;
  }
}

export const jsonModelDetailsViewProvider: Provider = {
  provide: DETAIL_VIEW_PROVIDER_TOKEN,
  multi: true,
  useValue: {
    component: JsonModelDetailsComponent,
    label: 'JsonModel',
    shouldShow: model => !!model.jsonModel,
  } as DetailViewProvider,
};
