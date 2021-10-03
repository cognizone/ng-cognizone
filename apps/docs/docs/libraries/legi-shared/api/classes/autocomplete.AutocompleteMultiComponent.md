---
id: "autocomplete.AutocompleteMultiComponent"
title: "Class: AutocompleteMultiComponent<T>"
sidebar_label: "AutocompleteMultiComponent"
custom_edit_url: null
---

[autocomplete](../modules/autocomplete).AutocompleteMultiComponent

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- `ControlComponent`<`T`[]\>

  ↳ **`AutocompleteMultiComponent`**

## Implements

- `HasOptionsProvider`<`T`\>
- `OnInit`

## Constructors

### constructor

• **new AutocompleteMultiComponent**<`T`\>(`config`, `i18n`, `logger`, `cdr`, `controlContainer`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`LegiSharedOptions`](../interfaces/core.LegiSharedOptions) |
| `i18n` | `I18nService` |
| `logger` | `Logger` |
| `cdr` | `ChangeDetectorRef` |
| `controlContainer` | `ControlContainer` |

#### Overrides

ControlComponent&lt;T[]\&gt;.constructor

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:108](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L108)

## Properties

### \_model

• `Protected` **\_model**: `T`[]

#### Inherited from

ControlComponent.\_model

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L63)

___

### \_options

• `Private` **\_options**: `SelectOption`<`T`\>[] = `[]`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:104](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L104)

___

### \_optionsProvider

• `Private` **\_optionsProvider**: `SelectOptionsProvider`<`T`\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:106](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L106)

___

### btnLabel

• `Optional` **btnLabel**: `string`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:44](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L44)

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

[libs/ng-core/src/lib/components/control.component.ts:61](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L61)

___

### controlContainer

• `Protected` `Optional` **controlContainer**: `ControlContainer`

#### Inherited from

ControlComponent.controlContainer

___

### defaultValue

• `Optional` **defaultValue**: `T`[]

#### Inherited from

ControlComponent.defaultValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:59](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L59)

___

### disabled

• **disabled**: `boolean` = `false`

#### Inherited from

ControlComponent.disabled

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:53](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L53)

___

### displayFn

• **displayFn**: (`value?`: `T`) => `Nil`<`string`\>

#### Type declaration

▸ (`value?`): `Nil`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

##### Returns

`Nil`<`string`\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:123](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L123)

___

### embeddedControl

• `Optional` **embeddedControl**: `AbstractControl`

#### Inherited from

ControlComponent.embeddedControl

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:55](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L55)

___

### hint

• `Optional` **hint**: `string`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:73](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L73)

___

### label

• `Optional` **label**: `string`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:42](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L42)

___

### lang

• `Optional` **lang**: `string`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:46](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L46)

___

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

ControlComponent.logger

___

### maxOptionsSize

• **maxOptionsSize**: `number` = `15`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:66](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L66)

___

### modelAsOptions

• **modelAsOptions**: `SelectOption`<`T`\>[] = `[]`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:98](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L98)

___

### modelChanged$

• **modelChanged$**: `Subject`<`T`[]\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:85](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L85)

___

### multiInput

• **multiInput**: `ElementRef`<`HTMLInputElement`\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:78](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L78)

___

### name

• `Optional` **name**: `string`

#### Inherited from

ControlComponent.name

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L23)

___

### newModel

• **newModel**: `undefined` \| `T`[]

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:96](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L96)

___

### onDestroy$

• **onDestroy$**: `Observable`<`void`\>

#### Inherited from

ControlComponent.onDestroy$

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L9)

___

### onModelChange

• `Protected` **onModelChange**: `Function`

#### Inherited from

ControlComponent.onModelChange

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:129](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L129)

___

### onModelTouched

• `Protected` **onModelTouched**: `Function`

#### Inherited from

ControlComponent.onModelTouched

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:131](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L131)

___

### panelWidth

• `Optional` **panelWidth**: `string` \| `number`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:71](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L71)

___

### placeholder

• `Optional` **placeholder**: `string`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:40](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L40)

___

### queryChanges

• **queryChanges**: `Subject`<`string`\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:83](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L83)

___

### removeDisabledOptions

• **removeDisabledOptions**: `boolean` = `true`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:75](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L75)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

ControlComponent.required

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:20](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L20)

___

### sortType

• `Optional` **sortType**: [`SelectOptionSortType`](../modules/select_option_sort#selectoptionsorttype)

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:69](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L69)

___

