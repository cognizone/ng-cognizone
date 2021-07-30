import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
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
  selector: '[czIfOperation]',
  providers: [OperationDebug],
})
export class IfOperationDirective extends OnDestroy$ implements OnInit {
  @Input('czIfOperation')
  set id(value: string) {
    this.id$.next(value);
  }

  @Input('czIfOperationPath')
  set path(value: Many<OperationGroupDescriptionLike> | undefined) {
    const path = value ? manyToArray(value) : [];
    this.path$.next(path.map(part => (typeof part === 'string' ? { id: part } : part)));
  }

  @Input('czIfOperationElse')
  set else(value: TemplateRef<unknown> | undefined) {
    this.else$.next(value ?? null);
  }

  private id$: Subject<string> = new ReplaySubject(1);

  private path$: Subject<OperationGroupDescription[]> = new BehaviorSubject<OperationGroupDescription[]>([]);

  private fullPath$!: Observable<OperationGroupDescription[]>;

  private else$: Subject<TemplateRef<unknown> | null> = new BehaviorSubject<TemplateRef<unknown> | null>(null);

  private operation$!: Observable<Nil<Operation>>;

  private ref?: EmbeddedViewRef<unknown>;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private operationUtils: OperationUtils,
    private cdr: ChangeDetectorRef,
    private operationsService: OperationsService,
    private vcr: ViewContainerRef,
    private operationDebug: OperationDebug,
    @Inject(DEVTOOLS_ENABLED_TOKEN) private devtoolsEnabled: boolean,
    @Optional() private parent?: OperationGroupDirective
  ) {
    super();
  }

  ngOnInit(): void {
    this.initOperation();
    this.initDebug();
  }

  private initOperation(): void {
    this.fullPath$ = combineLatest([this.parent?.path$ ?? of([]), this.path$]).pipe(map(([parentPath, path]) => [...parentPath, ...path]));

    this.operation$ = combineLatest([this.operationsService.groups$, this.fullPath$, this.id$]).pipe(
      debounceTime(0),
      map(([operations, path, id]) => this.operationUtils.getOperation(operations, path, id)),
      shareReplay(1)
    );
    const enabled$ = this.operation$.pipe(
      map(operation => operation?.enabled ?? false),
      distinctUntilChanged()
    );
    this.subSink = combineLatest([enabled$, this.else$.asObservable()]).subscribe(([enabled, elseTemplate]) => {
      this.vcr.clear();
      if (enabled) {
        this.ref = this.vcr.createEmbeddedView(this.templateRef);
      } else if (elseTemplate) {
        this.ref = this.vcr.createEmbeddedView(elseTemplate);
      } else {
        this.ref = undefined;
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
