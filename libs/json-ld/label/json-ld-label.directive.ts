import {
  ChangeDetectorRef,
  Directive,
  inject,
  Input,
  OnChanges,
  OnInit,
  Signal,
  signal,
  TemplateRef,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { JsonLdNode } from '@cognizone/json-ld-core';
import { OnDestroy$ } from '@cognizone/ng-core';

import { JsonLdLabelService } from './json-ld-label.service';

@Directive({
  selector: '[czJsonLdLabel]',
  standalone: true,
})
export class JsonLdLabelDirective extends OnDestroy$ implements OnInit, OnChanges {
  @Input('czJsonLdLabelNode')
  node!: JsonLdNode;

  @Input('czJsonLdLabelKey')
  key!: string;

  private jsonLdLabelService: JsonLdLabelService = inject(JsonLdLabelService);
  private templateRef: TemplateRef<{ $implicit: Signal<string> }> = inject(TemplateRef);
  private viewContainer: ViewContainerRef = inject(ViewContainerRef);
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private labelSignal: WritableSignal<string> = signal('');

  ngOnInit(): void {
    this.viewContainer.createEmbeddedView(this.templateRef, {
      $implicit: this.labelSignal,
    });
  }

  ngOnChanges(): void {
    this.emptySink();
    this.viewContainer.clear();
    this.cdr.markForCheck();

    this.subSink = this.jsonLdLabelService.selectLabel(this.node, this.key).subscribe(label => {
      this.labelSignal.set(label);
    });
  }
}
