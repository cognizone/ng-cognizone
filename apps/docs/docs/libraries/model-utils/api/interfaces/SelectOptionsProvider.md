---
id: "SelectOptionsProvider"
title: "Interface: SelectOptionsProvider<T>"
sidebar_label: "SelectOptionsProvider"
sidebar_position: 0
custom_edit_url: null
---

Any service or other that provides an array of SelectOption should implement this interface for consistency and interoperability.

## Type parameters

| Name |
| :------ |
| `T` |

## Implemented by

- [`SelectOptionsProvidersMerger`](../classes/SelectOptionsProvidersMerger)

## Methods

### getOptions

▸ **getOptions**(`query`, `params`): `Observable`<([`SelectOption`](SelectOption)<`T`\> \| [`SelectOptionGroup`](SelectOptionGroup)<`T`\>)[]\>

Given the query, will return a filtered array of `SelectOption` that all matches.

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Nil`](../modules#nil)<`string`\> |
| `params` | [`GetSelectOptionsParams`](GetSelectOptionsParams) |

#### Returns

`Observable`<([`SelectOption`](SelectOption)<`T`\> \| [`SelectOptionGroup`](SelectOptionGroup)<`T`\>)[]\>

#### Defined in

[lib/models/select-option.ts:72](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L72)

___

### getValueOption

▸ **getValueOption**(`value`): `Observable`<[`SelectOption`](SelectOption)<`T`\>\>

Given a value, will return the SelectOption corresponding that value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Observable`<[`SelectOption`](SelectOption)<`T`\>\>

#### Defined in

[lib/models/select-option.ts:77](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L77)

___

### hasOptionFor

▸ **hasOptionFor**(`value`): `Observable`<`boolean`\>

Returns `true` if this provider has a `SelectOption` that is linked to the given value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Observable`<`boolean`\>

#### Defined in

[lib/models/select-option.ts:82](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L82)
