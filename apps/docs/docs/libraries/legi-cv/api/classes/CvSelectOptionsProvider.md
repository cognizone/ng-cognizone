---
id: "CvSelectOptionsProvider"
title: "Class: CvSelectOptionsProvider"
sidebar_label: "CvSelectOptionsProvider"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `SelectOptionsProvider`<`string`\>

## Constructors

### constructor

• **new CvSelectOptionsProvider**(`cvProvider`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cvProvider` | [`CvProvider`](../interfaces/CvProvider)<[`Concept`](../interfaces/Concept)\> |

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L18)

## Methods

### getOptions

▸ **getOptions**(`query`, `params`): `Observable`<(`SelectOption`<`string`\> \| `SelectOptionGroup`<`string`\>)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Nil`<`string`\> |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Observable`<(`SelectOption`<`string`\> \| `SelectOptionGroup`<`string`\>)[]\>

#### Implementation of

SelectOptionsProvider.getOptions

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L20)

___

### getValueOption

▸ **getValueOption**(`value`): `Observable`<`SelectOption`<`string`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Observable`<`SelectOption`<`string`\>\>

#### Implementation of

SelectOptionsProvider.getValueOption

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:33](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L33)

___

### hasOptionFor

▸ **hasOptionFor**(`value`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`Observable`<`boolean`\>

#### Implementation of

SelectOptionsProvider.hasOptionFor

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:37](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L37)

___

### toSelectOption

▸ `Private` **toSelectOption**(`concept`): `Promise`<`SelectOption`<`string`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`Concept`](../interfaces/Concept) |

#### Returns

`Promise`<`SelectOption`<`string`\>\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:66](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L66)

___

### toSelectOptionGroup

▸ `Private` **toSelectOptionGroup**(`group`): `Promise`<`SelectOptionGroup`<`string`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `group` | [`ConceptGroup`](../interfaces/ConceptGroup)<[`Concept`](../interfaces/Concept)\> |

#### Returns

`Promise`<`SelectOptionGroup`<`string`\>\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:50](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L50)

___

### toSelectOptionGroups

▸ `Private` **toSelectOptionGroups**(`groups`): `Promise`<`SelectOptionGroup`<`string`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `groups` | [`ConceptGroup`](../interfaces/ConceptGroup)<[`Concept`](../interfaces/Concept)\>[] |

#### Returns

`Promise`<`SelectOptionGroup`<`string`\>[]\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:41](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L41)

___

### toSelectOptions

▸ `Private` **toSelectOptions**(`concepts`): `Promise`<`SelectOption`<`string`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concepts` | [`Concept`](../interfaces/Concept)[] |

#### Returns

`Promise`<`SelectOption`<`string`\>[]\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-select-options-provider.ts:57](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-select-options-provider.ts#L57)
