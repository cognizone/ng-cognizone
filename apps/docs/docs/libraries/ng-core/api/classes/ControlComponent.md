---
id: "ControlComponent"
title: "Class: ControlComponent<MODEL, EMBEDDED>"
sidebar_label: "ControlComponent"
sidebar_position: 0
custom_edit_url: null
---

**`deprecated`** you should implement ControlValueAccessor yourself, this was not a great idea in the end

## Type parameters

| Name | Type |
| :------ | :------ |
| `MODEL` | `MODEL` |
| `EMBEDDED` | `MODEL` |

## Hierarchy

- [`OnDestroy$`](OnDestroy_)

  ↳ **`ControlComponent`**

## Implements

- `OnInit`
- `ControlValueAccessor`

## Constructors

### constructor

• **new ControlComponent**<`MODEL`, `EMBEDDED`\>(`logger`, `cdr`, `controlContainer?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `MODEL` | `MODEL` |
| `EMBEDDED` | `MODEL` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | [`Logger`](Logger) |
| `cdr` | `ChangeDetectorRef` |
| `controlContainer?` | `ControlContainer` |

#### Overrides

[OnDestroy$](OnDestroy_).[constructor](OnDestroy_#constructor)

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:69](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L69)

## Properties

### \_formControl

• `Private` `Optional` **\_formControl**: `AbstractControl`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:65](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L65)

___

### \_formControlName

• `Private` `Optional` **\_formControlName**: `string`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:67](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L67)

___

### \_model

• `Protected` **\_model**: `MODEL`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L63)

___

### cdr

• `Protected` **cdr**: `ChangeDetectorRef`

___

### controlChanged

• `Protected` **controlChanged**: `Subject`<`void`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:61](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L61)

___

### controlContainer

• `Protected` `Optional` **controlContainer**: `ControlContainer`

___

### defaultValue

• `Optional` **defaultValue**: `MODEL`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:59](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L59)

___

### disabled

• **disabled**: `boolean` = `false`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:53](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L53)

___

### embeddedControl

• `Optional` **embeddedControl**: `AbstractControl`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:55](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L55)

___

### logger

• `Protected` **logger**: [`Logger`](Logger)

___

### name

• `Optional` **name**: `string`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L23)

___

### onDestroy$

• **onDestroy$**: `Observable`<`void`\>

#### Inherited from

[OnDestroy$](OnDestroy_).[onDestroy$](OnDestroy_#ondestroy$)

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L9)

___

### onModelChange

• `Protected` **onModelChange**: `Function`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:129](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L129)

___

### onModelTouched

• `Protected` **onModelTouched**: `Function`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:131](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L131)

___

### required

• `Optional` **required**: `boolean`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L20)

___

### subSink

• **subSink**: `Subscription`

#### Inherited from

[OnDestroy$](OnDestroy_).[subSink](OnDestroy_#subsink)

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L10)

___

### valueChanges

• `Optional` **valueChanges**: `Observable`<`any`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:57](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L57)

___

### arguments

▪ `Static` **arguments**: `any`

#### Inherited from

[OnDestroy$](OnDestroy_).[arguments](OnDestroy_#arguments)

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:302

___

### caller

▪ `Static` **caller**: `Function`

#### Inherited from

[OnDestroy$](OnDestroy_).[caller](OnDestroy_#caller)

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:303

___

### length

▪ `Static` `Readonly` **length**: `number`

#### Inherited from

[OnDestroy$](OnDestroy_).[length](OnDestroy_#length)

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:299

___

### name

▪ `Static` `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

[OnDestroy$](OnDestroy_).[name](OnDestroy_#name)

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es2015.core.d.ts:97

## Accessors

### formControl

• `get` **formControl**(): [`Maybe`](../modules#maybe)<`AbstractControl`\>

#### Returns

[`Maybe`](../modules#maybe)<`AbstractControl`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:36](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L36)

• `set` **formControl**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Maybe`](../modules#maybe)<`AbstractControl`\> |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:40](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L40)

___

### formControlName

• `get` **formControlName**(): [`Maybe`](../modules#maybe)<`string`\>

#### Returns

[`Maybe`](../modules#maybe)<`string`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L26)

• `set` **formControlName**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`Maybe`](../modules#maybe)<`string`\> |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:30](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L30)

___

### model

• `get` **model**(): `MODEL`

#### Returns

`MODEL`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:45](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L45)

• `set` **model**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `MODEL` |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:49](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L49)

## Methods

### bindEmbeddedControl

▸ `Private` **bindEmbeddedControl**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:133](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L133)

___

### computeName

▸ `Private` **computeName**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:160](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L160)

___

### computeRequired

▸ `Private` **computeRequired**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:145](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L145)

___

### embeddedValueToValue

▸ `Protected` **embeddedValueToValue**(`value`): `MODEL`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `EMBEDDED` |

#### Returns

`MODEL`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:123](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L123)

___

### emptySink

▸ **emptySink**(): `void`

#### Returns

`void`

#### Inherited from

[OnDestroy$](OnDestroy_).[emptySink](OnDestroy_#emptysink)

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

[OnDestroy$](OnDestroy_).[firstUntilDestroyed](OnDestroy_#firstuntildestroyed)

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L12)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Inherited from

[OnDestroy$](OnDestroy_).[ngOnDestroy](OnDestroy_#ngondestroy)

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

[libs/ng-core/src/lib/components/control.component.ts:73](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L73)

___

### registerOnChange

▸ **registerOnChange**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `Function` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.registerOnChange

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:96](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L96)

___

### registerOnTouched

▸ **registerOnTouched**(`fn`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | `Function` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.registerOnTouched

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:100](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L100)

___

### setDisabledState

▸ **setDisabledState**(`isDisabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isDisabled` | `boolean` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.setDisabledState

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:104](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L104)

___

### setModelAndEmit

▸ **setModelAndEmit**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `MODEL` |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:112](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L112)

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

[OnDestroy$](OnDestroy_).[untilDestroyed](OnDestroy_#untildestroyed)

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L11)

___

### valueToEmbeddedValue

▸ `Protected` **valueToEmbeddedValue**(`value`): `EMBEDDED`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `MODEL` |

#### Returns

`EMBEDDED`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:119](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L119)

___

### writeValue

▸ **writeValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `MODEL` |

#### Returns

`void`

#### Implementation of

ControlValueAccessor.writeValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:85](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L85)

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

[OnDestroy$](OnDestroy_).[[hasInstance]](OnDestroy_#[hasinstance])

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

[OnDestroy$](OnDestroy_).[apply](OnDestroy_#apply)

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

[OnDestroy$](OnDestroy_).[apply](OnDestroy_#apply)

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

[OnDestroy$](OnDestroy_).[apply](OnDestroy_#apply)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[bind](OnDestroy_#bind)

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

[OnDestroy$](OnDestroy_).[call](OnDestroy_#call)

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

[OnDestroy$](OnDestroy_).[call](OnDestroy_#call)

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:285

___

### toString

▸ `Static` **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

[OnDestroy$](OnDestroy_).[toString](OnDestroy_#tostring)

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:296
