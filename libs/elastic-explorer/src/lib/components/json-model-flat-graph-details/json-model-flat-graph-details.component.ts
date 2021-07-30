import { Component, Inject, OnInit, Provider } from '@angular/core';
import { JsonModelFlatGraph } from '@cognizone/ng-application-profile';

import {
  DETAIL_VIEW_CONTEXT_TOKEN,
  DETAIL_VIEW_PROVIDER_TOKEN,
  DetailViewContext,
  DetailViewProvider,
} from '../../services/detail-view-provider.service';
import { DetailViewService } from '../../services/detail-view.service';
import { getSortedObject } from '../../utils/get-sorted-object';

@Component({
  selector: 'cz-json-model-flat-graph-details',
  templateUrl: './json-model-flat-graph-details.component.html',
  styleUrls: ['./json-model-flat-graph-details.component.scss'],
})
export class JsonModelFlatGraphDetailsComponent implements OnInit {
  jsonModelFlatGraph!: JsonModelFlatGraph;

  textFilter$ = this.detailViewService.textFilter$;

  constructor(@Inject(DETAIL_VIEW_CONTEXT_TOKEN) private context: DetailViewContext, private detailViewService: DetailViewService) {}

  ngOnInit(): void {
    if (!this.context.model.jsonModelFlatGraph) return;
    this.jsonModelFlatGraph = { ...this.context.model.jsonModelFlatGraph };
    this.jsonModelFlatGraph.models = getSortedObject(this.jsonModelFlatGraph.models);
  }
}

export const jsonModelFlatGraphDetailsViewProvider: Provider = {
  provide: DETAIL_VIEW_PROVIDER_TOKEN,
  multi: true,
  useValue: {
    component: JsonModelFlatGraphDetailsComponent,
    label: 'JsonModelFlatGraph',
    shouldShow: model => !!model.jsonModelFlatGraph,
  } as DetailViewProvider,
};
