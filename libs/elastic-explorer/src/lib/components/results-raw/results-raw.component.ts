import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ElasticSearchResponse, mapElasticSources, Nil } from '@cognizone/model-utils';
import { map } from 'rxjs/operators';
import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'cz-results-raw',
  templateUrl: './results-raw.component.html',
  styleUrls: ['./results-raw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsRawComponent extends OnDestroy$ implements OnInit {
  response: Nil<ElasticSearchResponse<unknown>>;

  constructor(private elasticExplorerService: ElasticExplorerService, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.elasticExplorerService.elasticResponse$
      .pipe(map(response => (response ? mapElasticSources(response, model => model.hit) : response)))
      .subscribe(response => {
        this.response = response;
        this.cdr.markForCheck();
      });
  }
}
