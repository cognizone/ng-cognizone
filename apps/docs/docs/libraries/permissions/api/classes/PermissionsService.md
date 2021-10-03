---
id: "PermissionsService"
title: "Class: PermissionsService"
sidebar_label: "PermissionsService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new PermissionsService**(`permissionsProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissionsProvider` | [`PermissionsProvider`](../interfaces/PermissionsProvider) |

#### Defined in

[libs/permissions/src/lib/services/permissions.service.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/permissions/src/lib/services/permissions.service.ts#L12)

## Properties

### permissions$

• **permissions$**: `Observable`<`string`[]\>

#### Defined in

[libs/permissions/src/lib/services/permissions.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/permissions/src/lib/services/permissions.service.ts#L10)

## Methods

### getPermissions

▸ `Private` **getPermissions**(): `Observable`<`string`[]\>

#### Returns

`Observable`<`string`[]\>

#### Defined in

[libs/permissions/src/lib/services/permissions.service.ts:20](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/permissions/src/lib/services/permissions.service.ts#L20)

___

### hasPermissions

▸ **hasPermissions**(`permissions`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissions` | `Nil`<`Many`<`string`\>\> |

#### Returns

`Observable`<`boolean`\>

#### Defined in

[libs/permissions/src/lib/services/permissions.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/permissions/src/lib/services/permissions.service.ts#L14)
