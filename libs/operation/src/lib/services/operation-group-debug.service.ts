import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Nil } from '@cognizone/model-utils';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, first, map } from 'rxjs/operators';

import {
  OperationViewerModalComponent,
  OperationViewerModalComponentData,
} from '../components/operation-viewer-modal/operation-viewer-modal.component';
import { OperationGroup, OperationGroupDescription } from '../models/operation';

import { OperationUtils } from './operation-utils.service';
import { OperationsService } from './operations.service';

@Injectable()
export class OperationGroupDebug extends OnDestroy$ implements OnDestroy {
  private options?: OperationGroupDebugOptions;

  private debugDiv?: HTMLElement;

  private unListen?: Function;

  private colors: string[] = ['#003f5c', '#7a5195', '#ef5675', '#ffa600'];

  private borderStyle: string[] = ['dotted', 'solid', 'dashed', 'double'];

  constructor(
    private renderer: Renderer2,
    private dialog: MatDialog,
    private operationsService: OperationsService,
    private operationUtils: OperationUtils,
    private logger: Logger
  ) {
    super();
    this.logger = logger.extend('OperationGroupDebug');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.removeDebug();
  }

  init(options: OperationGroupDebugOptions): void {
    this.options = options;
    let el = this.options.el as Nil<Element>;
    // this is for <ng-container> and the likes
    if (el instanceof Comment) {
      el = el.previousElementSibling;
      this.options = { ...this.options, el: el as Element };
    }
    this.emptySink();

    const group$ = combineLatest([this.options.path$, this.operationsService.groups$]).pipe(
      map(([path, groups]) => this.operationUtils.getGroup(groups, path))
    );
    this.subSink = combineLatest(this.operationsService.debugEnabled$, group$, this.options.path$)
      .pipe(debounceTime(0))
      .subscribe(([isDebug, group, path]) => {
        this.removeDebug();
        if (isDebug) {
          if (!el || el instanceof Comment) return;
          this.renderDebug(path, el, group);
        }
      });
  }

  private renderDebug(path: OperationGroupDescription[], el: Element, group: Nil<OperationGroup>): void {
    if (path.length === 0) return;
    const { color, borderStyle, zIndex } = this.getStyle(path);
    this.renderer.setStyle(el, 'border', `1px ${borderStyle} ${color}`);
    this.renderer.setStyle(el, 'margin', '4px');
    this.renderer.setStyle(el, 'position', 'relative');
    const div = document.createElement('div');
    const { id, uri } = path[path.length - 1];
    const title = id + (uri ? ` - ${uri}` : '');
    div.innerText = title;
    div.setAttribute('title', title);
    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'color', color);
    this.renderer.setStyle(div, 'border', `1px ${borderStyle} ${color}`);
    this.renderer.setStyle(div, 'background-color', group ? 'white' : 'lightgrey');
    this.renderer.setStyle(div, 'top', '4px');
    this.renderer.setStyle(div, 'left', '4px');
    this.renderer.setStyle(div, 'cursor', 'pointer');
    this.renderer.setStyle(div, 'z-index', zIndex);
    this.debugDiv = div;
    this.unListen = this.renderer.listen(this.debugDiv, 'click', (event: MouseEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      this.openOperationViewerModal().catch(err => {
        this.logger.error('Failed to open debug operation modal', err);
      });
    });
    this.renderer.appendChild(el, div);
  }

  private getStyle(path: OperationGroupDescription[]): { color: string; borderStyle: string; zIndex: string } {
    const depth = path.length;

    return {
      color: this.colors[depth % this.colors.length],
      borderStyle: this.borderStyle[depth % this.borderStyle.length],
      zIndex: `${10 + depth}`,
    };
  }

  private removeDebug(): void {
    this.debugDiv?.remove();
    this.debugDiv = undefined;
    this.unListen?.();
    this.unListen = undefined;
    if (this.options?.el) {
      this.renderer.setStyle(this.options.el, 'border', null);
      this.renderer.setStyle(this.options.el, 'margin', null);
      this.renderer.setStyle(this.options.el, 'position', null);
    }
  }

  private async openOperationViewerModal(): Promise<void> {
    const path = await this.options?.path$.pipe(first()).toPromise();
    const data: OperationViewerModalComponentData = {
      operationGroupDescriptions: path ?? [],
    };
    this.dialog.open(OperationViewerModalComponent, { data });
  }
}

export interface OperationGroupDebugOptions {
  el: Element;
  groupId: string;
  uri: Nil<string>;
  path$: Observable<OperationGroupDescription[]>;
}
