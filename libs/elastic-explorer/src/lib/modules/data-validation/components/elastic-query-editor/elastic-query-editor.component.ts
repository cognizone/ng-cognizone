import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OnDestroy$ } from '@cognizone/ng-core';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DataValidationViewService } from '../../services/data-validation-view.service';

@Component({
  selector: 'cz-elastic-query-editor',
  templateUrl: './elastic-query-editor.component.html',
  styleUrls: ['./elastic-query-editor.component.scss'],
})
export class ElasticQueryEditorComponent extends OnDestroy$ implements OnInit {
  editorOptions: {} = { theme: 'vs-light', language: 'json' };

  code: FormControl = new FormControl(undefined, {
    updateOn: 'blur',
  });

  constructor(private dataValidationViewService: DataValidationViewService) {
    super();
  }

  ngOnInit(): void {
    this.subSink = this.dataValidationViewService.baseElasticQuery$
      .pipe(
        map(elasticQuery => JSON.stringify(elasticQuery, null, 2)),
        distinctUntilChanged()
      )
      .subscribe(elasticQuery => {
        this.code.setValue(elasticQuery, { emitEvent: false });
      });

    this.subSink = this.code.valueChanges.subscribe(value => {
      this.dataValidationViewService.setBaseElasticQuery(value);
    });
  }
}
