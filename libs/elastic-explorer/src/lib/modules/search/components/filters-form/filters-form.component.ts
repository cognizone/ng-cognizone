import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ElasticAggregation, notNil, SelectOption, SelectOptionsProvider } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { identity, Observable } from 'rxjs';
import { filter, first, map, switchMap, toArray } from 'rxjs/operators';

import { ElasticExplorerService } from '../../services/elastic-explorer.service';
import { ElasticQueryEditorComponent } from "../elastic-query-editor/elastic-query-editor.component";

@Component({
  selector: 'cz-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrls: ['./filters-form.component.scss'],
})
export class FiltersFormComponent extends OnDestroy$ implements OnInit {
  @ViewChild(ElasticQueryEditorComponent, { static: false })
  elasticQueryEditor?: ElasticQueryEditorComponent
  form!: UntypedFormGroup;

  typeOptionsProvider!: SelectOptionsProvider<string>;

  manualMode: UntypedFormControl = new UntypedFormControl(false);
  showFullScreen = false;

  constructor(private fb: UntypedFormBuilder, private elasticExplorerService: ElasticExplorerService) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.initTypeOptions();
    this.subSink = this.manualMode.valueChanges.subscribe(manualMode => this.elasticExplorerService.setManualMode(manualMode));
    this.subSink = this.elasticExplorerService.manualMode$.subscribe(manualMode =>
      this.manualMode.setValue(manualMode, { emitEvent: false })
    );
  }

  resetFilters(): void {
    this.form.reset();
  }

  onFullscreenToggle(): void {
    const editor = this.elasticQueryEditor?.editor;
    if (!editor) return;
    this.showFullScreen = !this.showFullScreen;
    if (this.showFullScreen) {
      editor.layout({ width: screen.width, height: 500 })
    } else {
      editor.layout({ width: 336, height: 500 })
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      uri: [],
      type: [],
      included: [],
      facets: [],
      isFuzzy: [],
    });
    this.subSink = this.elasticExplorerService.filters$.subscribe(filters => this.form.patchValue(filters, { emitEvent: false }));
    this.subSink = this.form.valueChanges.subscribe(filters => this.elasticExplorerService.setFilters(filters));
  }

  private initTypeOptions(): void {
    const typesAggregation = this.elasticExplorerService.aggregations$.pipe(map(s => s.type));
    this.typeOptionsProvider = new CustomSelectOptionsProvider(typesAggregation);
  }
}

class CustomSelectOptionsProvider implements SelectOptionsProvider<string> {
  private options$: Observable<SelectOption[]> = this.aggregation$.pipe(
    map(aggregation =>
      (aggregation?.buckets ?? [])
        .map(bucket => ({
          label: `${bucket.key} (${bucket.doc_count})`,
          value: bucket.key.toString(),
        }))
        .sort((a, b) => a.label.localeCompare(b.label))
    )
  );

  constructor(private aggregation$: Observable<ElasticAggregation>) {}

  getOptions(query?: string | undefined): Observable<SelectOption[]> {
    const cleanQuery = (query ?? '').toLowerCase().trim();
    return this.options$.pipe(
      first(),
      switchMap(identity),
      filter(option => {
        if (!cleanQuery) return true;
        return option.value.toLowerCase().includes(cleanQuery);
      }),
      toArray()
    );
  }

  getValueOption(value: string): Observable<SelectOption> {
    return this.options$.pipe(
      first(),
      map(options => options.find(o => o.value === value) as SelectOption)
    );
  }

  hasOptionFor(value: string): Observable<boolean> {
    return this.getValueOption(value).pipe(map(notNil));
  }
}
