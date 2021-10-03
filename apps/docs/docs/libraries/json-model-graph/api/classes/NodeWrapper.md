---
id: "NodeWrapper"
title: "Class: NodeWrapper<T>"
sidebar_label: "NodeWrapper"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

## Constructors

### constructor

• **new NodeWrapper**<`T`\>(`graphService`, `rootUri`, `nodeUri`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphService` | [`GraphService`](GraphService) |
| `rootUri` | `string` |
| `nodeUri` | `Uri`<`T`\> |

#### Defined in

[libs/json-model-graph/src/lib/services/node-wrapper.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/node-wrapper.ts#L14)

## Properties

### nodeUri

• **nodeUri**: `Uri`<`T`\>

___

### rootUri

• **rootUri**: `string`

___

### value$

• **value$**: `Observable`<`JsonModelFlat`<`T`\>\>

#### Defined in

[libs/json-model-graph/src/lib/services/node-wrapper.ts:8](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/node-wrapper.ts#L8)

## Accessors

### value

• `get` **value**(): `JsonModelFlat`<`T`\>

#### Returns

`JsonModelFlat`<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/services/node-wrapper.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/node-wrapper.ts#L10)

## Methods

### getProp

▸ **getProp**<`U`\>(`attributeKey`): `Observable`<`JsonModelFlat`<`T`\>[`U`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `attributeKey` | `U` |

#### Returns

`Observable`<`JsonModelFlat`<`T`\>[`U`]\>

#### Defined in

[libs/json-model-graph/src/lib/services/node-wrapper.ts:16](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/node-wrapper.ts#L16)
