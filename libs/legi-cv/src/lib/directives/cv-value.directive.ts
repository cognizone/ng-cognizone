import { ChangeDetectorRef, Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Many, manyToArray, manyToOne } from '@cognizone/model-utils';
import { isJsonModel } from '@cognizone/json-model';
import { Logger, OnDestroy$ } from '@cognizone/ng-core';
import { from, identity } from 'rxjs';
import { filter, first, mergeMap, switchMap } from 'rxjs/operators';

import { CvService } from '../services/cv.service';

@Directive({
  selector: '[czCvValue]',
})
export class CvValueDirective extends OnDestroy$ implements OnChanges {
  @Input('czCvValueUri')
  uri!: string;

  @Input('czCvValueCvName')
  cvName!: Many<string>;

  constructor(
    private readonly templateRef: TemplateRef<unknown>,
    private readonly viewContainer: ViewContainerRef,
    private cdr: ChangeDetectorRef,
    private cvService: CvService,
    private logger: Logger
  ) {
    super();
    this.logger = logger.extend('CvValueDirective');
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
            switchMap(() => provider.getConceptByUri(uri))
          )
        ),
        first()
      )
      .subscribe(
        concept => {
          this.viewContainer.createEmbeddedView(this.templateRef, {
            $implicit: concept,
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
