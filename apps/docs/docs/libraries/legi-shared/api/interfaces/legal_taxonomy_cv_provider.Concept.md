---
id: "legal_taxonomy_cv_provider.Concept"
title: "Interface: Concept"
sidebar_label: "Concept"
custom_edit_url: null
---

[legal-taxonomy-cv-provider](../modules/legal_taxonomy_cv_provider).Concept

## Hierarchy

- `JsonModel`

  ↳ **`Concept`**

  ↳↳ [`LegalTaxonomy`](legal_taxonomy_cv_provider.LegalTaxonomy)

## Properties

### @context

• **@context**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `isNew?` | `boolean` |
| `rootUri` | `string` |

#### Inherited from

JsonModel.@context

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L12)

___

### @facets

• `Optional` **@facets**: `Object`

#### Inherited from

JsonModel.@facets

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L16)

___

### @id

• **@id**: `string`

#### Inherited from

JsonModel.@id

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L10)

___

### @type

• **@type**: `Many`<`string`\> \| [``"Concept"``, ...string[]]

#### Overrides

JsonModel.@type

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L5)

___

### altLabel

• `Optional` **altLabel**: `LangString`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L11)

___

### broader

• `Optional` **broader**: `string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L19)

___

### broaderTransitive

• `Optional` **broaderTransitive**: `string`[]

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L20)

___

### created

• `Optional` **created**: `LangString`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L7)

___

### definition

• `Optional` **definition**: `LangString`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L12)

___

### deprecated

• `Optional` **deprecated**: `boolean`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L8)

___

### hiddenLabel

• `Optional` **hiddenLabel**: `LangString`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L6)

___

### idSystematique

• `Optional` **idSystematique**: `string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L13)

___

### iso\_639\_3

• `Optional` **iso\_639\_3**: `string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L14)

___

### narrower

• `Optional` **narrower**: [`Concept`](legal_taxonomy_cv_provider.Concept)[]

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L10)

___

### notationTypeGroup

• `Optional` **notationTypeGroup**: `string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L18)

___

### notationTypeId

• `Optional` **notationTypeId**: `string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L17)

___

### order

• `Optional` **order**: `number`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L21)

___

### prefLabel

• `Optional` **prefLabel**: `LangString`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L9)

___

### status

• `Optional` **status**: `string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L15)

___

### subject

• `Optional` **subject**: `string`[]

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/models/concept.ts#L16)
