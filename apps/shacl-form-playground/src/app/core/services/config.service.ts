import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { IdGenerator, PrefixCcService, ResourceGraphService } from '@cognizone/json-model';
import { TypedResourceGraph } from '@cognizone/model-utils';
import { ShaczShapesGraph, UriHelper } from '@cognizone/shacl/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { ShaclConfig } from '../models';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  mainShapesGraph$: Observable<ShaczShapesGraph> = this.getShapesGraph().pipe(
    tap(mainShapesGraph => (this.mainShapesGraph = mainShapesGraph)),
    shareReplay(1)
  );
  config$: Observable<ShaclConfig> = this.getConfig().pipe(
    tap(config => (this.config = config)),
    shareReplay(1)
  );

  config!: ShaclConfig;
  mainShapesGraph!: ShaczShapesGraph;

  constructor(
    private http: HttpClient,
    private resourceGraphService: ResourceGraphService,
    private prefixCc: PrefixCcService,
    private idGenerator: IdGenerator,
    private uriHelper: UriHelper
  ) {}

  async init(): Promise<void> {
    await Promise.all([this.mainShapesGraph$.toPromise(), this.config$.toPromise()]);
    this.prefixCc.setGlobalContext(this.config.appContext);
    this.idGenerator.prefix = this.config.newModelUriPrefix;
    this.uriHelper.newUriPrefix = this.config.newModelUriPrefix;
  }

  private getShapesGraph(): Observable<ShaczShapesGraph> {
    return this.http
      .get<TypedResourceGraph>('assets/shacl/shapes-graph.shacl.json')
      .pipe(map(graph => this.resourceGraphService.resourceGraphRawToJsonModel(graph) as ShaczShapesGraph));
  }

  private getConfig(): Observable<ShaclConfig> {
    return this.http.get<ShaclConfig>('assets/shacl/config.json');
  }
}

export function configInit(configService: ConfigService): () => Promise<unknown> {
  return () => configService.init();
}

export const configInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: configInit,
  deps: [ConfigService],
  multi: true,
};
