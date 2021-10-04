---
id: "SelectOptionsProvidersMerger"
title: "Class: SelectOptionsProvidersMerger<T>"
sidebar_label: "SelectOptionsProvidersMerger"
sidebar_position: 0
custom_edit_url: null
---

Merges multiple SelectOptionsProvider together to form a unified one.

**`deprectated`**

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`SelectOptionsProvider`](../interfaces/SelectOptionsProvider)<`T`\>

## Constructors

### constructor

• **new SelectOptionsProvidersMerger**<`T`\>(`providers`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `providers` | [`SelectOptionsProvider`](../interfaces/SelectOptionsProvider)<`T`\>[] |

#### Defined in

[lib/models/select-option.ts:96](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L96)

## Methods

### getOptions

▸ **getOptions**(`query`, `params`): `Observable`<([`SelectOption`](../interfaces/SelectOption)<`T`\> \| [`SelectOptionGroup`](../interfaces/SelectOptionGroup)<`T`\>)[]\>

see [SelectOptionsProvider](../interfaces/SelectOptionsProvider)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`Nil`](../modules#nil)<`string`\> |
| `params` | [`GetSelectOptionsParams`](../interfaces/GetSelectOptionsParams) |

#### Returns

`Observable`<([`SelectOption`](../interfaces/SelectOption)<`T`\> \| [`SelectOptionGroup`](../interfaces/SelectOptionGroup)<`T`\>)[]\>

#### Implementation of

[SelectOptionsProvider](../interfaces/SelectOptionsProvider).[getOptions](../interfaces/SelectOptionsProvider#getoptions)

#### Defined in

[lib/models/select-option.ts:101](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L101)

___

### getValueOption

▸ **getValueOption**(`value`): `Observable`<[`SelectOption`](../interfaces/SelectOption)<`T`\>\>

see [SelectOptionsProvider](../interfaces/SelectOptionsProvider)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Observable`<[`SelectOption`](../interfaces/SelectOption)<`T`\>\>

#### Implementation of

[SelectOptionsProvider](../interfaces/SelectOptionsProvider).[getValueOption](../interfaces/SelectOptionsProvider#getvalueoption)

#### Defined in

[lib/models/select-option.ts:109](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L109)

___

### hasOptionFor

▸ **hasOptionFor**(`value`): `Observable`<`boolean`\>

see [SelectOptionsProvider](../interfaces/SelectOptionsProvider)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`Observable`<`boolean`\>

#### Implementation of

[SelectOptionsProvider](../interfaces/SelectOptionsProvider).[hasOptionFor](../interfaces/SelectOptionsProvider#hasoptionfor)

#### Defined in

[lib/models/select-option.ts:122](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L122)
