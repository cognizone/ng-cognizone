---
id: "modules"
title: "@cognizone/json-model-graph"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [GraphAndControlLinkingService](classes/GraphAndControlLinkingService)
- [GraphService](classes/GraphService)
- [GraphState](classes/GraphState)
- [GraphWrapper](classes/GraphWrapper)
- [GraphWrapperFactory](classes/GraphWrapperFactory)
- [IfAttributeInApDirective](classes/IfAttributeInApDirective)
- [JsonModelGraphModule](classes/JsonModelGraphModule)
- [JsonModelGraphRootModule](classes/JsonModelGraphRootModule)
- [NodeAttributeDirective](classes/NodeAttributeDirective)
- [NodeAttributeLinkedDirective](classes/NodeAttributeLinkedDirective)
- [NodeUriDirective](classes/NodeUriDirective)
- [NodeWrapper](classes/NodeWrapper)
- [RemoveGraph](classes/RemoveGraph)
- [Reset](classes/Reset)
- [RootUriDirective](classes/RootUriDirective)
- [SetGraph](classes/SetGraph)
- [UpdateNode](classes/UpdateNode)

## Interfaces

- [GraphStateModel](interfaces/GraphStateModel)
- [LinkControlToNodeAttributeOptions](interfaces/LinkControlToNodeAttributeOptions)
- [LinkReferenceOptions](interfaces/LinkReferenceOptions)

## Type aliases

### GraphStatus

Ƭ **GraphStatus**: ``"pristine"`` \| ``"touched"``

#### Defined in

[libs/json-model-graph/src/lib/models/graph-status.ts:1](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/models/graph-status.ts#L1)

___

### NodeRecipe

Ƭ **NodeRecipe**<`T`\>: (`draft`: `JsonModelFlat`<`T`\>) => `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Type declaration

▸ (`draft`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `draft` | `JsonModelFlat`<`T`\> |

##### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/models/node-recipe.ts:3](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/models/node-recipe.ts#L3)

## Variables

### GRAPH\_STATE\_TOKEN

• **GRAPH\_STATE\_TOKEN**: `StateToken`<[`GraphStateModel`](interfaces/GraphStateModel)\>

#### Defined in

[libs/json-model-graph/src/lib/store/graph.state.ts:29](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.state.ts#L29)
