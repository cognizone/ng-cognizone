---
id: "CvProvider"
title: "Interface: CvProvider<T>"
sidebar_label: "CvProvider"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](Concept)[`Concept`](Concept) |

## Implemented by

- [`AtomicCvProvider`](../classes/AtomicCvProvider)
- [`CollectionCvProvider`](../classes/CollectionCvProvider)
- [`ConceptSchemeCvProvider`](../classes/ConceptSchemeCvProvider)

## Properties

### cvName

• **cvName**: `string`

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L11)

___

### cvUri

• **cvUri**: `string`

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L12)

## Methods

### getConceptByUri

▸ **getConceptByUri**(`conceptUri`): `Observable`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conceptUri` | `string` |

#### Returns

`Observable`<`T`\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L16)

___

### getCv

▸ **getCv**(`query`, `options`): `Observable`<(`T` \| [`ConceptGroup`](ConceptGroup)<`T`\>)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Nil`<`string`\> |
| `options` | `GetSelectOptionsParams` |

#### Returns

`Observable`<(`T` \| [`ConceptGroup`](ConceptGroup)<`T`\>)[]\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L14)

___

### getLabel

▸ **getLabel**(`concept`): `Completable`<`string` \| `LangString` \| `LangStringSimple`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | `T` |

#### Returns

`Completable`<`string` \| `LangString` \| `LangStringSimple`\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L18)

___

### hasConcept

▸ **hasConcept**(`conceptUri`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conceptUri` | `string` |

#### Returns

`Observable`<`boolean`\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L17)

___

### toConceptWrapper

▸ **toConceptWrapper**(`concept`, `query`): `Completable`<[`ConceptWrapper`](ConceptWrapper)<[`Concept`](Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | `T` |
| `query` | `Nil`<`string`\> |

#### Returns

`Completable`<[`ConceptWrapper`](ConceptWrapper)<[`Concept`](Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L15)
