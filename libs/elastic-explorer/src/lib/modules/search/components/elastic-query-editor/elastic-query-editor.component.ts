import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { OnDestroy$ } from '@cognizone/ng-core';

import * as monaco from 'monaco-editor';
import { ElasticExplorerService } from '../../services/elastic-explorer.service';

@Component({
  selector: 'cz-elastic-query-editor',
  templateUrl: './elastic-query-editor.component.html',
  styleUrls: ['./elastic-query-editor.component.scss'],
})
export class ElasticQueryEditorComponent extends OnDestroy$ implements OnInit {
  editor?: monaco.editor.IStandaloneCodeEditor;
  editorOptions: {} = { theme: 'vs-light', language: 'json', automaticLayout: true };

  code: UntypedFormControl = new UntypedFormControl(undefined, {
    updateOn: 'blur',
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

  onInitEditor(editor: monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor;
  }
}
