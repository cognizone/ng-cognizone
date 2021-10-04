---
id: "legal_taxonomy_cv_provider.LegalTaxonomyCvProvider"
title: "Class: LegalTaxonomyCvProvider"
sidebar_label: "LegalTaxonomyCvProvider"
custom_edit_url: null
---

[legal-taxonomy-cv-provider](../modules/legal_taxonomy_cv_provider).LegalTaxonomyCvProvider

## Implements

- `CvProvider`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)\>

## Constructors

### constructor

• **new LegalTaxonomyCvProvider**(`casematesClient`, `optionsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `casematesClient` | [`LegalTaxonomyClientService`](legal_taxonomy_cv_provider.LegalTaxonomyClientService) |
| `optionsService` | [`LegalTaxonomyCvProviderOptionsService`](legal_taxonomy_cv_provider.LegalTaxonomyCvProviderOptionsService) |

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L20)

## Properties

### classId

• **classId**: `string` = `'LegalTaxonomy'`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L14)

___

### cvName

• **cvName**: `string` = `'LEGAL_TAXONOMY'`

#### Implementation of

CvProvider.cvName

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L13)

___

### cvUri

• **cvUri**: `string` = `'https://fedlex.data.admin.ch/vocabulary/legal-taxonomy'`

#### Implementation of

CvProvider.cvUri

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L15)

___

### getConceptByUriCache

• `Private` **getConceptByUriCache**: { `key`: `string` ; `value`: `Observable`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)\>  }[] = `[]`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L18)

___

### getCvCache

• `Private` **getCvCache**: { `key`: `string` ; `value`: `Observable`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)[]\>  }[] = `[]`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L17)

## Methods

### buildElasticQuery

▸ `Protected` **buildElasticQuery**(`query?`): `ElasticQuery`

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | `string` |

#### Returns

`ElasticQuery`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:91](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L91)

___

### getConceptByUri

▸ **getConceptByUri**(`conceptUri`): `Observable`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conceptUri` | `string` |

#### Returns

`Observable`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)\>

#### Implementation of

CvProvider.getConceptByUri

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:49](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L49)

___

### getCv

▸ **getCv**(`query?`): `Observable`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query?` | `string` |

#### Returns

`Observable`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)[]\>

#### Implementation of

CvProvider.getCv

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L22)

___

### getLabel

▸ **getLabel**(`concept`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy) |

#### Returns

`string`

#### Implementation of

CvProvider.getLabel

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:87](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L87)

___

### hasConcept

▸ **hasConcept**(`conceptUri`): `Observable`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `conceptUri` | `string` |

#### Returns

`Observable`<`boolean`\>

#### Implementation of

CvProvider.hasConcept

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:83](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L83)

___

### toConceptWrapper

▸ **toConceptWrapper**(`concept`, `query`): `ConceptWrapper`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `concept` | [`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy) |
| `query` | `Nil`<`string`\> |

#### Returns

`ConceptWrapper`<[`LegalTaxonomy`](../interfaces/legal_taxonomy_cv_provider.LegalTaxonomy)\>

#### Implementation of

CvProvider.toConceptWrapper

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts:41](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-cv-provider.service.ts#L41)
