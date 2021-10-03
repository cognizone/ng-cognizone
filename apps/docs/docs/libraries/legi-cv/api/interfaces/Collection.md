---
id: "Collection"
title: "Interface: Collection<T>"
sidebar_label: "Collection"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Concept`](Concept)[`Concept`](Concept) |

## Hierarchy

- `JsonModel`

  ↳ **`Collection`**

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

[libs/ng-application-profile/src/lib/models/json-model.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/models/json-model.ts#L12)

___

### @facets

• `Optional` **@facets**: `Object`

#### Inherited from

JsonModel.@facets

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:16](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/models/json-model.ts#L16)

___

### @id

• **@id**: `string`

#### Inherited from

JsonModel.@id

#### Defined in

[libs/ng-application-profile/src/lib/models/json-model.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/models/json-model.ts#L10)

___

### @type

• **@type**: `Many`<`string`\> \| [``"Collection"``, ...string[]]

#### Overrides

JsonModel.@type

#### Defined in

[libs/legi-cv/src/lib/models/collection.ts:7](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/models/collection.ts#L7)

___

### member

• **member**: `T`[]

#### Defined in

[libs/legi-cv/src/lib/models/collection.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/models/collection.ts#L9)

___

### prefLabel

• `Optional` **prefLabel**: `LangString`

#### Defined in

[libs/legi-cv/src/lib/models/collection.ts:8](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/models/collection.ts#L8)
