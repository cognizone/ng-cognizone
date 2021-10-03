---
id: "GraphState"
title: "Class: GraphState"
sidebar_label: "GraphState"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GraphState**(`jsonModelService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `jsonModelService` | `JsonModelService` |
| `logger` | `Logger` |

#### Defined in

[libs/json-model-graph/src/lib/store/graph.state.ts:41](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.state.ts#L41)

## Methods

### removeGraph

▸ **removeGraph**(`ctx`, `__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `StateContext`<[`GraphStateModel`](../interfaces/GraphStateModel)\> |
| `__namedParameters` | [`RemoveGraph`](RemoveGraph) |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/store/graph.state.ts:58](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.state.ts#L58)

___

### reset

▸ **reset**(`__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `StateContext`<[`GraphStateModel`](../interfaces/GraphStateModel)\> |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/store/graph.state.ts:86](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.state.ts#L86)

___

### setGraph

▸ **setGraph**(`ctx`, `__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `StateContext`<[`GraphStateModel`](../interfaces/GraphStateModel)\> |
| `__namedParameters` | [`SetGraph`](SetGraph) |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/store/graph.state.ts:46](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.state.ts#L46)

___

### updateNode

▸ **updateNode**(`ctx`, `__namedParameters`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `StateContext`<[`GraphStateModel`](../interfaces/GraphStateModel)\> |
| `__namedParameters` | [`UpdateNode`](UpdateNode) |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/store/graph.state.ts:69](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.state.ts#L69)
