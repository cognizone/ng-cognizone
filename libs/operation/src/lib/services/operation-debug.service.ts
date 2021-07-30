import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Nil } from '@cognizone/model-utils';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';

import {
  OperationViewerModalComponent,
  OperationViewerModalComponentData,
} from '../components/operation-viewer-modal/operation-viewer-modal.component';
import { Operation, OperationGroupDescription } from '../models/operation';

import { OperationsService } from './operations.service';

@Injectable()
export class OperationDebug extends OnDestroy$ implements OnDestroy {
  private options?: OperationDebugOptions;

  private debugDiv?: HTMLElement;

  private unListen?: Function;

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog,
    private operationsService: OperationsService,
    private logger: Logger
  ) {
    super();
    this.logger = logger.extend('OperationDebug');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.removeDebug();
  }

  init(options: OperationDebugOptions): void {
    this.options = options;
    this.emptySink();

    this.subSink = combineLatest([this.operationsService.debugEnabled$, this.options.operation$, this.options.path$])
      .pipe(debounceTime(0))
      .subscribe(([isDebug, operation, path]) => {
        this.removeDebug();
        if (isDebug) {
          this.enableDebug(operation, path);
        }
      });
  }

  private enableDebug(operation: Nil<Operation>, path: OperationGroupDescription[]): void {
    if (!this.options?.el || this.options.el instanceof Comment) return;
    const div = document.createElement('div');
    div.innerText = this.options?.operationId ?? '';
    div.setAttribute('title', this.options?.operationId ?? '');
    this.renderer.setStyle(div, 'position', `absolute`);
    this.renderer.setStyle(div, 'border', `1px solid transparent`);
    this.renderer.setStyle(div, 'border-radius', `8px`);
    this.renderer.setStyle(div, 'background-color', this.getColor(operation));
    this.renderer.setStyle(div, 'color', 'white');
    this.renderer.setStyle(div, 'font-weight', '600');
    this.renderer.setStyle(div, 'bottom', '4px');
    this.renderer.setStyle(div, 'right', '4px');
    this.renderer.setStyle(div, 'cursor', 'pointer');
    this.renderer.setStyle(div, 'z-index', `${20 + path.length}`);
    this.debugDiv = div;
    this.unListen = this.renderer.listen(this.debugDiv, 'click', (event: MouseEvent) => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      this.openOperationViewerModal().catch(err => this.logger.error(err));
    });

    if (this.options?.el) {
      this.renderer.appendChild(this.options?.el, div);
      this.renderer.setStyle(this.options?.el, 'position', 'relative');
    }
  }

  private removeDebug(): void {
    if (!this.debugDiv) return;
    this.debugDiv?.remove();
    this.debugDiv = undefined;
    this.unListen?.();
    this.unListen = undefined;
    if (this.options?.el) {
      this.renderer.setStyle(this.options.el, 'position', null);
    }
  }

  private getColor(operation: Nil<Operation>): string {
    switch (operation?.enabled) {
      case true:
        return 'green';
      case false:
        return 'red';
      default:
        return 'lightgrey';
    }
  }

  private async openOperationViewerModal(): Promise<void> {
    const operation = await this.options?.operation$.pipe(first()).toPromise();
    const path = await this.options?.path$.pipe(first()).toPromise();
    const data: OperationViewerModalComponentData = {
      operationGroupDescriptions: path ?? [],
      operation: operation,
    };
    this.dialog.open(OperationViewerModalComponent, { data });
  }
}

export interface OperationDebugOptions {
  operationId: string;
  el: unknown;
  operation$: Observable<Nil<Operation>>;
  path$: Observable<OperationGroupDescription[]>;
}
