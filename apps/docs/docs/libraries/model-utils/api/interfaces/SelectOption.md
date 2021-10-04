---
id: "SelectOption"
title: "Interface: SelectOption<T>"
sidebar_label: "SelectOption"
sidebar_position: 0
custom_edit_url: null
---

Kind of an augmented KeyValue type to be used whenever we have case where a
user has to select an option, being it in a select, an autocomplete, etc.
This is mostly there in an effort of consistency, to have interoperable libraries and data models.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |

## Properties

### data

• `Optional` **data**: `Object`

Can store whatever, placeholder for library to put whatever they need here.

#### Defined in

[lib/models/select-option.ts:28](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L28)

___

### disabled

• `Optional` **disabled**: `boolean`

Set tu true if this option is disabled, useful when needing to display historical values.

#### Defined in

[lib/models/select-option.ts:24](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L24)

___

### label

• **label**: [`SelectOptionLabel`](../modules#selectoptionlabel)

The label, used for presentational purposes

#### Defined in

[lib/models/select-option.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L20)

___

### value

• **value**: `T`

The value associated to the SelectOption. In a given set, this should be unique.

#### Defined in

[lib/models/select-option.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L16)
