---
id: "OperationUtils"
title: "Class: OperationUtils"
sidebar_label: "OperationUtils"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new OperationUtils**()

## Methods

### getGroup

▸ **getGroup**(`groups`, `path`): `undefined` \| [`OperationGroup`](../interfaces/OperationGroup)

#### Parameters

| Name | Type |
| :------ | :------ |
| `groups` | `Many`<[`OperationGroup`](../interfaces/OperationGroup)\> |
| `path` | `Many`<[`OperationGroupDescriptionLike`](../modules#operationgroupdescriptionlike)\> |

#### Returns

`undefined` \| [`OperationGroup`](../interfaces/OperationGroup)

#### Defined in

[libs/operation/src/lib/services/operation-utils.service.ts:8](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/services/operation-utils.service.ts#L8)

___

### getOperation

▸ **getOperation**(`groups`, `path`, `operationId`): `undefined` \| [`Operation`](../interfaces/Operation)

#### Parameters

| Name | Type |
| :------ | :------ |
| `groups` | `Many`<[`OperationGroup`](../interfaces/OperationGroup)\> |
| `path` | `Many`<[`OperationGroupDescriptionLike`](../modules#operationgroupdescriptionlike)\> |
| `operationId` | `string` |

#### Returns

`undefined` \| [`Operation`](../interfaces/Operation)

#### Defined in

[libs/operation/src/lib/services/operation-utils.service.ts:20](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/services/operation-utils.service.ts#L20)
