---
id: "CollectionCvProvider"
title: "Class: CollectionCvProvider"
sidebar_label: "CollectionCvProvider"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`AtomicCvProvider`](AtomicCvProvider)

  ↳ **`CollectionCvProvider`**

## Implements

- [`CvProvider`](../interfaces/CvProvider)

## Constructors

### constructor

• **new CollectionCvProvider**(`cvService`, `atomicCvClient`, `matcher`, `config`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `cvService` | [`CvStateService`](CvStateService) |
| `atomicCvClient` | [`AtomicCvClient`](../interfaces/AtomicCvClient) |
| `matcher` | [`ConceptMatcherService`](ConceptMatcherService) |
| `config` | [`AtomicCvProviderConfig`](../interfaces/AtomicCvProviderConfig) |
| `options` | [`LegiCvOptions`](../interfaces/LegiCvOptions) |

#### Overrides

[AtomicCvProvider](AtomicCvProvider).[constructor](AtomicCvProvider#constructor)

#### Defined in

[libs/legi-cv/src/lib/services/collection-cv-provider.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/collection-cv-provider.ts#L17)

## Properties

### conceptKeysForFiltering

• **conceptKeysForFiltering**: [`ConceptFilterableKeys`](../modules#conceptfilterablekeys)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[conceptKeysForFiltering](AtomicCvProvider#conceptkeysforfiltering)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:38](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L38)

___

### config

• `Protected` **config**: [`AtomicCvProviderConfig`](../interfaces/AtomicCvProviderConfig)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[config](AtomicCvProvider#config)

___

### cvName

• **cvName**: `string`

#### Implementation of

[CvProvider](../interfaces/CvProvider).[cvName](../interfaces/CvProvider#cvname)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[cvName](AtomicCvProvider#cvname)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:34](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L34)

___

### cvUri

• **cvUri**: `string`

#### Implementation of

[CvProvider](../interfaces/CvProvider).[cvUri](../interfaces/CvProvider#cvuri)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[cvUri](AtomicCvProvider#cvuri)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:36](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L36)

___

### matcher

• `Protected` **matcher**: [`ConceptMatcherService`](ConceptMatcherService)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[matcher](AtomicCvProvider#matcher)

___

### options

• `Protected` **options**: [`LegiCvOptions`](../interfaces/LegiCvOptions)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[options](AtomicCvProvider#options)

## Accessors

### allConcepts$

• `Protected` `get` **allConcepts$**(): `Observable`<`T`[]\>

#### Returns

`Observable`<`T`[]\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:40](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L40)

## Methods

### getAllConcepts

▸ `Protected` **getAllConcepts**(): `Observable`<[`Concept`](../interfaces/Concept)[]\>

#### Returns

`Observable`<[`Concept`](../interfaces/Concept)[]\>

#### Overrides

[AtomicCvProvider](AtomicCvProvider).[getAllConcepts](AtomicCvProvider#getallconcepts)

#### Defined in

[libs/legi-cv/src/lib/services/collection-cv-provider.ts:28](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/collection-cv-provider.ts#L28)

___

### getCollection

▸ `Private` **getCollection**(): `Observable`<[`Collection`](../interfaces/Collection)<[`Concept`](../interfaces/Concept)\>\>

#### Returns

`Observable`<[`Collection`](../interfaces/Collection)<[`Concept`](../interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/services/collection-cv-provider.ts:37](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/collection-cv-provider.ts#L37)

___

### getConceptByUri

▸ **getConceptByUri**(`uri`): `Observable`<[`Concept`](../interfaces/Concept)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`Observable`<[`Concept`](../interfaces/Concept)\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[getConceptByUri](../interfaces/CvProvider#getconceptbyuri)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[getConceptByUri](AtomicCvProvider#getconceptbyuri)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:77](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L77)

___

### getConceptSorter

▸ `Protected` **getConceptSorter**(`params`): `Sorter`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<[`Concept`](../interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<[`Concept`](../interfaces/Concept)\>\>

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[getConceptSorter](AtomicCvProvider#getconceptsorter)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:94](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L94)

___

### getCv

▸ **getCv**(`query`, `params`): `Observable`<[`Concept`](../interfaces/Concept)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Nil`<`string`\> |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Observable`<[`Concept`](../interfaces/Concept)[]\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[getCv](../interfaces/CvProvider#getcv)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[getCv](AtomicCvProvider#getcv)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:52](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L52)

___

### getLabel

▸ **getLabel**(`concept`): `Completable`<`LangString`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`Concept`](../interfaces/Concept) |

#### Returns

`Completable`<`LangString`\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[getLabel](../interfaces/CvProvider#getlabel)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[getLabel](AtomicCvProvider#getlabel)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:85](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L85)

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

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[getLabelAsString](AtomicCvProvider#getlabelasstring)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:107](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L107)

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

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[hasConcept](AtomicCvProvider#hasconcept)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:81](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L81)

___

### match

▸ `Protected` **match**(`concept`, `query`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`Concept`](../interfaces/Concept) |
| `query` | `Nil`<`string`\> |

#### Returns

`number`

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[match](AtomicCvProvider#match)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:90](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L90)

___

### toConceptWrapper

▸ **toConceptWrapper**(`concept`, `query`): `Promise`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<[`Concept`](../interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`Concept`](../interfaces/Concept) |
| `query` | `Nil`<`string`\> |

#### Returns

`Promise`<[`ConceptWrapper`](../interfaces/ConceptWrapper)<[`Concept`](../interfaces/Concept)\>\>

#### Implementation of

[CvProvider](../interfaces/CvProvider).[toConceptWrapper](../interfaces/CvProvider#toconceptwrapper)

#### Inherited from

[AtomicCvProvider](AtomicCvProvider).[toConceptWrapper](AtomicCvProvider#toconceptwrapper)

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-provider.ts:66](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-provider.ts#L66)
