---
id: "OperationGuard"
title: "Class: OperationGuard"
sidebar_label: "OperationGuard"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `CanActivate`

## Constructors

### constructor

• **new OperationGuard**(`operationsService`, `operationUtils`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `operationsService` | [`OperationsService`](OperationsService) |
| `operationUtils` | [`OperationUtils`](OperationUtils) |

#### Defined in

[libs/operation/src/lib/guards/operation.guard.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/guards/operation.guard.ts#L12)

## Methods

### canActivate

▸ **canActivate**(`route`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `route` | `ActivatedRouteSnapshot` |

#### Returns

`boolean`

#### Implementation of

CanActivate.canActivate

#### Defined in

[libs/operation/src/lib/guards/operation.guard.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/guards/operation.guard.ts#L14)
