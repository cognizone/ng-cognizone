---
id: "IElasticClient"
title: "Interface: IElasticClient"
sidebar_label: "IElasticClient"
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`ElasticClient`](../classes/ElasticClient)

## Methods

### search

▸ **search**(`query`): `Observable`<`ElasticSearchResponse`<`unknown`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |

#### Returns

`Observable`<`ElasticSearchResponse`<`unknown`\>\>

#### Defined in

[libs/elastic/src/lib/models/elastic-client.ts:7](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/models/elastic-client.ts#L7)

___

### searchOne

▸ **searchOne**(`query`): `Observable`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `any` |

#### Returns

`Observable`<`unknown`\>

#### Defined in

[libs/elastic/src/lib/models/elastic-client.ts:8](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/models/elastic-client.ts#L8)
