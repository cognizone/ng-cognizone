---
id: "SelectOptionGroup"
title: "Interface: SelectOptionGroup<T>"
sidebar_label: "SelectOptionGroup"
sidebar_position: 0
custom_edit_url: null
---

Represents a group SelectOption, might be useful when having grouped options in selects for example

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `string` |

## Properties

### label

• `Optional` **label**: [`SelectOptionLabel`](../modules#selectoptionlabel)

Label of the group

#### Defined in

[lib/models/select-option.ts:138](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L138)

___

### options

• **options**: [`SelectOption`](SelectOption)<`T`\>[]

Options that are inside that group

#### Defined in

[lib/models/select-option.ts:143](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L143)
