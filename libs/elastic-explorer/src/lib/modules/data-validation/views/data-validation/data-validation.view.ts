import { Component, OnInit } from '@angular/core';
import { ElasticInstanceHandlerService } from '../../../elastic-instance';
import { DataValidationViewService } from '../../services/data-validation-view.service';

@Component({
  selector: 'cz-data-validation',
  templateUrl: './data-validation.view.html',
  styleUrls: ['./data-validation.view.scss'],
  providers: [ElasticInstanceHandlerService, DataValidationViewService],
})
export class DataValidationView implements OnInit {
  constructor(private dataValidationViewService: DataValidationViewService) {}

  ngOnInit(): void {}

  generateReport(): void {
    this.dataValidationViewService.generateReport();
  }
}
