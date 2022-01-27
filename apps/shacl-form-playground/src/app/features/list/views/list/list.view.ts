import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaczShapesGraph } from '@cognizone/shacl/core';
import { GraphClient } from 'apps/shacl-form-playground/src/app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cz-list',
  templateUrl: './list.view.html',
  styleUrls: ['./list.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListView extends OnDestroy$ implements OnInit {
  graphs$: Observable<JsonModel[]> = this.graphClient.search(undefined);
  shapesGraph?: ShaczShapesGraph;

  constructor(private graphClient: GraphClient, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.graphClient.shapesGraph$.subscribe(shapesGraph => {
      this.shapesGraph = shapesGraph;
      this.cdr.markForCheck();
    });
  }
}
