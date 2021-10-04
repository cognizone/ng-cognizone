---
id: "ConceptScheme"
title: "Interface: ConceptScheme<T>"
sidebar_label: "ConceptScheme"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](Concept)[`Concept`](Concept) |

## Hierarchy

- `JsonModel`

  ↳ **`ConceptScheme`**

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

• **@type**: `Many`<`string`\> \| [``"ConceptScheme"``, ...string[]]

#### Overrides

JsonModel.@type

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L8)

___

### altLabel

• `Optional` **altLabel**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L10)

___

### description

• `Optional` **description**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L11)

___

### hasMicroThesaurus

• `Optional` **hasMicroThesaurus**: [`Collection`](Collection)<`T`\>[]

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L14)

___

### hasTopConcept

• `Optional` **hasTopConcept**: `T`[]

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L13)

___

### prefLabel

• `Optional` **prefLabel**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L9)

___

### title

• `Optional` **title**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/concept-scheme.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/models/concept-scheme.ts#L12)
