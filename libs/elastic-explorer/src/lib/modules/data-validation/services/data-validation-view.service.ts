import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TypedResource, TypedResourceGraph } from '@cognizone/model-utils';
import { downloadBlob, extractSourcesFromElasticResponse, manyToArray, selectProp, SubSink } from '@cognizone/model-utils';
import { LoadingService, Logger } from '@cognizone/ng-core';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { uniqBy } from 'lodash-es';
import Ajv from 'ajv';
import { AnyValidateFunction } from 'ajv/dist/core';

import { ElasticClient } from '../../core';
import { ElasticInstanceHandlerService } from '../../elastic-instance';
import { DataError } from '../models/data-error';
import { AddErrors, SetElasticQuery, SetErrors, SetJsonSchema } from '../store/data-validation.actions';
import { DataValidationStateModel, DATA_VALIDATION_STATE_TOKEN } from '../store/data-validation.state';

@Injectable()
export class DataValidationViewService {
  errors$: Observable<DataError[]> = this.state$.pipe(selectProp('errors'));
  elasticQuery$: Observable<{}> = this.state$.pipe(selectProp('elasticQuery'));
  jsonSchema$: Observable<{}> = this.state$.pipe(selectProp('jsonSchema'));
  validDocsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  invalidDocsCount$: BehaviorSubject<number> = new BehaviorSubject(0);
  docCount: number = 0;
  private subSink: SubSink = new SubSink();
  isGenerateReportDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  ajv = new Ajv();
  latestSchemaReference!: string;

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
    this.initAjv();
    this.linkRouteToState(route);
    this.linkStateToRoute(route);
  }

  onPageUnload(): void {
    this.subSink.empty();
  }

  generateReport(): Observable<unknown> {
    this.store.dispatch(new SetErrors([]));
    const { control$, response$ } = this.elastic.searchAfterCrawl({
      baseUrl: this.elasticInstanceHandler.getUrl() as string,
      index: this.elasticInstanceHandler.getIndex() as string,
      body: this.state.elasticQuery,
    });

    this.loadingService.addLoading();
    this.validDocsCount$.next(0);
    this.invalidDocsCount$.next(0);

    this.docCount = 0;

    const allErrors: DataError[] = [];

    return response$.pipe(map(extractSourcesFromElasticResponse)).pipe(
      tap(response => {
        this.docCount += response.length;
        response.forEach(item => {
          const newErrors = this.computeErrors(item as TypedResourceGraph);
          allErrors.push(...newErrors);

          if (newErrors.length) {
            this.store.dispatch(new AddErrors(newErrors));
          }
        });
        const numberOfDocsWithErrors = uniqBy(allErrors, 'graphUri').length;
        this.invalidDocsCount$.next(numberOfDocsWithErrors);
        this.validDocsCount$.next(this.docCount - numberOfDocsWithErrors);
        control$.next();
        this.matSnackBar.open(`Done processing ${this.docCount} documents, found ${allErrors.length} errors.`, 'Dismiss', {
          duration: 2000,
        });
      }),
      catchError(err => {
        this.logger.error('Failed to crawl elastic index', err);
        this.matSnackBar.open(`Failed to crawl given elastic index`, 'Dismiss', { duration: 2000 });
        throw err;
      }),
      finalize(() => this.loadingService.removeLoading())
    );
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

  setJsonSchema(schema: {}): void {
    this.store.dispatch(new SetJsonSchema(schema));
  }

  private initAjv(): void {
    this.jsonSchema$.subscribe(jsonSchema => {
      this.latestSchemaReference = `typedResource-${Date.now().toString()}`;
      this.ajv.addSchema(jsonSchema, this.latestSchemaReference);
      this.ajv.addFormat('uri', 'uri');
    });
  }

  private computeErrors(graph: TypedResourceGraph): DataError[] {
    const errors: DataError[] = [];
    const graphValidate = this.ajv.getSchema<unknown>(this.latestSchemaReference) as AnyValidateFunction<unknown>;
    if (!graphValidate(graph)) {
      graphValidate.errors?.forEach(error => {
        errors.push({
          graphUri: (graph as TypedResourceGraph).data?.uri,
          errorMessage: error.message ?? '',
        });
      });
    }

    const allNodes = [graph.data, ...(graph.included ?? [])];
    allNodes.forEach(node => {
      const nodeValidate = this.ajv.getSchema<unknown>(this.latestSchemaReference) as AnyValidateFunction<unknown>;
      if (!nodeValidate(node)) {
        nodeValidate.errors?.forEach(error => {
          errors.push({
            graphUri: graph.data.uri,
            nodeUri: (node as TypedResource).uri,
            value: (node as TypedResource).uri,
            errorMessage: error.message ?? '',
          });
        });
      }
      Object.entries(node.references ?? {}).forEach(([key, uris]) =>
        manyToArray(uris).forEach(uri => {
          const referenceNode = allNodes.find(n => n.uri === uri);
          if (!referenceNode) {
            errors.push({
              graphUri: graph.data.uri,
              nodeUri: node.uri,
              propertyKey: key,
              value: uri,
              errorMessage: `value cannot be found in either data or included`,
            });
            return;
          }
          if (!nodeValidate(referenceNode)) {
            nodeValidate.errors?.forEach(error => {
              errors.push({
                graphUri: graph.data.uri,
                nodeUri: (node as TypedResource).uri,
                value: (node as TypedResource).uri,
                errorMessage: error.message ?? '',
              });
            });
          }
          return;
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
          this.isGenerateReportDisabled$.next(!elasticInfo.index);
        } else {
          this.isGenerateReportDisabled$.next(true);
        }
      });
  }

  private linkStateToRoute(route: ActivatedRoute): void {
    this.elasticInstanceHandler.elasticInfo$.subscribe(elasticInfo => {
      const queryParams = this.elasticInstanceHandler.elasticInfoToQueryParams(elasticInfo);
      this.router.navigate([], {
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
