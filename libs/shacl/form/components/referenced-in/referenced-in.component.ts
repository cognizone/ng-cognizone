import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UrisStoreService } from '@cognizone/json-model-graph';
import { Many, manyToArray } from '@cognizone/model-utils';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cz-referenced-in',
  templateUrl: './referenced-in.component.html',
  styleUrls: ['./referenced-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferencedInComponent implements OnInit {
  @Input()
  uri!: string;

  show: boolean = false;

  references$!: Observable<Reference[]>;

  constructor(private urisStore: UrisStoreService) {}

  ngOnInit(): void {
    this.initReferences();
  }

  showReferences(): void {
    this.show = !this.show;
  }

  private initReferences(): void {
    this.references$ = this.urisStore
      .getWrapper()
      .getGraph()
      .pipe(
        map(graph => {
          const references: Reference[] = [];
          Object.values(graph.models).forEach(node => {
            return Object.entries(node).forEach(([key, value]) => {
              if (manyToArray(value).includes(this.uri) && !key.startsWith('@')) {
                references.push({ uri: node['@id'], propertyKey: key, type: node['@type'] });
              }
            });
          });
          return references;
        })
      );
  }
}

interface Reference {
  uri: string;
  propertyKey: string;
  type: Many<string>;
}
