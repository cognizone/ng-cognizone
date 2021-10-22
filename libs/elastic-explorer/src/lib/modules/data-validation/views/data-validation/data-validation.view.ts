import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '@cognizone/ng-core';
import { ElasticInstanceHandlerService } from '../../../elastic-instance';
import { DataValidationViewService } from '../../services/data-validation-view.service';

@Component({
  selector: 'cz-data-validation',
  templateUrl: './data-validation.view.html',
  styleUrls: ['./data-validation.view.scss'],
  providers: [ElasticInstanceHandlerService, DataValidationViewService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataValidationView implements OnInit {
  loading?: boolean;

  constructor(
    private dataValidationViewService: DataValidationViewService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(loading => {
      this.loading = loading;
      this.cdr.markForCheck();
    });
  }

  generateReport(): void {
    this.dataValidationViewService.generateReport();
  }
}
