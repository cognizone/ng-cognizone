---
id: "ElasticSearchResponse"
title: "Interface: ElasticSearchResponse<T>"
sidebar_label: "ElasticSearchResponse"
sidebar_position: 0
custom_edit_url: null
---

Describe the response of a search done on Elastic 7+, with `_source` in hits
being typed with `T`

## Type parameters

| Name |
| :------ |
| `T` |

## Properties

### \_shards

• **\_shards**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `failed` | `number` |
| `skipped` | `number` |
| `successful` | `number` |
| `total` | `number` |

#### Defined in

[lib/models/elastic-response.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/model-utils/src/lib/models/elastic-response.ts#L9)

___

### aggregations

• **aggregations**: `Object`

#### Index signature

▪ [key: `string`]: [`ElasticAggregation`](ElasticAggregation)

#### Defined in

[lib/models/elastic-response.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/model-utils/src/lib/models/elastic-response.ts#L23)

___

### hits

• **hits**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hits` | [`ElasticHit`](ElasticHit)<`T`\>[] |
| `max_score` | ``null`` \| `number` |
| `total` | `Object` |
| `total.relation` | ``"eq"`` \| ``"gte"`` |
| `total.value` | `number` |

#### Defined in

[lib/models/elastic-response.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/model-utils/src/lib/models/elastic-response.ts#L15)

___

### timed\_out

• **timed\_out**: `boolean`

#### Defined in

[lib/models/elastic-response.ts:8](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/model-utils/src/lib/models/elastic-response.ts#L8)

___

### took

• **took**: `number`

#### Defined in

[lib/models/elastic-response.ts:7](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/model-utils/src/lib/models/elastic-response.ts#L7)
