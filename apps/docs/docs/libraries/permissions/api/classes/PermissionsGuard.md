---
id: "PermissionsGuard"
title: "Class: PermissionsGuard"
sidebar_label: "PermissionsGuard"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `CanActivate`

## Constructors

### constructor

• **new PermissionsGuard**(`permissionsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `permissionsService` | [`PermissionsService`](PermissionsService) |

#### Defined in

[libs/permissions/src/lib/guards/permissions.guard.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/permissions/src/lib/guards/permissions.guard.ts#L13)

## Methods

### canActivate

▸ **canActivate**(`next`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `next` | `ActivatedRouteSnapshot` |

#### Returns

`Observable`<`boolean`\>

#### Implementation of

CanActivate.canActivate

#### Defined in

[libs/permissions/src/lib/guards/permissions.guard.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/permissions/src/lib/guards/permissions.guard.ts#L15)
