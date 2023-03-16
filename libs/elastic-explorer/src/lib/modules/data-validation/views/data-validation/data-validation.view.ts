import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { ElasticInstanceHandlerService } from '../../../elastic-instance';
import { DataError } from '../../models/data-error';
import { DataValidationViewService } from '../../services/data-validation-view.service';

@Component({
  selector: 'cz-data-validation',
  templateUrl: './data-validation.view.html',
  styleUrls: ['./data-validation.view.scss'],
  providers: [ElasticInstanceHandlerService, DataValidationViewService],
})
export class DataValidationView extends OnDestroy$ implements OnInit, OnDestroy {
  errors$: Observable<DataError[]> = this.dataValidationViewService.errors$;
  loading$: Observable<boolean> = this.loadingService.loading$;

  editorOptions: {} = { theme: 'vs-light', language: 'json' };

  code: UntypedFormControl = new UntypedFormControl(undefined, {
    updateOn: 'blur',
  });

  constructor(
    private route: ActivatedRoute,
    private dataValidationViewService: DataValidationViewService,
    private loadingService: LoadingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataValidationViewService.onPageLoad(this.route);

    this.subSink = this.dataValidationViewService.elasticQuery$.subscribe(elasticQuery => {
      this.code.setValue(JSON.stringify(elasticQuery, null, 2), { emitEvent: false });
    });

    this.subSink = this.code.valueChanges.subscribe(queryString => {
      try {
        const query = JSON.parse(queryString);
        this.dataValidationViewService.setElasticQuery(query);
      } catch {
        /* empty on purpose */
      }
    });
  }

  ngOnDestroy(): void {
    this.dataValidationViewService.onPageUnload();
  }

  generateReport(): void {
    this.dataValidationViewService.generateReport();
  }
}
