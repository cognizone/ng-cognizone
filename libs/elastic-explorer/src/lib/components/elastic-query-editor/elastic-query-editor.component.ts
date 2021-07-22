import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnDestroy$ } from '@cognizone/ng-core';

import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'app-elastic-query-editor',
  templateUrl: './elastic-query-editor.component.html',
  styleUrls: ['./elastic-query-editor.component.scss']
})
export class ElasticQueryEditorComponent extends OnDestroy$ implements OnInit {
  editorOptions: {} = { theme: 'vs-light', language: 'json' };
  code: FormControl = new FormControl(undefined, {
    updateOn: 'blur'
  });

  constructor(private elasticExplorerService: ElasticExplorerService) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.elasticExplorerService.elasticQuery$.subscribe(elasticQuery => {
      this.code.setValue(JSON.stringify(elasticQuery, null, 2), { emitEvent: false });
    });

    this.subSink = this.code.valueChanges.subscribe(() => {
      this.runQuery();
    });
  }

  runQuery(): void {
    this.elasticExplorerService.setElasticQuery(JSON.parse(this.code.value));
  }
}
