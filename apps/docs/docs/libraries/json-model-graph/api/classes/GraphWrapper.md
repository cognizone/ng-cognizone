---
id: "GraphWrapper"
title: "Class: GraphWrapper"
sidebar_label: "GraphWrapper"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GraphWrapper**(`graphService`, `jsonModelService`, `rootUri`, `apName`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphService` | [`GraphService`](GraphService) |
| `jsonModelService` | `JsonModelService` |
| `rootUri` | `string` |
| `apName` | `string` |

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L9)

## Properties

### rootUri

• **rootUri**: `string`

## Methods

### addReference

▸ **addReference**<`T`, `U`\>(`node`, `referenceKey`, `referenceUri`, `referenceType`): [`T`, `U`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |
| `U` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |
| `referenceKey` | keyof `T` |
| `referenceUri` | `string` |
| `referenceType` | `string` |

#### Returns

[`T`, `U`]

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:65](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L65)

___

### createNewJsonModel

▸ **createNewJsonModel**<`T`\>(`types`): `JsonModelFlat`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `Many`<`string`\> |

#### Returns

`JsonModelFlat`<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:36](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L36)

___

### getGraph

▸ **getGraph**(): `Observable`<`JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>\>\>

#### Returns

`Observable`<`JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>\>\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:24](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L24)

___

### getGraphSnapshot

▸ **getGraphSnapshot**(): `JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>\>

#### Returns

`JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:28](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L28)

___

### getLinkedGraphSnapshot

▸ **getLinkedGraphSnapshot**<`T`\>(): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Returns

`T`

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:32](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L32)

___

### getNode

▸ **getNode**<`T`\>(`nodeUri`): `Observable`<`JsonModelFlat`<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeUri` | `Uri`<`T`\> |

#### Returns

`Observable`<`JsonModelFlat`<`T`\>\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:16](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L16)

___

### getNodeSnapshot

▸ **getNodeSnapshot**<`T`\>(`nodeUri`): `JsonModelFlat`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeUri` | `Uri`<`T`\> |

#### Returns

`JsonModelFlat`<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:20](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L20)

___

### setReference

▸ **setReference**<`T`, `U`\>(`node`, `referenceKey`, `referenceUri`, `referenceType`): [`T`, `U`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |
| `U` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `T` |
| `referenceKey` | keyof `T` |
| `referenceUri` | `string` |
| `referenceType` | `string` |

#### Returns

[`T`, `U`]

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:44](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L44)

___

### update

▸ **update**(...`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...nodes` | `JsonModel`[] |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/services/graph-wrapper.ts:40](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-wrapper.ts#L40)
