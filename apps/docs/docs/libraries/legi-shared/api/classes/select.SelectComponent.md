---
id: "select.SelectComponent"
title: "Class: SelectComponent<T>"
sidebar_label: "SelectComponent"
custom_edit_url: null
---

[select](../modules/select).SelectComponent

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `ControlComponent`<`T`\>

  ↳ **`SelectComponent`**

## Implements

- `HasOptionsProvider`<`T`\>

## Constructors

### constructor

• **new SelectComponent**<`T`\>(`config`, `i18nService`, `logger`, `cdr`, `controlContainer`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`LegiSharedOptions`](../interfaces/core.LegiSharedOptions) |
| `i18nService` | `I18nService` |
| `logger` | `Logger` |
| `cdr` | `ChangeDetectorRef` |
| `controlContainer` | `ControlContainer` |

#### Overrides

ControlComponent&lt;T\&gt;.constructor

#### Defined in

[libs/legi-shared/select/select.component.ts:65](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L65)

## Properties

### \_model

• `Protected` **\_model**: `T`

#### Inherited from

ControlComponent.\_model

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L63)

___

### allOptions

• `Private` `Optional` **allOptions**: `SelectOption`<`T`\>[]

#### Defined in

[libs/legi-shared/select/select.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L63)

___

### canBeDiscarded

• **canBeDiscarded**: `boolean` = `false`

#### Defined in

[libs/legi-shared/select/select.component.ts:46](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L46)

___

### cdr

• `Protected` **cdr**: `ChangeDetectorRef`

#### Inherited from

ControlComponent.cdr

___

### controlChanged

• `Protected` **controlChanged**: `Subject`<`void`\>

#### Inherited from

ControlComponent.controlChanged

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:61](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L61)

___

### controlContainer

• `Protected` `Optional` **controlContainer**: `ControlContainer`

#### Inherited from

ControlComponent.controlContainer

___

### defaultValue

• `Optional` **defaultValue**: `T`

#### Inherited from

ControlComponent.defaultValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:59](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L59)

___

### disabled

• **disabled**: `boolean` = `false`

#### Inherited from

ControlComponent.disabled

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:53](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L53)

___

### embeddedControl

• **embeddedControl**: `FormControl`

#### Overrides

ControlComponent.embeddedControl

#### Defined in

[libs/legi-shared/select/select.component.ts:57](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L57)

___

### hint

• `Optional` **hint**: `string`

#### Defined in

[libs/legi-shared/select/select.component.ts:55](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L55)

___

### isCompact

• **isCompact**: `boolean` = `false`

#### Defined in

[libs/legi-shared/select/select.component.ts:50](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L50)

___

### label

• `Optional` **label**: `string`

#### Defined in

[libs/legi-shared/select/select.component.ts:35](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L35)

___

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

ControlComponent.logger

___

### name

• `Optional` **name**: `string`

#### Inherited from

ControlComponent.name

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L23)

___

### onDestroy$

• **onDestroy$**: `Observable`<`void`\>

#### Inherited from

ControlComponent.onDestroy$

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L9)

___

### onModelChange

• `Protected` **onModelChange**: `Function`

#### Inherited from

ControlComponent.onModelChange

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:129](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L129)

___

### onModelTouched

• `Protected` **onModelTouched**: `Function`

#### Inherited from

ControlComponent.onModelTouched

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:131](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L131)

___

### options

• **options**: `SelectOption`<`T`\>[] = `[]`

#### Defined in

[libs/legi-shared/select/select.component.ts:37](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L37)

___

### placeholder

• `Optional` **placeholder**: `string`

#### Defined in

[libs/legi-shared/select/select.component.ts:33](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L33)

___

### removeDisabledOptions

• **removeDisabledOptions**: `boolean` = `true`

#### Defined in

[libs/legi-shared/select/select.component.ts:48](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L48)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

ControlComponent.required

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L20)

___

### sortType

• `Optional` **sortType**: [`SelectOptionSortType`](../modules/select_option_sort#selectoptionsorttype)

#### Defined in

[libs/legi-shared/select/select.component.ts:43](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L43)

___

### subSink

• **subSink**: `Subscription`

#### Inherited from

ControlComponent.subSink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L10)

___

### template

• **template**: `TemplateRef`<`unknown`\>

#### Defined in

[libs/legi-shared/select/select.component.ts:52](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L52)

___

### valueChanges

• `Optional` **valueChanges**: `Observable`<`any`\>

