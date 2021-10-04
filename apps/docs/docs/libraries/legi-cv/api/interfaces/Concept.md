---
id: "Concept"
title: "Interface: Concept"
sidebar_label: "Concept"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `JsonModel`

  ↳ **`Concept`**

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

[libs/legi-cv/src/lib/models/concept.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L7)

___

### altLabel

• `Optional` **altLabel**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L14)

___

### broader

• `Optional` **broader**: `string`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L17)

___

### broaderTransitive

• `Optional` **broaderTransitive**: `string`[]

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L18)

___

### created

• `Optional` **created**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L10)

___

### definition

• `Optional` **definition**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L15)

___

### deprecated

• `Optional` **deprecated**: `boolean`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L11)

___

### hiddenLabel

• `Optional` **hiddenLabel**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L9)

___

### inScheme

• `Optional` **inScheme**: [`ConceptScheme`](ConceptScheme)<[`Concept`](Concept)\>

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L8)

___

### narrower

• `Optional` **narrower**: [`Concept`](Concept)[]

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L13)

___

### order

• `Optional` **order**: `number`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L19)

___

### prefLabel

• `Optional` **prefLabel**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L12)

___

### status

• `Optional` **status**: `string`

#### Defined in

[libs/legi-cv/src/lib/models/concept.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept.ts#L16)
