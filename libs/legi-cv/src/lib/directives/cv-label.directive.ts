import { ChangeDetectorRef, Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { awaitForCompletable, Many, manyToArray, manyToOne } from '@cognizone/model-utils';
import { isJsonModel, JsonModel } from '@cognizone/json-model';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';
import { from, identity } from 'rxjs';
import { filter, first, mergeMap, switchMap } from 'rxjs/operators';

import { CvService } from '../services/cv.service';

@Directive({
  selector: '[czCvLabel]',
})
export class CvLabelDirective extends OnDestroy$ implements OnChanges {
  @Input('czCvLabelUri')
  uri!: Many<JsonModel | string>;

  @Input('czCvLabelCvName')
  cvName!: Many<string>;

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private cvService: CvService,
    private logger: Logger
  ) {
    super();
    this.logger = logger.extend('CvLabelDirective');
  }

  ngOnChanges(): void {
    this.emptySink();
    this.viewContainer.clear();
    this.cdr.markForCheck();
    const model = manyToOne(this.uri);
    const uri = isJsonModel(model) ? model['@id'] : model;

    if (!uri || !this.cvName) {
      return;
    }
    const providers = manyToArray(this.cvName).map(cvName => this.cvService.getProvider(cvName));
    this.subSink = from(providers)
      .pipe(
        mergeMap(provider =>
          provider.hasConcept(uri).pipe(
            filter(identity),
            switchMap(() => provider.getConceptByUri(uri)),
            switchMap(async concept => awaitForCompletable(provider.getLabel(concept)))
          )
        ),
        first()
      )
      .subscribe(
        label => {
          this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: label,
          });
          this.cdr.markForCheck();
        },
        err => {
          const names = providers.map(provider => `[${provider.cvName} : ${provider.cvUri}]`).join(' ');
          this.logger.error(`Could not find concept with uri ${uri} in given CVs ${names}`, err, { uri, providers });
        }
      );
  }
}
