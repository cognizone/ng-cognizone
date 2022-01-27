import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonModel } from '@cognizone/json-model';
import { GraphService } from '@cognizone/json-model-graph';
import { ShaclHelperDefinition } from '@cognizone/shacl/core';

@Component({
  selector: 'cz-graph-form',
  templateUrl: './graph-form.component.html',
  styleUrls: ['./graph-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphFormComponent implements OnInit {
  @Input()
  graph!: JsonModel;

  @Input()
  definition!: ShaclHelperDefinition;

  formGroup: FormGroup = this.fb.group({});

  constructor(private graphService: GraphService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.graphService.setGraph(this.graph, this.definition);
  }
}
