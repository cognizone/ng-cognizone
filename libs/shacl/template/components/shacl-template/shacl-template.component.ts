import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JsonModel } from '@cognizone/json-model';
//@ts-ignore didn't find a better way to handle this yet, everything else failed
import Handlebars from 'handlebars/dist/handlebars.min.js';
// var handlebars = require('handlebars');
@Component({
  selector: 'cz-shacl-template',
  templateUrl: './shacl-template.component.html',
  styleUrls: ['./shacl-template.component.scss'],
})
export class ShaclTemplateComponent implements OnChanges {
  @Input()
  model!: JsonModel;

  @Input()
  template!: string;

  innerHtml?: string;

  private handlebarCompliedTemplate!: Function;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.template || !this.model) return;
    if (changes.template) this.handlebarCompliedTemplate = Handlebars.compile(this.template);
    this.innerHtml = this.handlebarCompliedTemplate({ item: this.model }).trim();
  }
}
