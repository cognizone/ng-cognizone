---
id: "ElasticAtomicCvClientService"
title: "Class: ElasticAtomicCvClientService"
sidebar_label: "ElasticAtomicCvClientService"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`AtomicCvClient`](../interfaces/AtomicCvClient)

## Constructors

### constructor

• **new ElasticAtomicCvClientService**(`optionsService`, `http`, `resourceGraphService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `optionsService` | [`LegiCvOptionsService`](LegiCvOptionsService) |
| `http` | `HttpClient` |
| `resourceGraphService` | `ResourceGraphService` |

#### Defined in

[libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts#L19)

## Methods

### getCollection

▸ **getCollection**<`T`\>(`uri`): `Completable`<[`Collection`](../interfaces/Collection)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](../interfaces/Concept)<`T`\>[`Concept`](../interfaces/Concept) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`Completable`<[`Collection`](../interfaces/Collection)<`T`\>\>

#### Implementation of

[AtomicCvClient](../interfaces/AtomicCvClient).[getCollection](../interfaces/AtomicCvClient#getcollection)

#### Defined in

[libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts:40](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts#L40)

___

### getConceptScheme

▸ **getConceptScheme**<`T`\>(`uri`): `Completable`<[`ConceptScheme`](../interfaces/ConceptScheme)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](../interfaces/Concept)<`T`\>[`Concept`](../interfaces/Concept) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`Completable`<[`ConceptScheme`](../interfaces/ConceptScheme)<`T`\>\>

#### Implementation of

[AtomicCvClient](../interfaces/AtomicCvClient).[getConceptScheme](../interfaces/AtomicCvClient#getconceptscheme)

#### Defined in

[libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts#L21)

___

### getSearchUrl

▸ `Protected` **getSearchUrl**(): `string`

#### Returns

`string`

#### Defined in

[libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts:74](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts#L74)

___

### searchOneInElastic

▸ `Protected` **searchOneInElastic**<`T`\>(`query`): `Observable`<`Nil`<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Object` |

#### Returns

`Observable`<`Nil`<`T`\>\>

#### Defined in

[libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/elastic-atomic-cv-client.service.ts#L63)
