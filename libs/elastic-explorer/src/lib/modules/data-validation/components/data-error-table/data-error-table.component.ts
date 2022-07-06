import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagination } from '@cognizone/model-utils';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { ElasticInstanceHandlerService } from '../../../elastic-instance';
import { DataError } from '../../models/data-error';
import { DataValidationViewService } from '../../services/data-validation-view.service';

@Component({
  selector: 'cz-data-error-table',
  templateUrl: './data-error-table.component.html',
  styleUrls: ['./data-error-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataErrorTableComponent extends OnDestroy$ implements OnInit {
  columns: string[] = ['graphUri', 'nodeUri', 'propertyKey', 'value', 'errorMessage', 'Actions'];

  errors: DataError[] = [];
  validDocsCount!: number;
  invalidDocsCount!: number;
  dataSource!: MatTableDataSource<DataError>;
  loading$: Observable<boolean> = this.loadingService.loading$;

  pagination: Pagination = {
    from: 0,
    size: 10,
  };
  queryParams?: Params;

  constructor(
    private dataValidationService: DataValidationViewService,
    private loadingService: LoadingService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.dataValidationService.errors$.subscribe(errors => {
      this.errors = errors;
      this.dataSource = new MatTableDataSource(this.errors);

      this.cdr.markForCheck();
    });
    this.subSink = this.dataValidationService.validDocsCount$.subscribe(validDocsCount => {
      this.validDocsCount = validDocsCount;
      this.cdr.markForCheck();
    });
    this.subSink = this.dataValidationService.invalidDocsCount$.subscribe(invalidDocsCount => {
      this.invalidDocsCount = invalidDocsCount;
      this.cdr.markForCheck();
    });
    this.subSink = this.route.queryParams.subscribe(queryParams => {
      this.queryParams = queryParams;
    });
  }

  downloadReport(): void {
    this.dataValidationService.downloadReport();
  }

  onPaginationChange(event: Pagination): void {
    this.pagination = event;
  }
}
