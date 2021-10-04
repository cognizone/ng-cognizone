---
id: "modules"
title: "@cognizone/elastic"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [ElasticApClient](classes/ElasticApClient)
- [ElasticClient](classes/ElasticClient)
- [ElasticRawClient](classes/ElasticRawClient)

## Interfaces

- [ElasticApClientFetchOptions](interfaces/ElasticApClientFetchOptions)
- [IElasticClient](interfaces/IElasticClient)

## Type aliases

### ElasticQuery

Ƭ **ElasticQuery**: `any`

#### Defined in

[libs/elastic/src/lib/models/elastic-query.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/models/elastic-query.ts#L3)

___

### ElasticSearchOptions

Ƭ **ElasticSearchOptions**: `Parameters`<`HttpClient`[``"post"``]\>[``2``]

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:28](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L28)

## Functions

### getByUriQuery

▸ **getByUriQuery**(`uri`, `isKeyword?`): [`ElasticQuery`](modules#elasticquery)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `uri` | `string` | `undefined` |
| `isKeyword` | `boolean` | `true` |

#### Returns

[`ElasticQuery`](modules#elasticquery)

#### Defined in

[libs/elastic/src/lib/utils/get-by-uri-query.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/utils/get-by-uri-query.ts#L3)

___

### getByUrisQuery

▸ **getByUrisQuery**(`uris`, `isKeyword?`): [`ElasticQuery`](modules#elasticquery)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `uris` | `string`[] | `undefined` |
| `isKeyword` | `boolean` | `true` |

#### Returns

[`ElasticQuery`](modules#elasticquery)

#### Defined in

[libs/elastic/src/lib/utils/get-by-uris-query.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/utils/get-by-uris-query.ts#L3)
