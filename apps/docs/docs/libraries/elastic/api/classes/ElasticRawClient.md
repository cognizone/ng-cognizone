---
id: "ElasticRawClient"
title: "Class: ElasticRawClient"
sidebar_label: "ElasticRawClient"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`ElasticRawClient`**

  ↳ [`ElasticClient`](ElasticClient)

## Constructors

### constructor

• **new ElasticRawClient**(`http`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `logger` | `Logger` |

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L13)

## Properties

### baseUrl

• `Abstract` **baseUrl**: `string`

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L11)

___

### http

• `Protected` **http**: `HttpClient`

___

### index

• `Abstract` **index**: `string`

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L9)

___

### logger

• `Protected` **logger**: `Logger`

## Methods

### getSearchUrl

▸ `Protected` **getSearchUrl**(): `string`

#### Returns

`string`

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L23)

___

### searchOneRaw

▸ **searchOneRaw**<`T`\>(`query`, `options?`): `Observable`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `ResourceGraphRaw` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Object` |
| `options?` | `Object` |
| `options.context?` | `HttpContext` |
| `options.headers?` | `HttpHeaders` \| { [header: string]: `string` \| `string`[];  } |
| `options.observe?` | ``"body"`` |
| `options.params?` | `HttpParams` \| { [param: string]: `string` \| `number` \| `boolean` \| `ReadonlyArray`<`string` \| `number` \| `boolean`\>;  } |
| `options.reportProgress?` | `boolean` |
| `options.responseType?` | ``"json"`` |
| `options.withCredentials?` | `boolean` |

#### Returns

`Observable`<`T`\>

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L19)

___

### searchRaw

▸ **searchRaw**<`T`\>(`query`, `options?`): `Observable`<`ElasticSearchResponse`<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `ResourceGraphRaw` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | `Object` |
| `options?` | `Object` |
| `options.context?` | `HttpContext` |
| `options.headers?` | `HttpHeaders` \| { [header: string]: `string` \| `string`[];  } |
| `options.observe?` | ``"body"`` |
| `options.params?` | `HttpParams` \| { [param: string]: `string` \| `number` \| `boolean` \| `ReadonlyArray`<`string` \| `number` \| `boolean`\>;  } |
| `options.reportProgress?` | `boolean` |
| `options.responseType?` | ``"json"`` |
| `options.withCredentials?` | `boolean` |

#### Returns

`Observable`<`ElasticSearchResponse`<`T`\>\>

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L15)
