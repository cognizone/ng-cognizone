---
id: "legal_taxonomy_cv_provider.LegalTaxonomy"
title: "Interface: LegalTaxonomy"
sidebar_label: "LegalTaxonomy"
custom_edit_url: null
---

[legal-taxonomy-cv-provider](../modules/legal_taxonomy_cv_provider).LegalTaxonomy

## Hierarchy

- [`Concept`](legal_taxonomy_cv_provider.Concept)

  ↳ **`LegalTaxonomy`**

## Properties

### @context

• **@context**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isNew?` | `boolean` |
| `rootUri` | `string` |

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[@context](legal_taxonomy_cv_provider.Concept#@context)

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L12)

___

### @facets

• `Optional` **@facets**: `Object`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[@facets](legal_taxonomy_cv_provider.Concept#@facets)

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L16)

___

### @id

• **@id**: `string`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[@id](legal_taxonomy_cv_provider.Concept#@id)

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L10)

___

### @type

• **@type**: `Many`<`string`\> \| [``"Concept"``, ...string[]]

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[@type](legal_taxonomy_cv_provider.Concept#@type)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L5)

___

### altLabel

• `Optional` **altLabel**: `LangString`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[altLabel](legal_taxonomy_cv_provider.Concept#altlabel)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L11)

___

### broader

• `Optional` **broader**: `string`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[broader](legal_taxonomy_cv_provider.Concept#broader)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L19)

___

### broaderTransitive

• `Optional` **broaderTransitive**: `string`[]

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[broaderTransitive](legal_taxonomy_cv_provider.Concept#broadertransitive)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L20)

___

### created

• `Optional` **created**: `LangString`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[created](legal_taxonomy_cv_provider.Concept#created)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L7)

___

### definition

• `Optional` **definition**: `LangString`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[definition](legal_taxonomy_cv_provider.Concept#definition)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L12)

___

### deprecated

• `Optional` **deprecated**: `boolean`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[deprecated](legal_taxonomy_cv_provider.Concept#deprecated)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L8)

___

### hiddenLabel

• `Optional` **hiddenLabel**: `LangString`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[hiddenLabel](legal_taxonomy_cv_provider.Concept#hiddenlabel)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L6)

___

### idSystematique

• **idSystematique**: `string`

#### Overrides

[Concept](legal_taxonomy_cv_provider.Concept).[idSystematique](legal_taxonomy_cv_provider.Concept#idsystematique)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/legal-taxonomy.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/legal-taxonomy.ts#L4)

___

### iso\_639\_3

• `Optional` **iso\_639\_3**: `string`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[iso_639_3](legal_taxonomy_cv_provider.Concept#iso_639_3)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L14)

___

### narrower

• `Optional` **narrower**: [`Concept`](legal_taxonomy_cv_provider.Concept)[]

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[narrower](legal_taxonomy_cv_provider.Concept#narrower)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L10)

___

### notationTypeGroup

• `Optional` **notationTypeGroup**: `string`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[notationTypeGroup](legal_taxonomy_cv_provider.Concept#notationtypegroup)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L18)

___

### notationTypeId

• `Optional` **notationTypeId**: `string`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[notationTypeId](legal_taxonomy_cv_provider.Concept#notationtypeid)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L17)

___

### order

• `Optional` **order**: `number`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[order](legal_taxonomy_cv_provider.Concept#order)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L21)

___

### prefLabel

• `Optional` **prefLabel**: `LangString`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[prefLabel](legal_taxonomy_cv_provider.Concept#preflabel)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L9)

___

### status

• `Optional` **status**: `string`

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[status](legal_taxonomy_cv_provider.Concept#status)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L15)

___

### subject

• `Optional` **subject**: `string`[]

#### Inherited from

[Concept](legal_taxonomy_cv_provider.Concept).[subject](legal_taxonomy_cv_provider.Concept#subject)

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L16)
