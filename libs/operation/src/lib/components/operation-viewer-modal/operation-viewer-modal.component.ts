import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Nil } from '@cognizone/model-utils';
import { first } from 'rxjs/operators';

import { MatButtonModule } from '@angular/material/button';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { Operation, OperationGroup, OperationGroupDescription } from '../../models/operation';
import { OperationUtils } from '../../services/operation-utils.service';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'cz-operation-viewer-modal',
  template: `
    <mat-dialog-content class="operation-viewer-container">
      <div class="d-flex flex-column">
        @if (data.operation) {
        <h4>Operation</h4>
        <ngx-json-viewer class="p-3" [json]="data.operation" [expanded]="false"></ngx-json-viewer>
        } @if (group) {
        <h4>Operation Group</h4>
        <ngx-json-viewer class="p-3" [json]="group" [expanded]="false"></ngx-json-viewer>
        }

        <h4>Path</h4>
        <ngx-json-viewer class="p-3" [json]="data.operationGroupDescriptions" [expanded]="false"></ngx-json-viewer>

        @if (allOperations) {
        <h4>All Operation Groups</h4>
        <ngx-json-viewer class="p-3" [json]="allOperations" [expanded]="false"></ngx-json-viewer>
        }
      </div>
    </mat-dialog-content>

    <div mat-dialog-actions align="end" class="m-0">
      <button mat-flat-button color="primary" [mat-dialog-close]="false">Close</button>
    </div>
  `,
  styles: [
    `
      .operation-viewer-container {
        width: 800px;
      }
    `,
  ],
  imports: [MatButtonModule, MatDialogModule, NgxJsonViewerModule],
  standalone: true,
})
export class OperationViewerModalComponent implements OnInit {
  allOperations?: OperationGroup[];

  group?: OperationGroup;

  data = inject(MAT_DIALOG_DATA) as OperationViewerModalComponentData;
  private operationsService = inject(OperationsService);
  private operationUtils = inject(OperationUtils);

  async ngOnInit(): Promise<void> {
    this.allOperations = await this.operationsService.groups$.pipe(first()).toPromise();
    if (!this.data.operation) {
      this.group = this.operationUtils.getGroup(this.allOperations ?? [], this.data.operationGroupDescriptions);
    }
  }
}
export interface OperationViewerModalComponentData {
  operationGroupDescriptions: OperationGroupDescription[];
  operation?: Nil<Operation>;
}
