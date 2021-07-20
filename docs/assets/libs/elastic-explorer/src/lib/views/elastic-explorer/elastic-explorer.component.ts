import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, TrackByFunction, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { combineLatest, Observable } from 'rxjs';

import { FullModel } from '../../models/full-model';
import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'app-elastic-explorer',
  templateUrl: `./elastic-explorer.component.html`,
  styleUrls: ['./elastic-explorer.component.scss']
})
export class ElasticExplorerComponent extends OnDestroy$ implements OnInit, OnDestroy, AfterViewInit {
  loading$: Observable<boolean> = this.elasticExplorerService.loading$;
  dataSource$: Observable<FullModel[]> = this.elasticExplorerService.models$;
  columns: string[] = ['index', '@uri', '@type', '@label', 'actions'];
  showMenu = true;
  expandedModel?: FullModel;
  total$: Observable<number> = this.elasticExplorerService.total$;
  pagination$: Observable<Pagination> = this.elasticExplorerService.pagination$;

  @ViewChild('modelDetails')
  modelDetailsTemplateRef!: TemplateRef<unknown>;
  manualMode: FormControl = new FormControl(false);
  private isDetailsOpened = false;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private elasticExplorerService: ElasticExplorerService,
    private router: Router
  ) {
    super();
  }

  trackBy: TrackByFunction<FullModel> = (_, model) => model.hit._id;

  ngOnInit(): void {
    this.elasticExplorerService.onViewLoad(this.route);
    this.subSink = this.manualMode.valueChanges.subscribe(manualMode => this.elasticExplorerService.setManualMode(manualMode));
  }

  ngAfterViewInit(): void {
    this.subSink = combineLatest([this.dataSource$, this.route.queryParams]).subscribe(([models, params]) => {
      const { _id } = params;
      if (!_id || this.isDetailsOpened) return;
      const model: FullModel | undefined = models.find(m => m.hit._id === _id);
      if (model) {
        this.seeDetails(model);
      }
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.elasticExplorerService.onViewUnload();
  }

  toggleExpanded(model: FullModel): void {
    this.expandedModel = model === this.expandedModel ? undefined : model;
  }

  seeDetails(model: FullModel): void {
    const dialog = this.dialog.open(this.modelDetailsTemplateRef, { data: model, width: '80vw', height: '80vh' });
    this.isDetailsOpened = true;
    this.subSink = dialog.afterClosed().subscribe(() => {
      this.router.navigate([], {
        queryParams: {
          _id: null
        },
        queryParamsHandling: 'merge'
      });
      this.isDetailsOpened = false;
    });
  }

  onPaginationChange(pagination: Pagination): void {
    this.elasticExplorerService.setPagination(pagination);
  }
}
