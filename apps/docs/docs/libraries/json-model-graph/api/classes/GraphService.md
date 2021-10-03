---
id: "GraphService"
title: "Class: GraphService"
sidebar_label: "GraphService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GraphService**(`store`, `logger`, `jsonModelService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store` |
| `logger` | `Logger` |
| `jsonModelService` | `JsonModelService` |

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:26](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L26)

## Properties

### copyCount

• `Private` **copyCount**: `number` = `0`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:20](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L20)

___

### state$

• **state$**: `Observable`<[`GraphStateModel`](../interfaces/GraphStateModel)\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L18)

## Accessors

### state

• `get` **state**(): [`GraphStateModel`](../interfaces/GraphStateModel)

#### Returns

[`GraphStateModel`](../interfaces/GraphStateModel)

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:22](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L22)

## Methods

### copyGraph

▸ **copyGraph**(`sourceUri`, `targetUri?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceUri` | `string` |
| `targetUri` | `string` |

#### Returns

`string`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:87](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L87)

___

### getGraph

▸ **getGraph**<`T`\>(`rootUri`): `Observable`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |

#### Returns

`Observable`<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:34](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L34)

___

### getGraphSnapshot

▸ **getGraphSnapshot**<`T`\>(`rootUri`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |

#### Returns

`T`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:50](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L50)

___

### getLinkedGraph

▸ **getLinkedGraph**<`T`\>(`rootUri`): `Observable`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |

#### Returns

`Observable`<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:58](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L58)

___

### getLinkedGraphSnapshot

▸ **getLinkedGraphSnapshot**<`T`\>(`rootUri`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |

#### Returns

`T`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:65](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L65)

___

### getNode

▸ **getNode**<`T`\>(`rootUri`, `nodeUri`): `Observable`<`JsonModelFlat`<`T`\>\>

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

`Observable`<`JsonModelFlat`<`T`\>\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:42](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L42)

___

### getNodeSnapshot

▸ **getNodeSnapshot**<`T`\>(`rootUri`, `nodeUri`): `JsonModelFlat`<`T`\>

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

`JsonModelFlat`<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:54](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L54)

___

### hasGraph

▸ **hasGraph**(`rootUri`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |

#### Returns

`boolean`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:30](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L30)

___

### modifyNode

▸ **modifyNode**<`T`\>(`rootUri`, `nodeUri`, `recipe`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |
| `nodeUri` | `string` |
| `recipe` | [`NodeRecipe`](../modules#noderecipe)<`T`\> |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:82](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L82)

___

### removeGraph

▸ **removeGraph**(`rootUri`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:102](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L102)

___

### reset

▸ **reset**(): `Observable`<`void`\>

#### Returns

`Observable`<`void`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:78](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L78)

___

### setGraph

▸ **setGraph**<`T`\>(`model`, `apName`): `Observable`<`unknown`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `T` |
| `apName` | `string` |

#### Returns

`Observable`<`unknown`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:73](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L73)

___

### update

▸ **update**(`rootUri`, ...`models`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootUri` | `string` |
| `...models` | `JsonModelFlat`<`JsonModel`\>[] |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/services/graph.service.ts:69](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph.service.ts#L69)
