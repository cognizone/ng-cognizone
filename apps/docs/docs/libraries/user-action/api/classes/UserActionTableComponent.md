---
id: "UserActionTableComponent"
title: "Class: UserActionTableComponent"
sidebar_label: "UserActionTableComponent"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `OnDestroy$`

  ↳ **`UserActionTableComponent`**

## Implements

- `OnInit`

## Constructors

### constructor

• **new UserActionTableComponent**(`userActionService`, `fb`, `cdr`, `optionsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `userActionService` | [`UserActionService`](UserActionService) |
| `fb` | `FormBuilder` |
| `cdr` | `ChangeDetectorRef` |
| `optionsService` | [`UserActionOptionsService`](UserActionOptionsService) |

#### Overrides

OnDestroy$.constructor

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:45](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L45)

## Properties

### actionNameOptionsProvider

• **actionNameOptionsProvider**: `SelectOptionsProvider`<`string`\>

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:19](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L19)

___

### actions

• **actions**: [`UserAction`](../interfaces/UserAction)[] = `[]`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:25](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L25)

___

### columns

• **columns**: `string`[]

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:35](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L35)

___

### form

• **form**: `FormGroup`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:37](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L37)

___

### onDestroy$

• **onDestroy$**: `Observable`<`void`\>

#### Inherited from

OnDestroy$.onDestroy$

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L9)

___

### pageIndex

• **pageIndex**: `number` = `0`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:29](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L29)

___

### pageSize

• **pageSize**: `number` = `10`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:27](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L27)

___

### possibleActionNames

• **possibleActionNames**: `string`[] = `[]`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:33](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L33)

___

### subSink

• **subSink**: `Subscription`

#### Inherited from

OnDestroy$.subSink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L10)

___

### totalResults

• **totalResults**: `number` = `0`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:31](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L31)

___

### userFullNameAttribute

• **userFullNameAttribute**: `string`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:21](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L21)

___

### userIvAttribute

• **userIvAttribute**: `string`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L23)

___

### arguments

▪ `Static` **arguments**: `any`

#### Inherited from

OnDestroy$.arguments

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:302

___

### caller

▪ `Static` **caller**: `Function`

#### Inherited from

OnDestroy$.caller

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:303

___

### length

▪ `Static` `Readonly` **length**: `number`

#### Inherited from

OnDestroy$.length

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:299

___

### name

▪ `Static` `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

OnDestroy$.name

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es2015.core.d.ts:97

## Methods

### downloadAction

▸ **downloadAction**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`UserAction`](../interfaces/UserAction) |

#### Returns

`void`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:71](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L71)

___

### emptySink

▸ **emptySink**(): `void`

#### Returns

`void`

#### Inherited from

OnDestroy$.emptySink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L13)

___

### firstUntilDestroyed

▸ **firstUntilDestroyed**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

#### Inherited from

OnDestroy$.firstUntilDestroyed

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L12)

___

### getUserActions

▸ `Private` **getUserActions**(): `void`

#### Returns

`void`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:76](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L76)

___

### initOptionsProvider

▸ `Private` **initOptionsProvider**(): `void`

#### Returns

`void`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:88](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L88)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Inherited from

OnDestroy$.ngOnDestroy

#### Defined in

node_modules/@angular/core/core.d.ts:5167

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:54](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L54)

___

### setPage

