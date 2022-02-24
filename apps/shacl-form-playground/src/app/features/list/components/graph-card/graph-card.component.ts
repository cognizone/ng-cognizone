import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { OnDestroy$ } from '@cognizone/ng-core';
import { ShaclHelper, ShaclHelperDefinition, ShaczShapesGraph } from '@cognizone/shacl/core';
import { GraphClient } from '@shfp/core';

@Component({
  selector: 'cz-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphCardComponent extends OnDestroy$ implements OnInit {
  @Input()
  graph!: JsonModel;

  @Input()
  shapesGraph!: ShaczShapesGraph;

  shortTemplate?: string;
  path!: string;

  constructor(private shaclHelper: ShaclHelper, private graphClient: GraphClient, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const definition: ShaclHelperDefinition = {
      shapesGraph: this.shapesGraph,
      modelContext: this.graph['@context'] ?? {},
    };
    const nodeShape = this.shaclHelper.getNodeShape(definition, this.graph['@type']);
    this.shortTemplate = nodeShape['shacz:shortTemplate'];
    this.subSink = this.graphClient.config$.subscribe(config => {
      this.path = this.graph['@id'].replace(config.graphRootUriBase, '');
      this.cdr.markForCheck();
    });
  }
}
