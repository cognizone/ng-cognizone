import { Directive, ElementRef, Host, Inject, Input, OnChanges, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormArrayName, FormControlDirective, FormControlName, FormGroupDirective, FormGroupName } from '@angular/forms';
import { DEVTOOLS_ENABLED_TOKEN } from '@cognizone/devtools';
import { Many } from '@cognizone/model-utils';
import { ApHelper, isJsonModel, JsonModel } from '@cognizone/ng-application-profile';
import { OnDestroy$ } from '@cognizone/ng-core';

import { GraphAndControlLinkingService } from '../services/graph-and-control-linking.service';
import { GraphService } from '../services/graph.service';

import { NodeUriDirective } from './node-uri.directive';
import { RootUriDirective } from './root-uri.directive';

@Directive({
  selector: '[czNodeAttributeLinked]',
  exportAs: 'czNodeAttributeLinked'
})
export class NodeAttributeLinkedDirective extends OnDestroy$ implements OnChanges {
  @Input('czNodeAttributeLinked')
  attributeKey!: string;
  @Input()
  cvName?: Many<string>;
  @Input()
  control?: AbstractControl;
  @Input()
  classId?: string;

  get rootUri(): string {
    return this.rootUriDirective.rootUri;
  }

  get nodeUri(): string {
    return this.nodeUriDirective.uri;
  }

  constructor(
    private readonly apHelper: ApHelper,
    private readonly graphService: GraphService,
    private readonly graphControlService: GraphAndControlLinkingService,
    private readonly rootUriDirective: RootUriDirective,
    private readonly nodeUriDirective: NodeUriDirective,
    @Inject(DEVTOOLS_ENABLED_TOKEN) private readonly devtoolsEnabled: boolean,
    @Optional() private elRef?: ElementRef<HTMLElement | Comment | undefined>,
    @Host() @Optional() private formArrayName?: FormArrayName,
    @Host() @Optional() private formGroupName?: FormGroupName,
    @Host() @Optional() private formGroupDirective?: FormGroupDirective,
    @Host() @Optional() private formControlName?: FormControlName,
    @Host() @Optional() private formControlDirective?: FormControlDirective
  ) {
    super();
  }

  ngOnChanges(): void {
    this.attributeKey = (
      this.attributeKey ||
      this.formControlName?.name ||
      this.formGroupName?.name ||
      this.formArrayName?.name ||
      ''
    ).toString();

    this.control =
      this.control ??
      this.formControlName?.control ??
      this.formGroupName?.control ??
      this.formArrayName?.control ??
      this.formControlDirective?.control ??
      this.formGroupDirective?.control;

    if (!this.control) {
      throw new Error('Could not find control ti link graph state to');
    }

    this.subSink = this.graphControlService
      .linkControlToNodeAttribute({
        rootUri: this.rootUri,
        nodeUri: this.nodeUri,
        attributeKey: this.attributeKey as keyof JsonModel,
        control: this.control,
        apName: this.rootUriDirective.apName,
        cvName: this.cvName,
        classId: this.classId
      })
      .subscribe();

    const el = this.elRef?.nativeElement;
    if (this.devtoolsEnabled && el instanceof HTMLElement) {
      try {
        const fullPath = this.getFullAttributePath();
        el.setAttribute('title', `${fullPath.join('>')}`);
      } catch (err) {
        // since it's for debugging purposes, wrap it in try/catch just in case, we don't care about the error though
      }
    }
  }

  private getFullAttributePath(): string[] {
    const rootUri = this.rootUriDirective.rootUri;
    const nodeUri = this.nodeUriDirective.uri;
    const fullGraph = this.graphService.getLinkedGraphSnapshot(rootUri);
    const path = this.findUriPath(fullGraph, nodeUri) as string[];
    path.push(this.getPartialPath(this.nodeUri, this.nodeUriDirective.type, this.attributeKey));
    return path;
  }

  private findUriPath(o: unknown, uri: string, path: string[] = [], alreadySeenUris: string[] = []): string[] | undefined {
    if (isJsonModel(o)) {
      if (o['@id'] === uri) return path;
      if (alreadySeenUris.includes(o['@id'])) return undefined;
      for (const [key, value] of Object.entries(o)) {
        const type = this.apHelper.getConcreteType(this.nodeUriDirective.ap, o['@type']);
        const foundPath = this.findUriPath(value, uri, [...path, this.getPartialPath(o['@id'], type, key)], [...alreadySeenUris, o['@id']]);
        if (foundPath) return foundPath;
      }
    } else if (Array.isArray(o)) {
      for (let i = 0; i < o.length; ++i) {
        const m = o[i];
        const foundPath = this.findUriPath(m, uri, [...path, i.toString()], alreadySeenUris);
        if (foundPath) return foundPath;
      }
    }
  }

  private getPartialPath(uri: string, type: string, key: string): string {
    return `${type}/${key}`;
  }
}