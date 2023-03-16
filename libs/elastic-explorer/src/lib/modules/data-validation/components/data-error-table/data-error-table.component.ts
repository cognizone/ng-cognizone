import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Pagination } from '@cognizone/model-utils';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';

import { DataError } from '../../models/data-error';
import { DataValidationViewService } from '../../services/data-validation-view.service';

@Component({
  selector: 'cz-data-error-table',
  templateUrl: './data-error-table.component.html',
  styleUrls: ['./data-error-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataErrorTableComponent extends OnDestroy$ implements OnInit {
  columns: string[] = ['graphUri', 'nodeUri', 'propertyKey', 'value', 'errorMessage'];

  errors: DataError[] = [];
  loading$: Observable<boolean> = this.loadingService.loading$;

  pagination: Pagination = {
    from: 0,
    size: 10,
  };

  constructor(
    private dataValidationService: DataValidationViewService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.dataValidationService.errors$.subscribe(errors => {
      this.errors = errors;
      this.cdr.markForCheck();
    });
  }

  downloadReport(): void {
    this.dataValidationService.downloadReport();
  }

  onPaginationChange(event: Pagination): void {
    this.pagination = event;
  }
}
