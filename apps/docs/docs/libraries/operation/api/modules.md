---
id: "modules"
title: "@cognizone/operation"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [GetOperationDirective](classes/GetOperationDirective)
- [IfOperationDirective](classes/IfOperationDirective)
- [OperationDebug](classes/OperationDebug)
- [OperationDirective](classes/OperationDirective)
- [OperationGroupDebug](classes/OperationGroupDebug)
- [OperationGroupDirective](classes/OperationGroupDirective)
- [OperationGuard](classes/OperationGuard)
- [OperationUtils](classes/OperationUtils)
- [OperationViewerModalComponent](classes/OperationViewerModalComponent)
- [OperationsModule](classes/OperationsModule)
- [OperationsService](classes/OperationsService)
- [OperationsState](classes/OperationsState)
- [RemoveOperationGroup](classes/RemoveOperationGroup)
- [SetOperationGroups](classes/SetOperationGroups)
- [ToggleDebugEnabled](classes/ToggleDebugEnabled)
- [UpdateOperationGroups](classes/UpdateOperationGroups)

## Interfaces

- [Operation](interfaces/Operation)
- [OperationChangeEvent](interfaces/OperationChangeEvent)
- [OperationDebugOptions](interfaces/OperationDebugOptions)
- [OperationGroup](interfaces/OperationGroup)
- [OperationGroupDebugOptions](interfaces/OperationGroupDebugOptions)
- [OperationGroupDescription](interfaces/OperationGroupDescription)
- [OperationViewerModalComponentData](interfaces/OperationViewerModalComponentData)
- [OperationsStateModel](interfaces/OperationsStateModel)

## Type aliases

### OperationGroupDescriptionLike

Ƭ **OperationGroupDescriptionLike**: [`OperationGroupDescription`](interfaces/OperationGroupDescription) \| `string`

#### Defined in

[libs/operation/src/lib/models/operation.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/models/operation.ts#L12)

## Variables

### OPERATIONS\_STATE\_TOKEN

• **OPERATIONS\_STATE\_TOKEN**: `StateToken`<[`OperationsStateModel`](interfaces/OperationsStateModel)\>

#### Defined in

[libs/operation/src/lib/store/operations.state.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/store/operations.state.ts#L13)

## Functions

### toOperationGroupDescription

▸ **toOperationGroupDescription**(`value`): [`OperationGroupDescription`](interfaces/OperationGroupDescription)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`OperationGroupDescriptionLike`](modules#operationgroupdescriptionlike) |

#### Returns

[`OperationGroupDescription`](interfaces/OperationGroupDescription)

#### Defined in

[libs/operation/src/lib/models/operation.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/operation/src/lib/models/operation.ts#L14)
