import { Component } from '@angular/core';
import { LoadingService } from '@cognizone/ng-core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cz-elastic-explorer',
  templateUrl: './elastic-explorer.view.html',
  styleUrls: ['./elastic-explorer.view.scss'],
  providers: [LoadingService],
})
export class ElasticExplorerView {
  loading$: Observable<boolean> = this.loadingService.loading$;

  showMenu = true;

  viewType?: string;

  constructor(private loadingService: LoadingService) {}
}