### storedValueOptions

• `Private` **storedValueOptions**: `SelectOption`<`T`\>[] = `[]`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:105](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L105)

___

### subSink

• **subSink**: `Subscription`

#### Inherited from

ControlComponent.subSink

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L10)

___

### template

• **template**: `TemplateRef`<`unknown`\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:81](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L81)

___

### trackByFn

• **trackByFn**: `TrackByFunction`<`SelectOption`<`T`\>\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:132](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L132)

___

### valueChanges

• `Optional` **valueChanges**: `Observable`<`any`\>

#### Inherited from

ControlComponent.valueChanges

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:57](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L57)

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

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:100](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L100)

___

### formControl

• `get` **formControl**(): `Maybe`<`AbstractControl`\>

#### Returns

`Maybe`<`AbstractControl`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:36](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L36)

• `set` **formControl**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Maybe`<`AbstractControl`\> |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:40](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L40)

___

### formControlName

• `get` **formControlName**(): `Maybe`<`string`\>

#### Returns

`Maybe`<`string`\>

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:26](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L26)

• `set` **formControlName**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Maybe`<`string`\> |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:30](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L30)

___

### model

• `get` **model**(): `T`[]

#### Returns

`T`[]

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:92](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L92)

• `set` **model**(`val`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `T`[] |

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:87](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L87)

___

### options

• `get` **options**(): `SelectOption`<`T`\>[]

#### Returns

`SelectOption`<`T`\>[]

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:52](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L52)

• `set` **options**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `SelectOption`<`T`\>[] |

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:48](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L48)

___

### optionsProvider

• `get` **optionsProvider**(): `SelectOptionsProvider`<`T`\>

#### Returns

`SelectOptionsProvider`<`T`\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:61](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L61)

• `set` **optionsProvider**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `SelectOptionsProvider`<`T`\> |

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:57](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L57)

## Methods

### addSelectedValue

▸ **addSelectedValue**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:150](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L150)

___

### embeddedValueToValue

▸ `Protected` **embeddedValueToValue**(`value`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T`[] |

#### Returns

`T`[]

#### Inherited from

ControlComponent.embeddedValueToValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:123](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L123)

___

### emptySink

▸ **emptySink**(): `void`

#### Returns

`void`

#### Inherited from

ControlComponent.emptySink

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

ControlComponent.firstUntilDestroyed

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L12)

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

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:161](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L161)

___

### getSelectOption

▸ `Private` **getSelectOption**(`value`): `Promise`<`undefined` \| `SelectOption`<`T`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Promise`<`undefined` \| `SelectOption`<`T`\>\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:193](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L193)

___

### initModelChange

▸ `Private` **initModelChange**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:200](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L200)

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

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:118](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L118)

___

### onOptionSelected

▸ **onOptionSelected**(`event`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `MatAutocompleteSelectedEvent` |

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:140](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L140)

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

[libs/ng-core/src/lib/components/control.component.ts:96](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L96)

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

[libs/ng-core/src/lib/components/control.component.ts:100](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L100)

___

### removeValue

▸ **removeValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `SelectOption`<`T`\> |

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:134](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L134)

___

### setDisabledState

▸ **setDisabledState**(`isDisabled`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `isDisabled` | `boolean` |

#### Returns

`void`

#### Overrides

ControlComponent.setDisabledState

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:156](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L156)

___

### setModelAndEmit

▸ **setModelAndEmit**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T`[] |

#### Returns

`void`

#### Inherited from

ControlComponent.setModelAndEmit

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:112](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L112)

___

### storeValueOption

▸ `Private` **storeValueOption**(`value`): `Promise`<`undefined` \| `SelectOption`<`T`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Promise`<`undefined` \| `SelectOption`<`T`\>\>

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:184](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L184)

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

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L11)

___

### useOptionsProvider

▸ `Private` **useOptionsProvider**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts:165](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/autocomplete/autocomplete-multi/autocomplete-multi.component.ts#L165)

___

### valueToEmbeddedValue

▸ `Protected` **valueToEmbeddedValue**(`value`): `T`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T`[] |

#### Returns

`T`[]

#### Inherited from

ControlComponent.valueToEmbeddedValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:119](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L119)

___

### writeValue

▸ **writeValue**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T`[] |

#### Returns

`void`

#### Inherited from

ControlComponent.writeValue

#### Defined in

[libs/ng-core/src/lib/components/control.component.ts:85](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/components/control.component.ts#L85)

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
