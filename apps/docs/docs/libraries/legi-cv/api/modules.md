---
id: "modules"
title: "@cognizone/legi-cv"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [AtomicCvProvider](classes/AtomicCvProvider)
- [CollectionCvProvider](classes/CollectionCvProvider)
- [ConceptMatcherService](classes/ConceptMatcherService)
- [ConceptSchemeCvProvider](classes/ConceptSchemeCvProvider)
- [CvLabelDirective](classes/CvLabelDirective)
- [CvOptionsDirective](classes/CvOptionsDirective)
- [CvSelectOptionsProvider](classes/CvSelectOptionsProvider)
- [CvService](classes/CvService)
- [CvStateService](classes/CvStateService)
- [CvValueDirective](classes/CvValueDirective)
- [ElasticAtomicCvClientService](classes/ElasticAtomicCvClientService)
- [LegiCvModule](classes/LegiCvModule)
- [LegiCvOptionsService](classes/LegiCvOptionsService)
- [LegiCvState](classes/LegiCvState)
- [SetCv](classes/SetCv)

## Interfaces

- [AtomicCvClient](interfaces/AtomicCvClient)
- [AtomicCvProviderConfig](interfaces/AtomicCvProviderConfig)
- [Collection](interfaces/Collection)
- [Concept](interfaces/Concept)
- [ConceptGroup](interfaces/ConceptGroup)
- [ConceptScheme](interfaces/ConceptScheme)
- [ConceptWrapper](interfaces/ConceptWrapper)
- [CvProvider](interfaces/CvProvider)
- [HasOptionsProvider](interfaces/HasOptionsProvider)
- [LegiCvOptions](interfaces/LegiCvOptions)
- [LegiCvStateModel](interfaces/LegiCvStateModel)

## Type aliases

### ConceptFilterableKey

Ƭ **ConceptFilterableKey**: keyof [`Concept`](interfaces/Concept)

**`description`** should only be keys that point to string, string[], LangString or LangStringSimple

#### Defined in

