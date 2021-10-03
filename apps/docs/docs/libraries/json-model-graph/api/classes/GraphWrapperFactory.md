---
id: "GraphWrapperFactory"
title: "Class: GraphWrapperFactory"
sidebar_label: "GraphWrapperFactory"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GraphWrapperFactory**(`graphService`, `jsonModelService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphService` | [`GraphService`](GraphService) |
| `jsonModelService` | `JsonModelService` |

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.factory.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.factory.ts#L10)

## Methods

### getNodeWrapper

▸ **getNodeWrapper**<`T`\>(`rootUri`, `nodeUri`): [`NodeWrapper`](NodeWrapper)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |
| `nodeUri` | `string` |

#### Returns

[`NodeWrapper`](NodeWrapper)<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.factory.ts:16](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.factory.ts#L16)

___

### getWrapper

▸ **getWrapper**(`rootUri`, `apName`): [`GraphWrapper`](GraphWrapper)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |
| `apName` | `string` |

#### Returns

[`GraphWrapper`](GraphWrapper)

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.factory.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.factory.ts#L12)
