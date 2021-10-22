import { Injectable } from '@angular/core';
import { ResourceGraphRaw } from '@cognizone/application-profile';
import { extractSourcesFromElasticResponse, manyToArray } from '@cognizone/model-utils';
import { LoadingService } from '@cognizone/ng-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ElasticClient } from '../../core';
import { ElasticInstanceHandlerService } from '../../elastic-instance';
import { DataError } from '../models/data-error';

@Injectable()
export class DataValidationViewService {
  private _baseElasticQuery$: BehaviorSubject<{}> = new BehaviorSubject<{}>({
    query: {
      bool: {
        must: {
          exists: {
            field: 'data.uri',
          },
        },
      },
    },
    _source: {
      excludes: ['facets'],
    },
  });

  private _dataErrors$: BehaviorSubject<DataError[]> = new BehaviorSubject<DataError[]>([]);

  constructor(
    private elastic: ElasticClient,
    private elasticInstanceHandler: ElasticInstanceHandlerService,
    private loadingService: LoadingService
  ) {}

  get baseElasticQuery$(): Observable<{}> {
    return this._baseElasticQuery$.asObservable();
  }

  get dataErrors$(): Observable<DataError[]> {
    return this._dataErrors$.asObservable();
  }

  generateReport(): void {
    this._dataErrors$.next([]);
    const { control$, response$ } = this.elastic.simpleCrawl({
      baseUrl: this.elasticInstanceHandler.getUrl() as string,
      index: this.elasticInstanceHandler.getIndex() as string,
      body: this._baseElasticQuery$.value,
    });
    this.loadingService.addLoading();
    response$.pipe(map(extractSourcesFromElasticResponse)).subscribe({
      next: response => {
        const errors: DataError[] = [];
        response.forEach(item => {
          errors.push(...this.computeErrors(item as ResourceGraphRaw));
        });
        if (errors.length) {
          this._dataErrors$.next([...this._dataErrors$.value, ...errors]);
        }
        control$.next();
      },
      complete: () => {
        this.loadingService.removeLoading();
        const lines = [`"Graph Uri","Node Uri","Property Key","Property Value","Error Message"`];
        this._dataErrors$.value.forEach(error =>
          lines.push(`"${error.graphUri}","${error.nodeUri}","${error.propertyKey}","${error.value}","${error.errorMessage}"`)
        );
        download('report.csv', lines.join('\n'));
      },
    });
  }

  setBaseElasticQuery(value: {}): void {
    this._baseElasticQuery$.next(value);
  }

  private computeErrors(graph: ResourceGraphRaw): DataError[] {
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
            errorMessage: `Given uri cannot be found in nodes present in either data or included`,
          });
        })
      );
    });

    return errors;
  }
}

function download(filename: string, text: string): void {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
