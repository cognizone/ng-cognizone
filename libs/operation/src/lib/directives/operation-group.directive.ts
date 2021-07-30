import {
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SkipSelf,
} from '@angular/core';
import { DEVTOOLS_ENABLED_TOKEN } from '@cognizone/devtools';
import { OnDestroy$ } from '@cognizone/ng-core';
import { combineLatest, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { OperationGroupDescription } from '../models/operation';
import { OperationGroupDebug } from '../services/operation-group-debug.service';

@Directive({
  selector: '[czOperationGroup]',
  providers: [OperationGroupDebug],
})
export class OperationGroupDirective extends OnDestroy$ implements OnInit, OnChanges, OnDestroy {
  @Input('czOperationGroup')
  groupId!: string;

  @Input('czOperationGroupUri')
  uri?: string;

  @Output()
  pathChange: EventEmitter<OperationGroupDescription[]> = new EventEmitter();

  path$!: Observable<OperationGroupDescription[]>;

  private description$: Subject<OperationGroupDescription> = new ReplaySubject(1);

  constructor(
    private elRef: ElementRef<HTMLElement>,
    @Inject(DEVTOOLS_ENABLED_TOKEN) private devtoolsEnabled: boolean,
    private operationGroupDebug: OperationGroupDebug,
    @SkipSelf()
    @Optional()
    private parent?: OperationGroupDirective
  ) {
    super();
  }

  ngOnInit(): void {
    this.initPath();
    if (this.devtoolsEnabled) {
      this.operationGroupDebug.init({
        el: this.elRef.nativeElement,
        groupId: this.groupId,
        path$: this.path$,
        uri: this.uri,
      });
    }
  }

  ngOnChanges(): void {
    this.description$.next(this.getDescription());
  }

  private initPath(): void {
    const parentPath$ = this.parent?.path$ ?? of([]);

    this.path$ = combineLatest([parentPath$, this.description$]).pipe(
      map(([parentPath, description]) => [...parentPath, description]),
      tap(path => this.pathChange.emit(path)),
      shareReplay(1)
    );

    this.subSink = this.path$.subscribe();
  }

  private getDescription(): OperationGroupDescription {
    return {
      id: this.groupId,
      uri: this.uri,
    };
  }
}
