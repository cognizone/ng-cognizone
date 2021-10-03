---
id: "LoadingService"
title: "Class: LoadingService"
sidebar_label: "LoadingService"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `OnDestroy`

## Constructors

### constructor

• **new LoadingService**()

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L19)

## Properties

### \_loading$

• `Private` **\_loading$**: `BehaviorSubject`<`boolean`\>

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L15)

___

### loading$

• **loading$**: `Observable`<`boolean`\>

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L9)

___

### loadingCount

• `Private` **loadingCount**: `number` = `0`

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:17](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L17)

## Accessors

### loading

• `get` **loading**(): `boolean`

#### Returns

`boolean`

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L11)

## Methods

### addLoading

▸ **addLoading**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:24](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L24)

___

### asOperator

▸ **asOperator**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:34](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L34)

___

### evaluate

▸ `Private` **evaluate**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:45](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L45)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:41](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L41)

___

### removeLoading

▸ **removeLoading**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/services/loading.service.ts:29](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/services/loading.service.ts#L29)
