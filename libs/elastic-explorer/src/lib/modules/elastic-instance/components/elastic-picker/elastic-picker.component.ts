import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectOption } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ElasticInstanceHandlerService } from '../../services/elastic-instance-handler.service';
import { ElasticInstanceService } from '../../services/elastic-instance-service';
import { ElasticInstanceManagementComponent } from '../elastic-instance-management/elastic-instance-management.component';

@Component({
  selector: 'cz-elastic-picker',
  templateUrl: './elastic-picker.component.html',
  styleUrls: ['./elastic-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElasticPickerComponent extends OnDestroy$ implements OnInit {
  form!: UntypedFormGroup;

  newUrlControl: AbstractControl = this.fb.control(null);

  indexOptions$!: Observable<SelectOption<string | null>[]>;

  urlOptions$!: Observable<SelectOption<string | null>[]>;

  constructor(
    private fb: UntypedFormBuilder,
    private elasticHandler: ElasticInstanceHandlerService,
    private elasticInstanceService: ElasticInstanceService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      url: [],
      index: [],
    });

    this.subSink = this.elasticHandler.url$.subscribe(url => this.form.patchValue({ url }, { emitEvent: false }));
    this.subSink = this.form.controls.url.valueChanges.subscribe(v => this.elasticHandler.setUrl(v));
    this.subSink = this.elasticHandler.index$.subscribe(index => this.form.patchValue({ index }, { emitEvent: false }));
    this.subSink = this.form.controls.index.valueChanges.subscribe(v => this.elasticHandler.setIndex(v));

    this.initIndexOptions();
    this.initUrlOptions();
  }

  editElasticUrl(): void {
    this.dialog.open(ElasticInstanceManagementComponent, {
      height: '40vh',
      width: '40vw',
    });
  }

  private initIndexOptions(): void {
    this.indexOptions$ = this.elasticHandler.indices$.pipe(
      map(indices => [
        {
          value: null,
          label: { en: 'All indices' },
        },
        ...indices.map(index => ({ label: { en: index }, value: index })).sort((a, b) => a.label.en.localeCompare(b.label.en)),
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
