import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { Observable, combineLatest } from 'rxjs';
import { FullModel } from '../../models/full-model';
import { ViewType } from '../../models/view-type';
import { ElasticInstanceHandlerService } from '../../../elastic-instance';
import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'cz-search',
  templateUrl: './search.view.html',
  styleUrls: ['./search.view.scss'],
  providers: [ElasticInstanceHandlerService, ElasticExplorerService],
})
export class SearchView extends OnDestroy$ implements OnInit, AfterViewInit, OnDestroy {
  loading$: Observable<boolean> = this.loadingService.loading$;

  showMenu = true;

  total$: Observable<number> = this.elasticExplorerService.total$;

  @ViewChild('modelDetails')
  modelDetailsTemplateRef!: TemplateRef<unknown>;

  private isDetailsOpened = false;
  viewType?: ViewType;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private elasticExplorerService: ElasticExplorerService,
    private router: Router,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.elasticExplorerService.onPageLoad(this.route);
    this.subSink = this.elasticExplorerService.viewType$.subscribe(viewType => {
      this.viewType = viewType;
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.subSink = combineLatest([this.elasticExplorerService.models$, this.route.queryParams]).subscribe(([models, params]) => {
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
    this.elasticExplorerService.onPageUnload();
  }

  setViewType(event: MatButtonToggleChange): void {
    this.elasticExplorerService.setViewType(event.value);
  }

  seeDetails(model: FullModel): void {
    const dialog = this.dialog.open(this.modelDetailsTemplateRef, { data: model, width: '80vw', height: '80vh' });
    this.isDetailsOpened = true;
    this.subSink = dialog.afterClosed().subscribe(async () => {
      await this.router.navigate([], {
        queryParams: {
          _id: null,
        },
        queryParamsHandling: 'merge',
      });
      this.isDetailsOpened = false;
    });
  }
}
