---
id: "OperationGroupDebug"
title: "Class: OperationGroupDebug"
sidebar_label: "OperationGroupDebug"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `OnDestroy$`

  ↳ **`OperationGroupDebug`**

## Implements

- `OnDestroy`

## Constructors

### constructor

• **new OperationGroupDebug**(`renderer`, `dialog`, `operationsService`, `operationUtils`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `Renderer2` |
| `dialog` | `MatDialog` |
| `operationsService` | [`OperationsService`](OperationsService) |
| `operationUtils` | [`OperationUtils`](OperationUtils) |
| `logger` | `Logger` |

#### Overrides

OnDestroy$.constructor

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:29](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L29)

## Properties

### borderStyle

• `Private` **borderStyle**: `string`[]

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:27](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L27)

___

### colors

• `Private` **colors**: `string`[]

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:25](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L25)

___

### debugDiv

• `Private` `Optional` **debugDiv**: `HTMLElement`

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L21)

___

### onDestroy$

• **onDestroy$**: `Observable`<`void`\>

#### Inherited from

OnDestroy$.onDestroy$

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L9)

___

### options

• `Private` `Optional` **options**: [`OperationGroupDebugOptions`](../interfaces/OperationGroupDebugOptions)

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L19)

___

### subSink

• **subSink**: `Subscription`

#### Inherited from

OnDestroy$.subSink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L10)

___

### unListen

• `Private` `Optional` **unListen**: `Function`

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L23)

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

### emptySink

▸ **emptySink**(): `void`

#### Returns

`void`

#### Inherited from

OnDestroy$.emptySink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L13)

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

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L12)

___

### getStyle

▸ `Private` **getStyle**(`path`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | [`OperationGroupDescription`](../interfaces/OperationGroupDescription)[] |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `borderStyle` | `string` |
| `color` | `string` |
| `zIndex` | `string` |

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:100](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L100)

___

### init

▸ **init**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`OperationGroupDebugOptions`](../interfaces/OperationGroupDebugOptions) |

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:45](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L45)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Overrides

OnDestroy$.ngOnDestroy

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:40](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L40)

___

### openOperationViewerModal

▸ `Private` **openOperationViewerModal**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:122](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L122)

___

### removeDebug

▸ `Private` **removeDebug**(): `void`

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:110](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L110)

___

### renderDebug

▸ `Private` **renderDebug**(`path`, `el`, `group`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | [`OperationGroupDescription`](../interfaces/OperationGroupDescription)[] |
| `el` | `Element` |
| `group` | `Nil`<[`OperationGroup`](../interfaces/OperationGroup)\> |

#### Returns

`void`

#### Defined in

[libs/operation/src/lib/services/operation-group-debug.service.ts:69](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/operation/src/lib/services/operation-group-debug.service.ts#L69)

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

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L11)

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

OnDestroy$.\_\_@hasInstance@57980

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
