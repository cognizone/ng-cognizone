---
id: "OperationsService"
title: "Class: OperationsService"
sidebar_label: "OperationsService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new OperationsService**(`store`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store` |

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L26)

## Accessors

### debugEnabled$

• `get` **debugEnabled$**(): `Observable`<`boolean`\>

#### Returns

`Observable`<`boolean`\>

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L18)

___

### groups

• `get` **groups**(): [`OperationGroup`](../interfaces/OperationGroup)[]

#### Returns

[`OperationGroup`](../interfaces/OperationGroup)[]

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L22)

___

### groups$

• `get` **groups$**(): `Observable`<[`OperationGroup`](../interfaces/OperationGroup)[]\>

#### Returns

`Observable`<[`OperationGroup`](../interfaces/OperationGroup)[]\>

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L14)

___

### state$

• `Private` `get` **state$**(): `Observable`<[`OperationsStateModel`](../interfaces/OperationsStateModel)\>

#### Returns

`Observable`<[`OperationsStateModel`](../interfaces/OperationsStateModel)\>

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:45](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L45)

## Methods

### removeOperationGroup

▸ **removeOperationGroup**(`description`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `description` | [`OperationGroupDescription`](../interfaces/OperationGroupDescription) |

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:32](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L32)

___

### setOperationGroups

▸ **setOperationGroups**(`groups`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `groups` | [`OperationGroup`](../interfaces/OperationGroup)[] |

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:28](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L28)

___

### toggleDebugEnabled

▸ **toggleDebugEnabled**(): `void`

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:41](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L41)

___

### updateOperationGroup

▸ **updateOperationGroup**(...`groups`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `...groups` | [`OperationGroup`](../interfaces/OperationGroup)[] |

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operations.service.ts:36](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operations.service.ts#L36)
