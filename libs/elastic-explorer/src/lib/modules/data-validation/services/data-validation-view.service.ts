import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  downloadBlob,
  extractSourcesFromElasticResponse,
  manyToArray,
  selectProp,
  SubSink,
  TypedResourceGraph,
} from '@cognizone/model-utils';
import { LoadingService, Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ElasticClient } from '../../core';
import { ElasticInstanceHandlerService } from '../../elastic-instance';
import { DataError } from '../models/data-error';
import { AddErrors, SetElasticQuery, SetErrors } from '../store/data-validation.actions';
import { DataValidationStateModel, DATA_VALIDATION_STATE_TOKEN } from '../store/data-validation.state';

@Injectable()
export class DataValidationViewService {
  errors$: Observable<DataError[]> = this.state$.pipe(selectProp('errors'));
  elasticQuery$: Observable<{}> = this.state$.pipe(selectProp('elasticQuery'));
  private subSink: SubSink = new SubSink();

  constructor(
    private elastic: ElasticClient,
    private elasticInstanceHandler: ElasticInstanceHandlerService,
    private loadingService: LoadingService,
    private router: Router,
    private store: Store,
    private matSnackBar: MatSnackBar,
    private logger: Logger
  ) {
    this.logger = logger.extend('DataValidationViewService');
  }

  onPageLoad(route: ActivatedRoute): void {
    this.linkRouteToState(route);
    this.linkStateToRoute(route);
  }

  onPageUnload(): void {
    this.subSink.empty();
  }

  generateReport(): void {
    this.store.dispatch(new SetErrors([]));
    const { control$, response$ } = this.elastic.searchAfterCrawl({
      baseUrl: this.elasticInstanceHandler.getUrl() as string,
      index: this.elasticInstanceHandler.getIndex() as string,
      body: this.state.elasticQuery,
    });

    this.loadingService.addLoading();
    let docCount = 0;
    let errorCount = 0;
    this.subSink.add = response$.pipe(map(extractSourcesFromElasticResponse)).subscribe({
      next: response => {
        response.forEach(item => {
          ++docCount;
          const newErrors = this.computeErrors(item as TypedResourceGraph);
          errorCount += newErrors.length;
          if (newErrors.length) {
            this.store.dispatch(new AddErrors(newErrors));
          }
        });
        control$.next();
      },
      error: err => {
        this.logger.error('Failed to crawl elastic index', err);
        this.loadingService.removeLoading();
        this.matSnackBar.open(`Failed to crawl given elastic index`, 'Dismiss');
      },
      complete: () => {
        this.loadingService.removeLoading();
        this.matSnackBar.open(`Done processing ${docCount} documents, found ${errorCount} errors.`, 'Dismiss');
      },
    });
  }

  downloadReport(): void {
    const lines = [`"Graph Uri","Node Uri","Property Key","Value","Error Message"`];
    this.state.errors.forEach(error =>
      lines.push(`"${error.graphUri}","${error.nodeUri}","${error.propertyKey}","${error.value}","${error.errorMessage}"`)
    );
    const file = new Blob(
      [
        new Uint8Array([0xef, 0xbb, 0xbf]), // UTF-8 BOM for excel
        lines.join('\n'),
      ],
      { type: 'text/plain' }
    );
    downloadBlob(file, 'report.csv');
  }

  setElasticQuery(elasticQuery: {}): void {
    this.store.dispatch(new SetElasticQuery(elasticQuery));
  }

  private computeErrors(graph: TypedResourceGraph): DataError[] {
    const errors: DataError[] = [];
    const allNodes = [graph.data, ...(graph.included ?? [])];
    allNodes.forEach(node => {
      Object.entries(node.references ?? {}).forEach(([key, uris]) =>
        manyToArray(uris).forEach(uri => {
          if (allNodes.find(n => n.uri === uri)) return;
          errors.push({
            graphUri: graph.data.uri,
            nodeUri: node.uri,
            propertyKey: key,
            value: uri,
            errorMessage: `value cannot be found in either data or included`,
          });
        })
      );
    });

    return errors;
  }

  private linkRouteToState(route: ActivatedRoute): void {
    this.subSink.add = route.queryParams
      .pipe(map(params => this.elasticInstanceHandler.getElasticInfoFromQueryParams(params)))
      .subscribe(elasticInfo => {
        if (elasticInfo) {
          this.elasticInstanceHandler.setElasticInfo(elasticInfo);
        }
      });
  }

  private linkStateToRoute(route: ActivatedRoute): void {
    this.elasticInstanceHandler.elasticInfo$.subscribe(async elasticInfo => {
      const queryParams = this.elasticInstanceHandler.elasticInfoToQueryParams(elasticInfo);
      await this.router.navigate([], {
        relativeTo: route,
        queryParams,
      });
    });
  }

  private get state$(): Observable<DataValidationStateModel> {
    return this.store.select(DATA_VALIDATION_STATE_TOKEN);
  }

  private get state(): DataValidationStateModel {
    return this.store.selectSnapshot(DATA_VALIDATION_STATE_TOKEN);
  }
}
