---
id: "select_option_sort.SelectOptionSortPipe"
title: "Class: SelectOptionSortPipe"
sidebar_label: "SelectOptionSortPipe"
custom_edit_url: null
---

[select-option-sort](../modules/select_option_sort).SelectOptionSortPipe

## Implements

- `PipeTransform`

## Constructors

### constructor

• **new SelectOptionSortPipe**(`i18nService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `i18nService` | `I18nService` |

#### Defined in

[libs/legi-shared/select-option-sort/select-option-sort.pipe.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select-option-sort/select-option-sort.pipe.ts#L9)

## Properties

### labelSort

• **labelSort**: `SelectOptionSort`

#### Defined in

[libs/legi-shared/select-option-sort/select-option-sort.pipe.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select-option-sort/select-option-sort.pipe.ts#L19)

___

### valueSort

• **valueSort**: `SelectOptionSort`

#### Defined in

[libs/legi-shared/select-option-sort/select-option-sort.pipe.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select-option-sort/select-option-sort.pipe.ts#L18)

## Methods

### getLabel

▸ `Private` **getLabel**(`option`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | `SelectOption`<`string`\> |

#### Returns

`string`

#### Defined in

[libs/legi-shared/select-option-sort/select-option-sort.pipe.ts:25](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select-option-sort/select-option-sort.pipe.ts#L25)

___

### transform

▸ **transform**(`value`, `sortType`, `sortOrder?`): `SelectOption`<`string`\>[]

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `Nil`<`SelectOption`<`string`\>[]\> | `undefined` |
| `sortType` | `Nil`<``"label"`` \| ``"value"``\> | `undefined` |
| `sortOrder` | ``"asc"`` \| ``"desc"`` | `'asc'` |

#### Returns

`SelectOption`<`string`\>[]

#### Implementation of

PipeTransform.transform

#### Defined in

[libs/legi-shared/select-option-sort/select-option-sort.pipe.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/select-option-sort/select-option-sort.pipe.ts#L11)
