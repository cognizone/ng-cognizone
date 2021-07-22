import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnDestroy$ } from '@cognizone/ng-core';
import { debounceTime } from 'rxjs/operators';

import { FullModel } from '../../models/full-model';
import { DETAIL_VIEW_CONTEXT_TOKEN, DETAIL_VIEW_PROVIDER_TOKEN, DetailViewProvider } from '../../services/detail-view-provider.service';
import { DetailViewService } from '../../services/detail-view.service';

@Component({
  selector: 'cz-full-model-detail',
  templateUrl: './full-model-detail.component.html',
  styleUrls: ['./full-model-detail.component.scss'],
  providers: [DetailViewService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullModelDetailComponent extends OnDestroy$ implements OnInit, OnChanges {
  @Input()
  model!: FullModel;
  queryControl: FormControl = new FormControl('');
  providers: DetailViewProvider[] = [];
  myInjector: Injector;

  constructor(
    @Inject(DETAIL_VIEW_PROVIDER_TOKEN) private allProviders: DetailViewProvider[],
    private injector: Injector,
    private detailViewService: DetailViewService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.queryControl.valueChanges.pipe(debounceTime(100)).subscribe(v => this.detailViewService.setTextFilter(v));
  }

  ngOnChanges(): void {
    this.providers = this.allProviders.filter(p => p.shouldShow(this.model));
    this.myInjector = Injector.create({
      providers: [
        {
          provide: DETAIL_VIEW_CONTEXT_TOKEN,
          useValue: {
            model: this.model
          }
        }
      ],
      parent: this.injector
    });
  }
}