#### Inherited from

ControlComponent.valueChanges

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:57](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L57)

___

### arguments

▪ `Static` **arguments**: `any`

#### Inherited from

ControlComponent.arguments

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:302

___

### caller

▪ `Static` **caller**: `Function`

#### Inherited from

ControlComponent.caller

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:303

___

### length

▪ `Static` `Readonly` **length**: `number`

#### Inherited from

ControlComponent.length

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:299

___

### name

▪ `Static` `Readonly` **name**: `string`

Returns the name of the function. Function names are read-only and can not be changed.

#### Inherited from

ControlComponent.name

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es2015.core.d.ts:97

## Accessors

### classicMode

• `get` **classicMode**(): `boolean`

#### Returns

`boolean`

#### Defined in

[libs/legi-shared/select/select.component.ts:59](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L59)

___

### formControl

• `get` **formControl**(): `Maybe`<`AbstractControl`\>

#### Returns

`Maybe`<`AbstractControl`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:36](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L36)

• `set` **formControl**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Maybe`<`AbstractControl`\> |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:40](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L40)

___

### formControlName

• `get` **formControlName**(): `Maybe`<`string`\>

#### Returns

`Maybe`<`string`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L26)

• `set` **formControlName**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Maybe`<`string`\> |

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

___

### optionsProvider

• `set` **optionsProvider**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `SelectOptionsProvider`<`T`\> |

#### Returns

`void`

#### Defined in

[libs/legi-shared/select/select.component.ts:39](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L39)

## Methods

### embeddedValueToValue

▸ `Protected` **embeddedValueToValue**(`value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`T`

#### Inherited from

ControlComponent.embeddedValueToValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:123](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L123)

___

### emptySink

▸ **emptySink**(): `void`

#### Returns

`void`

#### Inherited from

ControlComponent.emptySink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L13)

___

### evaluateOptions

▸ `Private` **evaluateOptions**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/select/select.component.ts:88](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L88)

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

ControlComponent.firstUntilDestroyed

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L12)

___

### getContext

▸ **getContext**(`option`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `SelectOption`<`T`\> |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `$implicit` | `SelectOption`<`T`\> |
| `option` | `SelectOption`<`T`\> |

#### Defined in

[libs/legi-shared/select/select.component.ts:80](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L80)

___

### isString

▸ **isString**(`label`): label is string

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` \| `LangString` \| `LangStringSimple` |

#### Returns

label is string

#### Defined in

[libs/legi-shared/select/select.component.ts:84](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L84)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Inherited from

ControlComponent.ngOnDestroy

#### Defined in

node_modules/@angular/core/core.d.ts:5167

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Inherited from

ControlComponent.ngOnInit

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

#### Inherited from

ControlComponent.registerOnChange

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

#### Inherited from

ControlComponent.registerOnTouched

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

#### Inherited from

ControlComponent.setDisabledState

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:104](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L104)

___

### setModelAndEmit

▸ **setModelAndEmit**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Inherited from

ControlComponent.setModelAndEmit

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

ControlComponent.untilDestroyed

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L11)

___

### useOptionsProvider

▸ `Private` **useOptionsProvider**(`provider`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `provider` | `SelectOptionsProvider`<`T`\> |

#### Returns

`void`

#### Defined in

[libs/legi-shared/select/select.component.ts:97](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L97)

___

### valueToEmbeddedValue

▸ `Protected` **valueToEmbeddedValue**(`value`): `T`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`T`

#### Inherited from

ControlComponent.valueToEmbeddedValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:119](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L119)

___

### writeValue

▸ **writeValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Overrides

ControlComponent.writeValue

#### Defined in

[libs/legi-shared/select/select.component.ts:75](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select/select.component.ts#L75)

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

ControlComponent.\_\_@hasInstance@37884

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

ControlComponent.apply

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

ControlComponent.apply

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

ControlComponent.apply

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

ControlComponent.bind

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

ControlComponent.bind

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

ControlComponent.bind

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

ControlComponent.bind

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

ControlComponent.bind

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

ControlComponent.bind

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

ControlComponent.bind

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

ControlComponent.call

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

ControlComponent.call

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:285

___

### toString

▸ `Static` **toString**(): `string`

Returns a string representation of a function.

#### Returns

`string`

#### Inherited from

ControlComponent.toString

#### Defined in

apps/docs/node_modules/typescript/lib/lib.es5.d.ts:296
