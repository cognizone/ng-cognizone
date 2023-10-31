import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Nil } from '@cognizone/model-utils';
import { firstValueFrom } from 'rxjs';

import { Operation, OperationGroup, OperationGroupDescription } from '../../models/operation';
import { OperationUtils } from '../../services/operation-utils.service';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'cz-operation-viewer-modal',
  templateUrl: './operation-viewer-modal.component.html',
  styleUrls: ['./operation-viewer-modal.component.scss'],
})
export class OperationViewerModalComponent implements OnInit {
  allOperations?: OperationGroup[];

  group?: OperationGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OperationViewerModalComponentData,
    private operationsService: OperationsService,
    private operationUtils: OperationUtils
  ) {}

  async ngOnInit(): Promise<void> {
    this.allOperations = await firstValueFrom(this.operationsService.groups$);
    if (!this.data.operation) {
      this.group = this.operationUtils.getGroup(this.allOperations ?? [], this.data.operationGroupDescriptions);
    }
  }
}
export interface OperationViewerModalComponentData {
  operationGroupDescriptions: OperationGroupDescription[];
  operation?: Nil<Operation>;
}
