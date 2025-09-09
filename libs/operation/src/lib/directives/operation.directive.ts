import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { DEVTOOLS_ENABLED_TOKEN } from '@cognizone/devtools';
import { Nil } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Operation, OperationGroupDescription } from '../models/operation';
import { OperationDebug } from '../services/operation-debug.service';
import { OperationUtils } from '../services/operation-utils.service';
import { OperationsService } from '../services/operations.service';

import { OperationGroupDirective } from './operation-group.directive';

@Directive({
  selector: '[czOperation]',
  exportAs: 'czOperation',
  providers: [OperationDebug],
  standalone: true,
})
export class OperationDirective extends OnDestroy$ implements OnInit, OnChanges {
  @Input('czOperation')
  id!: string;

  @Output()
  operationChange: EventEmitter<OperationChangeEvent> = new EventEmitter();

  get operation$(): Observable<Nil<Operation>> {
    return this._operation$.asObservable();
  }

  operation?: Operation;

  private _operation$: Subject<Nil<Operation>> = new BehaviorSubject<Nil<Operation>>(null);

  private id$: Subject<string> = new ReplaySubject(1);

  private elRef = inject(ElementRef<HTMLElement>);
  private operationUtils = inject(OperationUtils);
  private devtoolsEnabled = inject(DEVTOOLS_ENABLED_TOKEN);
  private parent = inject(OperationGroupDirective);
  private cdr = inject(ChangeDetectorRef);
  private operationsService = inject(OperationsService);
  private operationDebug = inject(OperationDebug);

  ngOnInit(): void {
    this.initOperation();
    this.initDebug();
  }

  ngOnChanges(): void {
    this.id$.next(this.id);
  }

  private initOperation(): void {
    const path$ = this.parent.path$;
    const operations$ = this.operationsService.groups$;

    this.subSink = combineLatest([operations$, path$, this.id$])
      .pipe(
        map(([operations, path, id]) => {
          const operation = this.operationUtils.getOperation(operations, path, id);
          return { path, operation };
        })
      )
      .subscribe(result => {
        this.operation = result.operation;
        this._operation$.next(result.operation);
        this.operationChange.emit(result);
        this.cdr.markForCheck();
      });
  }

  private initDebug(): void {
    if (!this.devtoolsEnabled) return;
    this.operationDebug.init({
      el: this.elRef.nativeElement,
      operationId: this.id,
      operation$: this.operation$,
      path$: this.parent.path$,
    });
  }
}

export interface OperationChangeEvent {
  path: OperationGroupDescription[];
  operation?: Operation;
}