▸ **setPage**(`page`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `PageEvent` |

#### Returns

`void`

#### Defined in

[libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts:65](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/components/user-action-table/user-action-table.component.ts#L65)

___

### untilDestroyed

▸ **untilDestroyed**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

#### Inherited from

OnDestroy$.untilDestroyed

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L11)

___

### [hasInstance]

▸ `Static` **[hasInstance]**(`value`): `boolean`

Determines whether the given value inherits from this function if this function was used
as a constructor function.

A constructor function can control which objects are recognized as its instances by
'instanceof' by overriding this method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

#### Inherited from

OnDestroy$.\_\_@hasInstance@68226

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:162

___

### apply

▸ `Static` **apply**<`T`\>(`thisArg`): `void`

Calls the function with the specified object as the this value and the elements of specified array as the arguments.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thisArg` | `T` | The object to be used as the this object. |

#### Returns

`void`

#### Inherited from

OnDestroy$.apply

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:364

▸ `Static` **apply**<`T`, `A`\>(`thisArg`, `args`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `A` | extends `any`[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thisArg` | `T` |
| `args` | `A` |

#### Returns

`void`

#### Inherited from

OnDestroy$.apply

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:365

▸ `Static` **apply**(`thisArg`, `argArray?`): `any`

Calls the function, substituting the specified object for the this value of the function, and the specified array for the arguments of the function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thisArg` | `any` | The object to be used as the this object. |
| `argArray?` | `any` | A set of arguments to be passed to the function. |

#### Returns

`any`

#### Inherited from

OnDestroy$.apply

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:278

___

### bind

▸ `Static` **bind**<`T`\>(`thisArg`): `T`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thisArg` | `any` | The object to be used as the this object. |

#### Returns

`T`

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:380

▸ `Static` **bind**<`A0`, `A`, `R`\>(`thisArg`, `arg0`): (...`args`: `A`) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A0` | `A0` |
| `A` | extends `any`[] |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thisArg` | `any` |
| `arg0` | `A0` |

#### Returns

`fn`

• **new bind**(...`args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:381

▸ `Static` **bind**<`A0`, `A1`, `A`, `R`\>(`thisArg`, `arg0`, `arg1`): (...`args`: `A`) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A0` | `A0` |
| `A1` | `A1` |
| `A` | extends `any`[] |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thisArg` | `any` |
| `arg0` | `A0` |
| `arg1` | `A1` |

#### Returns

`fn`

• **new bind**(...`args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:382

▸ `Static` **bind**<`A0`, `A1`, `A2`, `A`, `R`\>(`thisArg`, `arg0`, `arg1`, `arg2`): (...`args`: `A`) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A0` | `A0` |
| `A1` | `A1` |
| `A2` | `A2` |
| `A` | extends `any`[] |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thisArg` | `any` |
| `arg0` | `A0` |
| `arg1` | `A1` |
| `arg2` | `A2` |

#### Returns

`fn`

• **new bind**(...`args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:383

▸ `Static` **bind**<`A0`, `A1`, `A2`, `A3`, `A`, `R`\>(`thisArg`, `arg0`, `arg1`, `arg2`, `arg3`): (...`args`: `A`) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A0` | `A0` |
| `A1` | `A1` |
| `A2` | `A2` |
| `A3` | `A3` |
| `A` | extends `any`[] |
| `R` | `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thisArg` | `any` |
| `arg0` | `A0` |
| `arg1` | `A1` |
| `arg2` | `A2` |
| `arg3` | `A3` |

#### Returns

`fn`

• **new bind**(...`args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `A` |

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:384

▸ `Static` **bind**<`AX`, `R`\>(`thisArg`, ...`args`): (...`args`: `AX`[]) => `R`

#### Type parameters

| Name |
| :------ |
| `AX` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `thisArg` | `any` |
| `...args` | `AX`[] |

#### Returns

`fn`

• **new bind**(...`args`)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `AX`[] |

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:385

▸ `Static` **bind**(`thisArg`, ...`argArray`): `any`

For a given function, creates a bound function that has the same body as the original function.
The this object of the bound function is associated with the specified object, and has the specified initial parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thisArg` | `any` | An object to which the this keyword can refer inside the new function. |
| `...argArray` | `any`[] | A list of arguments to be passed to the new function. |

#### Returns

`any`

#### Inherited from

OnDestroy$.bind

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:293

___

### call

▸ `Static` **call**<`T`, `A`\>(`thisArg`, ...`args`): `void`

Calls the function with the specified object as the this value and the specified rest arguments as the arguments.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `A` | extends `any`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thisArg` | `T` | The object to be used as the this object. |
| `...args` | `A` | Argument values to be passed to the function. |

#### Returns

`void`

#### Inherited from

OnDestroy$.call

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:372

▸ `Static` **call**(`thisArg`, ...`argArray`): `any`

Calls a method of an object, substituting another object for the current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `thisArg` | `any` | The object to be used as the current object. |
| `...argArray` | `any`[] | A list of arguments to be passed to the method. |

#### Returns

`any`

#### Inherited from

OnDestroy$.call

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:285

___

### toString

▸ `Static` **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

OnDestroy$.toString

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:296
