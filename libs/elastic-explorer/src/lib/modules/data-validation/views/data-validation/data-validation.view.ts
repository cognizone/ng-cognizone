import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingService, Logger, OnDestroy$ } from '@cognizone/ng-core';
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
  isGenerateReportDisabled!: boolean;

  editorOptions: {} = { theme: 'vs-light', language: 'json' };

  code: FormControl = new FormControl(undefined, {
    updateOn: 'blur',
  });

  schema: FormControl = new FormControl(undefined, {
    updateOn: 'blur',
  });

  constructor(
    private route: ActivatedRoute,
    private dataValidationViewService: DataValidationViewService,
    private loadingService: LoadingService,
    private logger: Logger,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.logger.extend('DataValidationView');
  }

  ngOnInit(): void {
    this.dataValidationViewService.onPageLoad(this.route);

    this.subSink = this.dataValidationViewService.elasticQuery$.subscribe(elasticQuery => {
      this.code.setValue(JSON.stringify(elasticQuery, null, 2), { emitEvent: false });
    });
    this.subSink = this.dataValidationViewService.jsonSchema$.subscribe(jsonSchema => {
      this.schema.setValue(JSON.stringify(jsonSchema, null, 2), { emitEvent: false });
    });
    this.subSink = this.dataValidationViewService.isGenerateReportDisabled$.subscribe(isGenerateReportDisabled => {
      this.isGenerateReportDisabled = isGenerateReportDisabled;
    });

    this.subSink = this.code.valueChanges.subscribe(queryString => {
      try {
        const query = JSON.parse(queryString);
        this.dataValidationViewService.setElasticQuery(query);
      } catch {
        (err: unknown) => this.logger.error(err);
      }
    });

    this.subSink = this.schema.valueChanges.subscribe(jsonSchema => {
      try {
        const schema = JSON.parse(jsonSchema);
        this.dataValidationViewService.setJsonSchema(schema);
      } catch {
        (err: unknown) => this.logger.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.dataValidationViewService.onPageUnload();
  }

  generateReport(): void {
    this.dataValidationViewService.generateReport().subscribe(() => this.cdr.markForCheck);
  }
}
