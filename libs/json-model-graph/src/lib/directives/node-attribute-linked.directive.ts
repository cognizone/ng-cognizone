import { Directive, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { AbstractControl, ControlContainer, NgControl } from '@angular/forms';
import { DEVTOOLS_ENABLED_TOKEN } from '@cognizone/devtools';
import { DATA_MODEL_DEFINITION_HELPER_TOKEN, isJsonModel, JsonModel } from '@cognizone/json-model';
import { Many } from '@cognizone/model-utils';
import { LoggerFactory, OnDestroy$ } from '@cognizone/ng-core';

import { GraphAndControlLinkingService, GraphService, GraphWrapper, UrisStoreService } from '../services';

@Directive({
  selector: '[czNodeAttributeLinked]',
  exportAs: 'czNodeAttributeLinked',
  standalone: true,
})
export class NodeAttributeLinkedDirective extends OnDestroy$ implements OnChanges {
  private urisStoreService = inject(UrisStoreService);
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

  @Input()
  disableLinking?: boolean;

  get rootUri(): string {
    return this.urisStoreService.rootUri;
  }

  get nodeUri(): string {
    return this.urisStoreService.nodeUri;
  }

  private logger = inject(LoggerFactory).create('NodeAttributeLinkedDirective');
  private dataModelDefinitionHelper = inject(DATA_MODEL_DEFINITION_HELPER_TOKEN);
  private graphService = inject(GraphService);
  private graphControlService = inject(GraphAndControlLinkingService);

  private devtoolsEnabled = inject(DEVTOOLS_ENABLED_TOKEN);
  private elRef = inject(ElementRef<Comment | HTMLElement | undefined>, { optional: true });
  private ngControl = inject(NgControl, { optional: true, host: true });
  private controlContainer = inject(ControlContainer, { optional: true, host: true });

  ngOnChanges(): void {
    this.emptySink();
    if (this.disableLinking) return;
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
        definition: this.urisStoreService.getWrapper().getDefinition(),
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
    const rootUri = this.rootUri;
    const nodeUri = this.nodeUri;
    const fullGraph = this.graphService.getLinkedGraphSnapshot(rootUri);
    const wrapper = this.urisStoreService.getWrapper();
    const path = this.findUriPath(fullGraph, nodeUri, wrapper) as string[];
    path.push(this.getPartialPath(this.nodeUri, this.urisStoreService.type, this.attributeKey));
    return path;
  }

  private findUriPath(
    o: unknown,
    uri: string,
    wrapper: GraphWrapper,
    path: string[] = [],
    alreadySeenUris: string[] = []
  ): string[] | undefined {
    if (isJsonModel(o)) {
      if (o['@id'] === uri) return path;
      if (alreadySeenUris.includes(o['@id'])) return undefined;
      for (const [key, value] of Object.entries(o)) {
        const type = this.dataModelDefinitionHelper.getConcreteType(wrapper.getDefinition(), o['@type']);
        const foundPath = this.findUriPath(
          value,
          uri,
          wrapper,
          [...path, this.getPartialPath(o['@id'], type, key)],
          [...alreadySeenUris, o['@id']]
        );
        if (foundPath) return foundPath;
      }
    } else if (Array.isArray(o)) {
      for (let i = 0; i < o.length; ++i) {
        const m = o[i];
        const foundPath = this.findUriPath(m, uri, wrapper, [...path, i.toString()], alreadySeenUris);
        if (foundPath) return foundPath;
      }
    }

    return undefined;
  }

  private getPartialPath(uri: string, type: string, key: string): string {
    return `${type}/${key}`;
  }
}