[libs/legi-cv/src/lib/models/concept-filterable-keys.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-filterable-keys.ts#L6)

___

### ConceptFilterableKeys

Ƭ **ConceptFilterableKeys**: [`ConceptFilterableKey`](modules#conceptfilterablekey)[]

#### Defined in

[libs/legi-cv/src/lib/models/concept-filterable-keys.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-filterable-keys.ts#L7)

___

### ConceptWrapperSorterFactory

Ƭ **ConceptWrapperSorterFactory**: (`params`: [`GetCvParams`](modules#getcvparams)) => `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)\>

#### Type declaration

▸ (`params`): `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`GetCvParams`](modules#getcvparams) |

##### Returns

`Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)\>

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L12)

___

### Cv

Ƭ **Cv**: [`CvArray`](modules#cvarray) \| [`CvDictionary`](modules#cvdictionary)

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L8)

___

### CvArray

Ƭ **CvArray**: [`Concept`](interfaces/Concept)[]

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L6)

___

### CvDictionary

Ƭ **CvDictionary**: `Object`

#### Index signature

▪ [uri: `string`]: [`Concept`](interfaces/Concept)

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L7)

___

### GetCvParams

Ƭ **GetCvParams**: `GetSelectOptionsParams`

#### Defined in

[libs/legi-cv/src/lib/models/get-cv-params.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/get-cv-params.ts#L3)

___

### MatchType

Ƭ **MatchType**: ``"includes"`` \| ``"startWith"``

#### Defined in

[libs/legi-cv/src/lib/models/match-type.ts:1](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/match-type.ts#L1)

## Variables

### ATOMIC\_CV\_CLIENT\_TOKEN

• **ATOMIC\_CV\_CLIENT\_TOKEN**: `InjectionToken`<[`AtomicCvClient`](interfaces/AtomicCvClient)\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-client.service.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-client.service.ts#L8)

___

### CV\_PROVIDER\_TOKEN

• **CV\_PROVIDER\_TOKEN**: `InjectionToken`<[`CvProvider`](interfaces/CvProvider)<[`Concept`](interfaces/Concept)\>[]\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L21)

___

### DEFAULT\_LEGI\_CV\_OPTIONS

• **DEFAULT\_LEGI\_CV\_OPTIONS**: [`LegiCvOptions`](interfaces/LegiCvOptions)

#### Defined in

[libs/legi-cv/src/lib/models/legi-cv-options.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/legi-cv-options.ts#L14)

___

### HAS\_OPTIONS\_PROVIDER\_TOKEN

• **HAS\_OPTIONS\_PROVIDER\_TOKEN**: `InjectionToken`<[`HasOptionsProvider`](interfaces/HasOptionsProvider)<`unknown`\>\>

#### Defined in

[libs/legi-cv/src/lib/directives/cv-options.directive.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/directives/cv-options.directive.ts#L11)

___

### LEGI\_CV\_OPTIONS\_TOKEN

• **LEGI\_CV\_OPTIONS\_TOKEN**: `InjectionToken`<[`LegiCvOptions`](interfaces/LegiCvOptions)\>

#### Defined in

[libs/legi-cv/src/lib/models/legi-cv-options.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/legi-cv-options.ts#L23)

___

### LEGI\_CV\_STATE\_TOKEN

• **LEGI\_CV\_STATE\_TOKEN**: `StateToken`<[`LegiCvStateModel`](interfaces/LegiCvStateModel)\>

#### Defined in

[libs/legi-cv/src/lib/store/cv.state.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/store/cv.state.ts#L12)

___

### elasticAtomicCvClientServiceProvider

• **elasticAtomicCvClientServiceProvider**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `provide` | `InjectionToken`<[`AtomicCvClient`](interfaces/AtomicCvClient)\> |
| `useExisting` | typeof [`ElasticAtomicCvClientService`](classes/ElasticAtomicCvClientService) |

#### Defined in

[libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts:80](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts#L80)

## Functions

### areConcepts

▸ **areConcepts**<`T`\>(`concepts`): concepts is T[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](interfaces/Concept)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `concepts` | (`T` \| [`ConceptGroup`](interfaces/ConceptGroup)<`T`\>)[] |

#### Returns

concepts is T[]

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:45](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L45)

___

### composeConceptWrapperSorterFactories

▸ **composeConceptWrapperSorterFactories**(`sorterFactories`): [`ConceptWrapperSorterFactory`](modules#conceptwrappersorterfactory)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sorterFactories` | [`ConceptWrapperSorterFactory`](modules#conceptwrappersorterfactory)[] |

#### Returns

[`ConceptWrapperSorterFactory`](modules#conceptwrappersorterfactory)

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:44](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L44)

___

### countConceptWrapperSorterFactory

▸ `Const` **countConceptWrapperSorterFactory**(`params`): `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L19)

___

### getAllConcepts

▸ **getAllConcepts**<`T`\>(`concepts`): `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](interfaces/Concept)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `concepts` | (`T` \| [`ConceptGroup`](interfaces/ConceptGroup)<`T`\>)[] |

#### Returns

`T`[]

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L15)

___

### groupConcepts

▸ **groupConcepts**<`T`\>(`concepts`): [`ConceptGroup`](interfaces/ConceptGroup)<`T`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](interfaces/Concept)<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `concepts` | (`T` \| [`ConceptGroup`](interfaces/ConceptGroup)<`T`\>)[] |

#### Returns

[`ConceptGroup`](interfaces/ConceptGroup)<`T`\>[]

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:27](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L27)

___

### isConcept

▸ **isConcept**(`o`): o is Concept

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is Concept

#### Defined in

[libs/legi-cv/src/lib/models/cv.ts:49](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/cv.ts#L49)

___

### labelConceptWrapperSorterFactory

▸ `Const` **labelConceptWrapperSorterFactory**(`params`): `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:25](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L25)

___

### orderConceptWrapperSorterFactory

▸ `Const` **orderConceptWrapperSorterFactory**(`params`): `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L16)

___

### provideCollectionCvProvider

▸ **provideCollectionCvProvider**(`config`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AtomicCvProviderConfig`](interfaces/AtomicCvProviderConfig) |

#### Returns

`Provider`

#### Defined in

[libs/legi-cv/src/lib/services/collection-cv-provider.ts:42](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/collection-cv-provider.ts#L42)

___

### provideConceptSchemeCvProvider

▸ **provideConceptSchemeCvProvider**(`config`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AtomicCvProviderConfig`](interfaces/AtomicCvProviderConfig) |

#### Returns

`Provider`

#### Defined in

[libs/legi-cv/src/lib/services/concept-scheme-cv-provider.ts:60](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/concept-scheme-cv-provider.ts#L60)

___

### provideCvProvider

▸ **provideCvProvider**(`type`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Type`<[`CvProvider`](interfaces/CvProvider)<[`Concept`](interfaces/Concept)\>\> |

#### Returns

`Provider`

#### Defined in

[libs/legi-cv/src/lib/services/cv-provider.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-provider.ts#L23)

___

### provideHasOptionsProvider

▸ **provideHasOptionsProvider**(`type`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `unknown` |

#### Returns

`Provider`

#### Defined in

[libs/legi-cv/src/lib/directives/cv-options.directive.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/directives/cv-options.directive.ts#L13)

___

### scoreConceptWrapperSorterFactory

▸ `Const` **scoreConceptWrapperSorterFactory**(`params`): `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L14)

___

### uriConceptWrapperSorterFactory

▸ `Const` **uriConceptWrapperSorterFactory**(`params`): `Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `GetSelectOptionsParams` |

#### Returns

`Sorter`<[`ConceptWrapper`](interfaces/ConceptWrapper)<[`Concept`](interfaces/Concept)\>\>

#### Defined in

[libs/legi-cv/src/lib/models/concept-wrapper.ts:41](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-wrapper.ts#L41)
