import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, Injectable, Provider } from '@angular/core';
import { isOfType, JsonModel, PrefixCcService, ResourceGraphService } from '@cognizone/json-model';
import { Many, manyToArray, TypedResource, TypedResourceContext, TypedResourceGraph } from '@cognizone/model-utils';
import { ShaclHelperDefinition, ShaczShapesGraph } from '@cognizone/shacl/core';
import produce from 'immer';
import { combineLatest, Observable, of, throwError, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class GraphClient {
  private readonly localStorageKey: string = 'shaclGraphs';

  constructor(
    private http: HttpClient,
    private resourceGraphService: ResourceGraphService,
    private configService: ConfigService,
    private prefixCc: PrefixCcService
  ) {}

  async init(): Promise<void> {
    if (this.state.graphs.length) return;
    const graphs = await this.getDefaultGraphs().toPromise();
    this.state = { graphs };
  }

  getGraphByUri(uri: string): Observable<JsonModel> {
    const graph = this.state.graphs.find(g => g.data.uri === uri);
    if (uri === this.configService.mainShapesGraph['@id']) return of(this.configService.mainShapesGraph);
    if (!graph) return throwError(new Error(`Could not find graph with given uri '${uri}'`));
    return timer(500).pipe(switchMap(() => this.mapToJsonModel(graph)));
  }

  getShapesGraphForType(type: Many<string>, context: TypedResourceContext): Observable<ShaczShapesGraph> {
    const types = manyToArray(type);
    return this.getAllShapesGraphs().pipe(
      map(allShapesGraph => {
        const target = allShapesGraph.find(shapeGraph => {
          return shapeGraph['shacz:shapes']?.some(nodeShape => {
            if (!nodeShape['sh:targetClass']) return false;
            const targetClass = this.prefixCc.convertUri(nodeShape['sh:targetClass'], shapeGraph['@context']!, context);
            return nodeShape['shacz:isRoot'] && types.includes(targetClass);
          });
        });
        if (!target) {
          throw new Error('Could not find ShapesGraph for given type ' + type);
        }
        return target;
      })
    );
  }

  getShaclHelperDefinition(model: JsonModel): Observable<ShaclHelperDefinition> {
    return this.getShapesGraphForType(model['@type'], model['@context']!).pipe(
      map(shapesGraph => {
        return {
          shapesGraph: shapesGraph,
          modelContext: model['@context'] ?? this.configService.config.appContext,
        };
      })
    );
  }

  save(graph: JsonModel, definition: ShaclHelperDefinition): Observable<JsonModel> {
    let typedResourceGraph = this.resourceGraphService.jsonModelToResourceGraphRaw(graph, definition) as TypedResourceGraph;
    typedResourceGraph = this.processBeforeSave(typedResourceGraph);
    console.log(JSON.stringify(typedResourceGraph, null, 2));
    this.state = produce(this.state, draft => {
      draft.graphs = draft.graphs.filter(item => item.data.uri !== typedResourceGraph.data.uri);
      draft.graphs.push(typedResourceGraph);
    });

    return timer(500).pipe(map(() => this.resourceGraphService.resourceGraphRawToJsonModel(typedResourceGraph, definition)));
  }

  search(query?: string, type?: string): Observable<JsonModel[]> {
    return timer(500).pipe(
      switchMap(async () => {
        const models: JsonModel[] = [this.configService.mainShapesGraph];
        for (const graph of this.state.graphs) {
          const model = await this.mapToJsonModel(graph).toPromise();
          models.push(model);
        }

        return models;
      }),
      map(graphs => {
        if (!type) return graphs;
        return graphs.filter(graph => isOfType(graph, type));
      })
    );
  }

  getAllRootTypes(): Observable<string[]> {
    return this.getAllShapesGraphs().pipe(
      map(shapesGraph => {
        const rootTypes: string[] = [];
        shapesGraph.forEach(shapesGraph =>
          shapesGraph['shacz:shapes']?.forEach(nodeShape => {
            if (nodeShape['shacz:isRoot'] && nodeShape['sh:targetClass']) {
              const expandedType = this.prefixCc.convertUri(
                nodeShape['sh:targetClass'],
                shapesGraph['@context']!,
                this.configService.config.appContext
              );
              rootTypes.push(expandedType);
            }
          })
        );
        return rootTypes;
      })
    );
  }

  delete(uri: string): Observable<unknown> {
    this.state = produce(this.state, draft => {
      draft.graphs = draft.graphs.filter(item => item.data.uri !== uri);
    });

    return timer(500);
  }

  private mapToJsonModel(graph: TypedResourceGraph): Observable<JsonModel> {
    return this.getShapesGraphForType(graph.data.type, graph.context!).pipe(
      map(shapesGraph => {
        const definition: ShaclHelperDefinition = { modelContext: graph.context ?? this.configService.config.appContext, shapesGraph };
        return this.resourceGraphService.resourceGraphRawToJsonModel(graph, definition);
      })
    );
  }

  private processBeforeSave(graph: TypedResourceGraph): TypedResourceGraph {
    return produce(graph, draft => {
      this.changeUrisOfNode(draft.data);
      draft.included?.forEach(node => this.changeUrisOfNode(node));
    });
  }

  private get state(): State {
    let item = localStorage.getItem(this.localStorageKey);
    if (!item) {
      this.state = { graphs: [] };
      return this.state;
    }
    return JSON.parse(item);
  }

  private set state(value: State) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(value, null, 2));
  }

  private changeUrisOfNode(typedResource: TypedResource): void {
    typedResource.uri = this.changeUri(typedResource.uri);
    if (typedResource.references) {
      Object.entries(typedResource.references).forEach(([key, value]) => {
        typedResource.references![key] = this.changeManyUris(value);
      });
    }
  }

  private changeManyUris(value: Many<string>): Many<string> {
    const isArray = Array.isArray(value);
    const newValues = manyToArray(value).map(v => this.changeUri(v));
    return isArray ? newValues : newValues[0];
  }

  private changeUri(uri: string): string {
    return uri.replace(this.configService.config.newModelUriPrefix, 'http://cogni.zone/data-model#');
  }

  private getAllShapesGraphs(): Observable<ShaczShapesGraph[]> {
    const allShapesGraph = [this.configService.mainShapesGraph];
    this.state.graphs
      .filter(graph => {
        return isOfType(graph.data.type, 'shacz:ShapesGraph');
      })
      .forEach(graph => {
        const definition: ShaclHelperDefinition = { modelContext: graph.context ?? {}, shapesGraph: this.configService.mainShapesGraph };
        const shapesGraph = this.resourceGraphService.resourceGraphRawToJsonModel(graph, definition);

        allShapesGraph.push(shapesGraph);
      });
    return of(allShapesGraph);
  }

  private getDefaultGraphs(): Observable<TypedResourceGraph[]> {
    const person$ = this.http.get<TypedResourceGraph>('assets/shacl/person.shacl.json');
    const skos$ = this.http.get<TypedResourceGraph>('assets/shacl/skos.shacl.json');
    const legalInstitution$ = this.http.get<TypedResourceGraph>('assets/shacl/legal-institution.json');
    const consolidationAbstractShacl$ = this.http.get<TypedResourceGraph>('assets/shacl/consolidation-abstract.shacl.json');
    const consolidationAbstract1$ = this.http.get<TypedResourceGraph>('assets/shacl/consolidation-abstract-1.json');

    return combineLatest([person$, skos$, legalInstitution$, consolidationAbstractShacl$, consolidationAbstract1$]);
  }
}

interface State {
  graphs: TypedResourceGraph[];
}

export function graphClientInit(graphClient: GraphClient): () => Promise<unknown> {
  return () => graphClient.init();
}

export const graphClientInitProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: graphClientInit,
  deps: [GraphClient],
  multi: true,
};
