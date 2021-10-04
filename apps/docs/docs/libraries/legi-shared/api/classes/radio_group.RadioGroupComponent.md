---
id: "radio_group.RadioGroupComponent"
title: "Class: RadioGroupComponent<T>"
sidebar_label: "RadioGroupComponent"
custom_edit_url: null
---

[radio-group](../modules/radio_group).RadioGroupComponent

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `ControlComponent`<`T`\>

  ↳ **`RadioGroupComponent`**

## Implements

- `HasOptionsProvider`<`T`\>
- `OnInit`

## Constructors

### constructor

• **new RadioGroupComponent**<`T`\>(`i18nService`, `logger`, `cdr`, `controlContainer`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `i18nService` | `I18nService` |
| `logger` | `Logger` |
| `cdr` | `ChangeDetectorRef` |
| `controlContainer` | `ControlContainer` |

#### Overrides

ControlComponent&lt;T\&gt;.constructor

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:80](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L80)

## Properties

### \_counts

• `Private` **\_counts**: `Nil`<`SelectOptionCounts`\>

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:78](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L78)

___

### \_model

• `Protected` **\_model**: `T`

#### Inherited from

ControlComponent.\_model

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L63)

___

### \_optionsProvider

• `Private` **\_optionsProvider**: `SelectOptionsProvider`<`T`\>

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:77](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L77)

___

### canBeDiscarded

• **canBeDiscarded**: `boolean` = `false`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:61](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L61)

___

### canBeFiltered

• **canBeFiltered**: `boolean` = `false`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L63)

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

### direction

• **direction**: ``"row"`` \| ``"column"`` = `'column'`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:65](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L65)

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

[libs/legi-shared/radio-group/radio-group.component.ts:73](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L73)

___

### filterOutZeroCounts

• **filterOutZeroCounts**: `boolean` = `true`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:69](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L69)

___

### inputLabel

• `Optional` **inputLabel**: `string`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:67](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L67)

___

### label

• `Optional` **label**: `string`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:41](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L41)

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

[libs/legi-shared/radio-group/radio-group.component.ts:51](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L51)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

ControlComponent.required

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/components/control.component.ts#L20)

___

### searchControl

• **searchControl**: `FormControl`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:74](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L74)

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

[libs/legi-shared/radio-group/radio-group.component.ts:71](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L71)

___

### trackBySelectOption

• **trackBySelectOption**: <T\>(`index`: `number`, `option`: `SelectOption`<`T`\>) => `T`

#### Type declaration

▸ <`T`\>(`index`, `option`): `T`

a TrackByFn to be used with an `*ngFor` in case it is used on an array of {@link SelectOption}

##### Type parameters

| Name |
| :------ |
| `T` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `option` | `SelectOption`<`T`\> |

##### Returns

`T`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:75](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L75)

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

### counts

• `get` **counts**(): `Nil`<`SelectOptionCounts`\>

#### Returns

`Nil`<`SelectOptionCounts`\>

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:53](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L53)

• `set` **counts**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Nil`<`SelectOptionCounts`\> |

#### Returns

`void`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:56](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L56)

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

• `get` **optionsProvider**(): `SelectOptionsProvider`<`T`\>

#### Returns

`SelectOptionsProvider`<`T`\>

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:47](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L47)

• `set` **optionsProvider**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `SelectOptionsProvider`<`T`\> |

#### Returns

`void`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:43](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L43)

## Methods

### checkForMissing

▸ `Private` **checkForMissing**(`options`): `Observable`<`SelectOption`<`T`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `SelectOption`<`T`\>[] |

#### Returns

`Observable`<`SelectOption`<`T`\>[]\>

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:129](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L129)

___

### discard

▸ **discard**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:96](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L96)

___

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

[libs/legi-shared/radio-group/radio-group.component.ts:100](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L100)

___

### getCount

▸ **getCount**(`option`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `SelectOption`<`T`\> |

#### Returns

`number`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:104](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L104)

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

[libs/legi-shared/radio-group/radio-group.component.ts:92](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L92)

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

#### Implementation of

OnInit.ngOnInit

#### Overrides

ControlComponent.ngOnInit

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:84](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L84)

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

### setOptions

▸ `Private` **setOptions**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/radio-group/radio-group.component.ts:108](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/radio-group/radio-group.component.ts#L108)

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

#### Inherited from

ControlComponent.writeValue

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
