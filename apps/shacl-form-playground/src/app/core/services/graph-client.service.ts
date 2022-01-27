import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JsonModel, ResourceGraphService } from '@cognizone/json-model';
import { Many, manyToArray, TypedResource, TypedResourceGraph } from '@cognizone/model-utils';
import { ShaclHelperDefinition, ShaczShapesGraph } from '@cognizone/shacl/core';
import produce from 'immer';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, map, shareReplay, tap } from 'rxjs/operators';

import { ShaclConfig } from '../models';

// TODO mix of client layer and state, should be separate
// TODO better initialization of config and shapesGraph
@Injectable({ providedIn: 'root' })
export class GraphClient {
  shapesGraph$: Observable<ShaczShapesGraph> = this.getShapesGraph().pipe(shareReplay(1));
  config$: Observable<ShaclConfig> = this.getConfig().pipe(
    tap(config => (this.config = config)),
    shareReplay(1)
  );

  config!: ShaclConfig;
  private readonly localStorageKey: string = 'shaclGraphs';

  constructor(private http: HttpClient, private resourceGraphService: ResourceGraphService) {}

  getGraphByUri(uri: string, definition: Pick<ShaclHelperDefinition, 'shapesGraph'>): Observable<JsonModel> {
    const graph = this.state.graphs.find(g => g.data.uri === uri);
    if (!graph) return throwError(new Error(`Could not find graph with given uri '${uri}'`));
    const fullDefinition: ShaclHelperDefinition = { ...definition, modelContext: graph.context ?? {} };
    return timer(500).pipe(map(() => this.resourceGraphService.resourceGraphRawToJsonModel(graph, fullDefinition)));
  }

  save(graph: JsonModel, definition: ShaclHelperDefinition): Observable<JsonModel> {
    let typedResourceGraph = this.resourceGraphService.jsonModelToResourceGraphRaw(graph, definition) as TypedResourceGraph;
    typedResourceGraph = this.processBeforeSave(typedResourceGraph);
    this.state = produce(this.state, draft => {
      draft.graphs = draft.graphs.filter(item => item.data.uri !== typedResourceGraph.data.uri);
      draft.graphs.push(typedResourceGraph);
    });

    return timer(500).pipe(map(() => this.resourceGraphService.resourceGraphRawToJsonModel(typedResourceGraph, definition)));
  }

  search(query: string | undefined): Observable<JsonModel[]> {
    return this.shapesGraph$.pipe(
      delay(500),
      map(shapesGraph => {
        return this.state.graphs.map(graph => {
          const definition: ShaclHelperDefinition = { modelContext: graph.context ?? {}, shapesGraph };
          return this.resourceGraphService.resourceGraphRawToJsonModel(graph, definition);
        });
      })
    );
  }

  private getShapesGraph(): Observable<ShaczShapesGraph> {
    return this.http
      .get<TypedResourceGraph>('assets/shacl/person.shacl.json')
      .pipe(map(graph => this.resourceGraphService.resourceGraphRawToJsonModel(graph) as ShaczShapesGraph));
  }

  private getConfig(): Observable<ShaclConfig> {
    return this.http.get<ShaclConfig>('assets/shacl/config.json');
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
    return uri.replace('http://resource/', 'http://cogni.zone/data-model#');
  }
}

interface State {
  graphs: TypedResourceGraph[];
}
