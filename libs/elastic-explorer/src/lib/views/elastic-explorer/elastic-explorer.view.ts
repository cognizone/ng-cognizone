import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { combineLatest, Observable } from 'rxjs';

import { FullModel } from '../../models/full-model';
import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'cz-elastic-explorer',
  templateUrl: `./elastic-explorer.view.html`,
  styleUrls: ['./elastic-explorer.view.scss']
})
export class ElasticExplorerView extends OnDestroy$ implements OnInit, OnDestroy, AfterViewInit {
  loading$: Observable<boolean> = this.loadingService.loading$;
  showMenu = true;
  total$: Observable<number> = this.elasticExplorerService.total$;

  @ViewChild('modelDetails')
  modelDetailsTemplateRef!: TemplateRef<unknown>;
  private isDetailsOpened = false;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private elasticExplorerService: ElasticExplorerService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.elasticExplorerService.onPageLoad(this.route);
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
}