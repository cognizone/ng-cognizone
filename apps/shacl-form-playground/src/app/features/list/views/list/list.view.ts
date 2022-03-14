import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { JsonModel } from '@cognizone/json-model';
import { SelectOption } from '@cognizone/model-utils';
import { LoadingService, OnDestroy$ } from '@cognizone/ng-core';
import { GraphClient } from '@shfp/core';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'cz-list',
  templateUrl: './list.view.html',
  styleUrls: ['./list.view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoadingService],
})
export class ListView extends OnDestroy$ implements OnInit {
  typeControl: FormControl = new FormControl();
  graphs$!: Observable<JsonModel[]>;
  rootTypes$: Observable<string[]> = this.graphClient.getAllRootTypes();
  loading: boolean = true;
  typeOptions$: Observable<SelectOption[]> = this.graphClient
    .getAllRootTypes()
    .pipe(map(types => types.map(type => ({ value: type, label: type }))));

  constructor(private graphClient: GraphClient, private loadingService: LoadingService, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.initGraphs();
    this.subSink = this.loadingService.loading$.subscribe(loading => {
      this.loading = loading;
      this.cdr.markForCheck();
    });
  }

  private initGraphs(): void {
    this.graphs$ = this.typeControl.valueChanges.pipe(
      startWith(undefined),
      switchMap(type => this.graphClient.search(undefined, type).pipe(this.loadingService.asOperator()))
    );
  }
}
