import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { UrisStoreService } from '@cognizone/json-model-graph';
import { ShaclHelper, ShaclHelperDefinition, UriHelper } from '@cognizone/shacl/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cz-node-title',
  templateUrl: './node-title.component.html',
  styleUrls: ['./node-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTitleComponent implements OnInit {
  @Input()
  nodeUri!: string;

  node$!: Observable<JsonModel>;
  type!: string;
  shortTemplate?: string;
  isNew?: boolean;

  constructor(private urisStoreService: UrisStoreService, private shaclHelper: ShaclHelper, private uriHelper: UriHelper) {}

  ngOnInit(): void {
    const wrapper = this.urisStoreService.getWrapper();
    this.node$ = wrapper.getNode(this.nodeUri);
    const type = wrapper.getNodeSnapshot(this.nodeUri)['@type'];
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;
    const nodeShape = this.shaclHelper.getNodeShape(definition, type);
    this.shortTemplate = nodeShape['shacz:shortTemplate'];
    this.type = this.shaclHelper.getConcreteType(definition, type);
    this.isNew = this.uriHelper.isNew(this.nodeUri);
  }
}
