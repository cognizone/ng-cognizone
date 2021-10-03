---
id: "AtomicCvProvider"
title: "Class: AtomicCvProvider<T>"
sidebar_label: "AtomicCvProvider"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](../interfaces/Concept)[`Concept`](../interfaces/Concept) |

## Hierarchy

- **`AtomicCvProvider`**

  ↳ [`CollectionCvProvider`](CollectionCvProvider)

  ↳ [`ConceptSchemeCvProvider`](ConceptSchemeCvProvider)

## Implements

- [`CvProvider`](../interfaces/CvProvider)<`T`\>

## Constructors

### constructor

• **new AtomicCvProvider**<`T`\>(`matcher`, `config`, `options`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](../interfaces/Concept)<`T`\>[`Concept`](../interfaces/Concept) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `matcher` | [`ConceptMatcherService`](ConceptMatcherService) |
| `config` | [`AtomicCvProviderConfig`](../interfaces/AtomicCvProviderConfig) |
| `options` | [`LegiCvOptions`](../interfaces/LegiCvOptions) |

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:46](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L46)

## Properties

### \_allConcepts$

• `Private` `Optional` **\_allConcepts$**: `Observable`<`T`[]\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:44](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L44)

___

### conceptKeysForFiltering

• **conceptKeysForFiltering**: [`ConceptFilterableKeys`](../modules#conceptfilterablekeys)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:38](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L38)

___

### config

• `Protected` **config**: [`AtomicCvProviderConfig`](../interfaces/AtomicCvProviderConfig)

___

### cvName

• **cvName**: `string`

#### Implementation of

[CvProvider](../interfaces/CvProvider).[cvName](../interfaces/CvProvider#cvname)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:34](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L34)

___

### cvUri

• **cvUri**: `string`

#### Implementation of

[CvProvider](../interfaces/CvProvider).[cvUri](../interfaces/CvProvider#cvuri)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:36](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L36)

___

### matcher

• `Protected` **matcher**: [`ConceptMatcherService`](ConceptMatcherService)

___

### options

• `Protected` **options**: [`LegiCvOptions`](../interfaces/LegiCvOptions)

## Accessors

### allConcepts$

• `Protected` `get` **allConcepts$**(): `Observable`<`T`[]\>

#### Returns

`Observable`<`T`[]\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:40](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L40)

## Methods

### getAllConcepts

▸ `Protected` `Abstract` **getAllConcepts**(): `Observable`<`T`[]\>

#### Returns

`Observable`<`T`[]\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:105](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L105)

___

### getConceptByUri

▸ **getConceptByUri**(`uri`): `Observable`<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`Observable`<`T`\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[getConceptByUri](../interfaces/CvProvider#getconceptbyuri)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:77](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L77)

___

### getConceptSorter

▸ `Protected` **getConceptSorter**(`params`): `Sorter`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<[`Concept`](../interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<[`Concept`](../interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:94](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L94)

___

### getCv

▸ **getCv**(`query`, `params`): `Observable`<`T`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Nil`<`string`\> |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Observable`<`T`[]\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[getCv](../interfaces/CvProvider#getcv)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:52](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L52)

___

### getLabel

▸ **getLabel**(`concept`): `Completable`<`LangString`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | `T` |

#### Returns

`Completable`<`LangString`\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[getLabel](../interfaces/CvProvider#getlabel)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:85](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L85)

___

### getLabelAsString

▸ `Protected` **getLabelAsString**(`label`, `lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `CzLabel` |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:107](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L107)

___

### hasConcept

▸ **hasConcept**(`uri`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`Observable`<`boolean`\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[hasConcept](../interfaces/CvProvider#hasconcept)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:81](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L81)

___

### match

▸ `Protected` **match**(`concept`, `query`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | `T` |
| `query` | `Nil`<`string`\> |

#### Returns

`number`

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:90](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L90)

___

### toConceptWrapper

▸ **toConceptWrapper**(`concept`, `query`): `Promise`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<`T`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | `T` |
| `query` | `Nil`<`string`\> |

#### Returns

`Promise`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<`T`\>\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[toConceptWrapper](../interfaces/CvProvider#toconceptwrapper)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:66](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L66)
