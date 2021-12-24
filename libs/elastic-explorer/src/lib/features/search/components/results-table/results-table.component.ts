import { Component, TrackByFunction } from '@angular/core';
import { Pagination } from '@cognizone/legi-shared/list-paginator';
import { OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FullModel } from '../../models/full-model';
import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'cz-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent extends OnDestroy$ {
  columns: string[] = ['index', '@uri', '@type', '@label', 'actions'];

  dataSource$: Observable<FullModel[]> = this.elasticExplorerService.models$;

  total$: Observable<number> = this.elasticExplorerService.total$;

  pagination$: Observable<Pagination> = this.elasticExplorerService.pagination$;

  showPaginator$: Observable<boolean> = this.elasticExplorerService.manualMode$.pipe(map(manualMode => !manualMode));

  trackBy: TrackByFunction<FullModel> = (_, hit) => hit.hit._id;

  constructor(private elasticExplorerService: ElasticExplorerService) {
    super();
  }

  onPaginationChange(pagination: Pagination): void {
    this.elasticExplorerService.setPagination(pagination);
  }
}
