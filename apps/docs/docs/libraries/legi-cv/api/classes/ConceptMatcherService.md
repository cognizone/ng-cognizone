---
id: "ConceptMatcherService"
title: "Class: ConceptMatcherService"
sidebar_label: "ConceptMatcherService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ConceptMatcherService**(`i18nService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `i18nService` | `I18nService` |

#### Defined in

[libs/legi-cv/src/lib/services/concept-matcher.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/concept-matcher.service.ts#L11)

## Methods

### getAllLabels

▸ **getAllLabels**(`concept`, `keys`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`Concept`](../interfaces/Concept) |
| `keys` | [`ConceptFilterableKeys`](../modules#conceptfilterablekeys) |

#### Returns

`string`[]

#### Defined in

[libs/legi-cv/src/lib/services/concept-matcher.service.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/concept-matcher.service.ts#L26)

___

### match

▸ **match**(`concept`, `keys`, `query`, `matchType?`): `number`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `concept` | [`Concept`](../interfaces/Concept) | `undefined` |
| `keys` | [`ConceptFilterableKeys`](../modules#conceptfilterablekeys) | `undefined` |
| `query` | `Nil`<`string`\> | `undefined` |
| `matchType` | [`MatchType`](../modules#matchtype) | `'includes'` |

#### Returns

`number`

#### Defined in

[libs/legi-cv/src/lib/services/concept-matcher.service.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/concept-matcher.service.ts#L13)
