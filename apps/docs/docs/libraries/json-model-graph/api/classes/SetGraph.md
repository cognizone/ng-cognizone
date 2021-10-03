---
id: "SetGraph"
title: "Class: SetGraph"
sidebar_label: "SetGraph"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new SetGraph**(`graph`, `apName`, `status?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `graph` | `JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>\> | `undefined` |
| `apName` | `string` | `undefined` |
| `status` | [`GraphStatus`](../modules#graphstatus) | `'pristine'` |

#### Defined in

[libs/json-model-graph/src/lib/store/graph.actions.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.actions.ts#L9)

## Properties

### apName

• **apName**: `string`

___

### graph

• **graph**: `JsonModelFlatGraph`<`JsonModelFlat`<`JsonModel`\>\>

___

### status

• **status**: [`GraphStatus`](../modules#graphstatus) = `'pristine'`

___

### type

▪ `Static` `Readonly` **type**: `string` = `'[Graph] set graph'`

#### Defined in

[libs/json-model-graph/src/lib/store/graph.actions.ts:7](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/store/graph.actions.ts#L7)
