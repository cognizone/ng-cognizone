import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Provider } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';

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
export class JsonModelDetailsComponent extends OnDestroy$ implements OnInit {
  jsonModel!: JsonModel;

  textFilter?: string;

  constructor(
    @Inject(DETAIL_VIEW_CONTEXT_TOKEN) private context: DetailViewContext,
    private detailViewService: DetailViewService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.jsonModel = this.context.model.jsonModel as JsonModel;
    this.subSink = this.detailViewService.textFilter$.subscribe(textFilter => {
      this.textFilter = textFilter;
      this.cdr.markForCheck();
    });
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
