import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OnDestroy$ } from '@cognizone/ng-core';

import { ElasticInstance } from '../../models/elastic-instance';
import { ElasticInstanceService } from '../../services/elastic-instance-service';
import { ElasticInstanceEditorComponent } from '../elastic-instance-editor/elastic-instance-editor.component';

@Component({
  selector: 'cz-elastic-instance-management',
  templateUrl: './elastic-instance-management.component.html',
  styleUrls: ['./elastic-instance-management.component.scss'],
})
export class ElasticInstanceManagementComponent extends OnDestroy$ implements OnInit {
  values?: ElasticInstance[];

  constructor(private elasticInstanceService: ElasticInstanceService, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.initValues();
  }

  initValues(): void {
    this.subSink = this.elasticInstanceService.values$.subscribe(values => (this.values = values));
  }

  editElasticInstance(elasticInstance: ElasticInstance): void {
    this.dialog
      .open(ElasticInstanceEditorComponent, {
        data: {
          operation: 'Edit',
          url: elasticInstance.url,
          label: elasticInstance.label,
        },
      })
      .afterClosed()
      .subscribe(newInstance => this.elasticInstanceService.edit(elasticInstance, newInstance));
  }

  addElasticInstance(): void {
    this.dialog
      .open(ElasticInstanceEditorComponent, {
        data: {
          operation: 'Add',
        },
      })
      .afterClosed()
      .subscribe(instance => this.elasticInstanceService.addIfNotPresent(instance));
  }

  deleteElasticInstance(elasticInstance: ElasticInstance): void {
    this.elasticInstanceService.deleteValue(elasticInstance);
  }

  download(): void {
    this.elasticInstanceService.downloadFile();
  }

  onFileSelection(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.elasticInstanceService.readFile((target.files as FileList)[0]);
  }
}
