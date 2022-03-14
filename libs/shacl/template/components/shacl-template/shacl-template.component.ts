import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
import { HandlebarService } from '../../services';

@Component({
  selector: 'cz-shacl-template',
  templateUrl: './shacl-template.component.html',
  styleUrls: ['./shacl-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShaclTemplateComponent implements OnChanges {
  @Input()
  model?: JsonModel;

  @Input()
  template?: string;

  innerHtml?: string;

  private handlebarCompliedTemplate!: Function;

  constructor(private handlebarService: HandlebarService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.template || !this.model) return;
    if (changes.template) this.handlebarCompliedTemplate = this.handlebarService.compileTemplate(this.template);
    this.innerHtml = this.handlebarCompliedTemplate({ item: this.model }).trim();
  }
}
