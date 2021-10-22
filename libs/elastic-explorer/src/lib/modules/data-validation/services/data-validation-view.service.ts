import { Injectable } from '@angular/core';
import { ResourceGraphRaw } from '@cognizone/application-profile';
import { extractSourcesFromElasticResponse, manyToArray } from '@cognizone/model-utils';
import { LoadingService } from '@cognizone/ng-core';
import { map } from 'rxjs/operators';
import { ElasticClient } from '../../core';
import { ElasticInstanceHandlerService } from '../../elastic-instance';
import { DataError } from '../models/data-error';

@Injectable()
export class DataValidationViewService {
  constructor(
    private elastic: ElasticClient,
    private elasticInstanceHandler: ElasticInstanceHandlerService,
    private loadingService: LoadingService
  ) {}

  generateReport(): void {
    const { control$, response$ } = this.elastic.fromCrawl({
      baseUrl: this.elasticInstanceHandler.getUrl() as string,
      index: this.elasticInstanceHandler.getIndex() as string,
      body: {
        query: {
          bool: {
            must: {
              exists: {
                field: 'data.uri',
              },
            },
          },
        },
      },
    });
    const errors: DataError[] = [];
    this.loadingService.addLoading();
    response$.pipe(map(extractSourcesFromElasticResponse)).subscribe({
      next: response => {
        response.forEach(item => {
          errors.push(...this.computeErrors(item as ResourceGraphRaw));
        });
        control$.next();
      },
      complete: () => {
        this.loadingService.removeLoading();
        const lines = [`"Graph Uri","Node Uri","Property Key","Error Message"`];
        errors.forEach(error => lines.push(`"${error.graphUri}","${error.nodeUri}","${error.propertyKey}","${error.errorMessage}"`));
        download('report.csv', lines.join('\n'));
      },
    });
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
            errorMessage: `${uri} cannot be found in either data or included`,
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
