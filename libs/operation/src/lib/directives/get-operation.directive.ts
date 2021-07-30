import { ChangeDetectorRef, Directive, EmbeddedViewRef, Inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DEVTOOLS_ENABLED_TOKEN } from '@cognizone/devtools';
import { Many, manyToArray, Nil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { BehaviorSubject, combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

import { Operation, OperationGroupDescription, OperationGroupDescriptionLike } from '../models/operation';
import { OperationDebug } from '../services/operation-debug.service';
import { OperationUtils } from '../services/operation-utils.service';
import { OperationsService } from '../services/operations.service';

import { OperationGroupDirective } from './operation-group.directive';

@Directive({
  selector: '[czGetOperation]',
  providers: [OperationDebug],
})
export class GetOperationDirective extends OnDestroy$ implements OnInit {
  @Input('czGetOperation')
  set id(value: string) {
    this.id$.next(value);
  }

  @Input('czGetOperationPath')
  set path(value: Many<OperationGroupDescriptionLike> | undefined) {
    const path = value ? manyToArray(value) : [];
    this.path$.next(path.map(part => (typeof part === 'string' ? { id: part } : part)));
  }

  private id$: Subject<string> = new ReplaySubject(1);

  private path$: Subject<OperationGroupDescription[]> = new BehaviorSubject<OperationGroupDescription[]>([]);

  private fullPath$!: Observable<OperationGroupDescription[]>;

  private ref?: EmbeddedViewRef<GetOperationContext>;

  private operation$!: Observable<Nil<Operation>>;

  constructor(
    private templateRef: TemplateRef<GetOperationContext>,
    private operationUtils: OperationUtils,
    private parent: OperationGroupDirective,
    private cdr: ChangeDetectorRef,
    private operationsService: OperationsService,
    private vcr: ViewContainerRef,
    private operationDebug: OperationDebug,
    @Inject(DEVTOOLS_ENABLED_TOKEN) private devtoolsEnabled: boolean
  ) {
    super();
  }

  ngOnInit(): void {
    this.initOperation();
    this.initDebug();
  }

  private initOperation(): void {
    const operations$ = this.operationsService.groups$;
    this.fullPath$ = combineLatest([this.parent?.path$ ?? of([]), this.path$]).pipe(map(([parentPath, path]) => [...parentPath, ...path]));

    this.operation$ = combineLatest([operations$, this.fullPath$, this.id$]).pipe(
      debounceTime(0),
      map(([operations, path, id]) => this.operationUtils.getOperation(operations, path, id)),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.subSink = this.operation$.subscribe(operation => {
      if (!this.ref) {
        this.vcr.clear();
        this.ref = this.vcr.createEmbeddedView(this.templateRef, { $implicit: operation, operation });
      } else {
        this.ref.context.$implicit = operation;
        this.ref.context.operation = operation;
      }
      this.cdr.markForCheck();
    });
  }

  private initDebug(): void {
    if (!this.devtoolsEnabled) return;
    this.operationDebug.init({
      el: this.ref?.rootNodes[0],
      operationId: this.id,
      operation$: this.operation$,
      path$: this.fullPath$,
    });
  }
}

interface GetOperationContext {
  $implicit: Nil<Operation>;
  operation: Nil<Operation>;
}
