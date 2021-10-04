---
id: "AtomicCvClient"
title: "Interface: AtomicCvClient"
sidebar_label: "AtomicCvClient"
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`ElasticAtomicCvClientService`](../classes/ElasticAtomicCvClientService)

## Methods

### getCollection

▸ **getCollection**<`T`\>(`uri`, `conceptSchemeUri?`): `Completable`<[`Collection`](Collection)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](Concept)<`T`\>[`Concept`](Concept) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |
| `conceptSchemeUri?` | `string` |

#### Returns

`Completable`<[`Collection`](Collection)<`T`\>\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-client.service.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-client.service.ts#L12)

___

### getConceptScheme

▸ **getConceptScheme**<`T`\>(`uri`): `Completable`<[`ConceptScheme`](ConceptScheme)<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](Concept)<`T`\>[`Concept`](Concept) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`Completable`<[`ConceptScheme`](ConceptScheme)<`T`\>\>

#### Defined in

[libs/legi-cv/src/lib/services/atomic-cv-client.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/atomic-cv-client.service.ts#L11)
