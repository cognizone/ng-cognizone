import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonModel } from '@cognizone/json-model';
import { GraphService } from '@cognizone/json-model-graph';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelperDefinition } from '@cognizone/shacl/core';
import { GraphFormComponent } from '@cognizone/shacl/form';
import { GraphClient } from 'apps/shacl-form-playground/src/app/core';
import { Observable } from 'rxjs';

import { DetailsData } from '../../resolvers';

@Component({
  selector: 'cz-details',
  templateUrl: './details.view.html',
  styleUrls: ['./details.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoadingService],
})
export class DetailsView extends OnDestroy$ implements OnInit {
  graph!: JsonModel;
  definition!: ShaclHelperDefinition;
  loading$!: Observable<boolean>;

  @ViewChild(GraphFormComponent)
  graphForm!: GraphFormComponent;

  constructor(
    private route: ActivatedRoute,
    private graphClient: GraphClient,
    private graphService: GraphService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    const data: DetailsData = this.route.snapshot.data.detailsData;
    this.graph = data.graph;
    this.definition = data.definition;

    this.loading$ = this.loadingService.loading$;
  }

  save(): void {
    if (this.graphForm.formGroup.valid) {
      this.subSink = this.graphClient
        .save(this.graphService.getLinkedGraphSnapshot(this.graph['@id']), this.definition)
        .pipe(this.loadingService.asOperator())
        .subscribe(() => {
          this.router.navigate(['/']);
          // TODO prompt success
        });
    } else {
      // TODO display error message
      this.graphForm.formGroup.markAllAsTouched();
    }
  }
}
