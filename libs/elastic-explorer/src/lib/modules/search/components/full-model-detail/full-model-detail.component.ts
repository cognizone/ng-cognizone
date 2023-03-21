import { ChangeDetectionStrategy, Component, Inject, Injector, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullModelDetailComponent extends OnDestroy$ implements OnInit, OnChanges, OnDestroy {
  @Input()
  model!: FullModel;

  queryControl: UntypedFormControl = new UntypedFormControl('');

  providers: DetailViewProvider[] = [];

  myInjector!: Injector;

  constructor(
    @Inject(DETAIL_VIEW_PROVIDER_TOKEN) private allProviders: DetailViewProvider[],
    private injector: Injector,
    private detailViewService: DetailViewService,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.queryControl.valueChanges.pipe(debounceTime(100)).subscribe(v => this.detailViewService.setTextFilter(v));
    this.subSink = this.detailViewService.textFilter$.subscribe(v => this.queryControl.setValue(v, { emitEvent: false }));
    this.detailViewService.onPageLoad(this.route);
  }

  ngOnChanges(): void {
    this.providers = this.allProviders.filter(p => p.shouldShow(this.model));
    this.myInjector = Injector.create({
      providers: [
        {
          provide: DETAIL_VIEW_CONTEXT_TOKEN,
          useValue: {
            model: this.model,
          },
        },
      ],
      parent: this.injector,
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.detailViewService.onPageUnload();
  }
}
