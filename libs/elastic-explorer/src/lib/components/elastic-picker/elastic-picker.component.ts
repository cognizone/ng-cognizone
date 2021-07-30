import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectOption } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ElasticExplorerService } from '../../services/elastic-explorer.service';
import { ElasticInstanceService } from '../../services/elastic-instance-service';
import { ElasticInstanceManagementComponent } from '../elastic-instance-management/elastic-instance-management.component';

@Component({
  selector: 'cz-elastic-picker',
  templateUrl: `./elastic-picker.component.html`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElasticPickerComponent extends OnDestroy$ implements OnInit {
  form!: FormGroup;

  newUrlControl: AbstractControl = this.fb.control(null);

  indexOptions$!: Observable<SelectOption<string | null>[]>;

  urlOptions$!: Observable<SelectOption<string | null>[]>;

  constructor(
    private fb: FormBuilder,
    private elasticExplorerService: ElasticExplorerService,
    private elasticInstanceService: ElasticInstanceService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      url: [],
      index: []
    });

    this.subSink = this.elasticExplorerService.elasticInfo$.subscribe(v => this.form.patchValue(v, { emitEvent: false }));
    this.subSink = this.form.valueChanges.subscribe(v => this.elasticExplorerService.setElasticInfo(v));

    this.initIndexOptions();
    this.initUrlOptions();
  }

  editElasticUrl(): void {
    this.dialog.open(ElasticInstanceManagementComponent, {
      height: '40vh',
      width: '40vw'
    });
  }

  private initIndexOptions(): void {
    this.indexOptions$ = this.elasticExplorerService.indices$.pipe(
      map(indices => [
        {
          value: null,
          label: { en: 'All indices' }
        },
        ...indices.map(index => ({ label: { en: index }, value: index })).sort((a, b) => a.label.en.localeCompare(b.label.en))
      ])
    );
  }

  private initUrlOptions(): void {
    this.urlOptions$ = this.elasticInstanceService.values$.pipe(
      map(instances =>
        instances
          .map(instance => ({ label: { en: instance.label }, value: instance.url }))
          .sort((a, b) => a.label.en.localeCompare(b.label.en))
      )
    );
  }
}
