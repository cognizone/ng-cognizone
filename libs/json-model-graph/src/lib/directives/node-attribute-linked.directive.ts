import { Directive, ElementRef, Host, Inject, Input, OnChanges, Optional } from '@angular/core';
import { AbstractControl, ControlContainer, NgControl } from '@angular/forms';
import { DEVTOOLS_ENABLED_TOKEN } from '@cognizone/devtools';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, DataModelDefinitionHelper, isJsonModel, JsonModel } from '@cognizone/json-model';
import { Many } from '@cognizone/model-utils';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';

import { GraphAndControlLinkingService } from '../services/graph-and-control-linking.service';
import { GraphService } from '../services/graph.service';
import { NodeUriDirective } from './node-uri.directive';
import { RootUriDirective } from './root-uri.directive';

@Directive({
  selector: '[czNodeAttributeLinked]',
  exportAs: 'czNodeAttributeLinked',
})
export class NodeAttributeLinkedDirective extends OnDestroy$ implements OnChanges {
  @Input('czNodeAttributeLinked')
  attributeKey!: string;

  @Input()
  cvName?: Many<string>;

  @Input()
  control?: AbstractControl;

  @Input()
  controlName?: string;

  @Input()
  classId?: string;

  get rootUri(): string {
    return this.rootUriDirective.rootUri;
  }

  get nodeUri(): string {
    return this.nodeUriDirective.uri;
  }

  constructor(
    @Inject(DATA_MODEL_DEFINITION_HELPER_TOKEN)
    private dataModelDefinitionHelper: DataModelDefinitionHelper<unknown>,
    private readonly graphService: GraphService,
    private readonly graphControlService: GraphAndControlLinkingService,
    private readonly rootUriDirective: RootUriDirective,
    private readonly nodeUriDirective: NodeUriDirective,
    @Inject(DEVTOOLS_ENABLED_TOKEN) private readonly devtoolsEnabled: boolean,
    private logger: Logger,
    @Optional() private elRef?: ElementRef<Comment | HTMLElement | undefined>,
    @Host() @Optional() private ngControl?: NgControl,
    @Host() @Optional() private controlContainer?: ControlContainer
  ) {
    super();
    this.logger = logger.extend('NodeAttributeLinkedDirective');
  }

  ngOnChanges(): void {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    this.attributeKey = (this.attributeKey || this.controlName || this.ngControl?.name || this.controlContainer?.name || '').toString();

    if (!this.attributeKey) {
      throw new Error('Could not find attribute key to link graph state to');
    }

    this.control = this.control ?? this.ngControl?.control ?? undefined;

    if (!this.control && this.controlName && this.controlContainer) {
      this.control = this.controlContainer?.control?.get(this.controlName) ?? undefined;
    }

    if (!this.control) {
      this.control = this.controlContainer?.control ?? undefined;
    }

    if (!this.control) {
      throw new Error(`Could not find control to link graph state to ${this.attributeKey}`);
    }

    this.subSink = this.graphControlService
      .linkControlToNodeAttribute({
        rootUri: this.rootUri,
        nodeUri: this.nodeUri,
        attributeKey: this.attributeKey as keyof JsonModel,
        control: this.control,
        definition: this.rootUriDirective.getWrapper().getDefinition(),
        cvName: this.cvName,
        classId: this.classId,
      })
      .subscribe();

    const el = this.elRef?.nativeElement;
    if (this.devtoolsEnabled && el instanceof HTMLElement) {
      try {
        const fullPath = this.getFullAttributePath();
        el.setAttribute('title', `${fullPath.join('>')}`);
      } catch (err: unknown) {
        this.logger.error('Failed to find data path', err);
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
        const type = this.dataModelDefinitionHelper.getConcreteType(this.rootUriDirective.getWrapper().getDefinition(), o['@type']);
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
