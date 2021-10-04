---
id: "ElasticQuery"
title: "Interface: ElasticQuery"
sidebar_label: "ElasticQuery"
sidebar_position: 0
custom_edit_url: null
---

This aims to describe an elastic search query, but it can be quite limitative
for now

**`deprecated`** use the one from `@cognizone/elastic` instead

## Properties

### aggs

• `Optional` **aggs**: `Object`

#### Index signature

▪ [key: `string`]: `AggregationQuery`

#### Defined in

[lib/models/elastic-query.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L22)

___

### from

• `Optional` **from**: `number`

#### Defined in

[lib/models/elastic-query.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L9)

___

### query

• **query**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bool?` | `Object` |
| `bool.filter` | `unknown`[] |
| `bool.minimum_should_match?` | `number` |
| `bool.must` | `unknown`[] |
| `bool.must_not` | `unknown`[] |
| `bool.should` | `unknown`[] |
| `match?` | `object` |

#### Defined in

[lib/models/elastic-query.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L12)

___

### size

• `Optional` **size**: `number`

#### Defined in

[lib/models/elastic-query.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L10)

___

### sort

• `Optional` **sort**: `Object`

#### Index signature

▪ [field: `string`]: `ElasticSort`

#### Defined in

[lib/models/elastic-query.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L23)

___

### track\_total\_hits

• `Optional` **track\_total\_hits**: `boolean`

#### Defined in

[lib/models/elastic-query.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L11)
