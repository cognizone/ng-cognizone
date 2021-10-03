---
id: "ElasticClient"
title: "Class: ElasticClient"
sidebar_label: "ElasticClient"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`ElasticRawClient`](ElasticRawClient)

  ↳ **`ElasticClient`**

## Implements

- [`IElasticClient`](../interfaces/IElasticClient)

## Constructors

### constructor

• **new ElasticClient**(`http`, `resourceGraphService`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `resourceGraphService` | `ResourceGraphService` |
| `logger` | `Logger` |

#### Overrides

[ElasticRawClient](ElasticRawClient).[constructor](ElasticRawClient#constructor)

#### Defined in

[libs/elastic/src/lib/services/elastic-client.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-client.service.ts#L15)

## Properties

### apName

• `Abstract` **apName**: `string`

#### Defined in

[libs/elastic/src/lib/services/elastic-client.service.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-client.service.ts#L13)

___

### baseUrl

• `Abstract` **baseUrl**: `string`

#### Inherited from

[ElasticRawClient](ElasticRawClient).[baseUrl](ElasticRawClient#baseurl)

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L11)

___

### http

• `Protected` **http**: `HttpClient`

#### Inherited from

[ElasticRawClient](ElasticRawClient).[http](ElasticRawClient#http)

___

### index

• `Abstract` **index**: `string`

#### Inherited from

[ElasticRawClient](ElasticRawClient).[index](ElasticRawClient#index)

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L9)

___

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

[ElasticRawClient](ElasticRawClient).[logger](ElasticRawClient#logger)

___

### resourceGraphService

• `Protected` **resourceGraphService**: `ResourceGraphService`

## Methods

### getSearchUrl

▸ `Protected` **getSearchUrl**(): `string`

#### Returns

`string`

#### Inherited from

[ElasticRawClient](ElasticRawClient).[getSearchUrl](ElasticRawClient#getsearchurl)

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L23)

___

### search

▸ **search**<`T`\>(`query`, `options?`): `Observable`<`ElasticSearchResponse`<`T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

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

#### Implementation of

[IElasticClient](../interfaces/IElasticClient).[search](../interfaces/IElasticClient#search)

#### Defined in

[libs/elastic/src/lib/services/elastic-client.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-client.service.ts#L19)

___

### searchOne

▸ **searchOne**<`T`\>(`query`, `options?`): `Observable`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

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

#### Implementation of

[IElasticClient](../interfaces/IElasticClient).[searchOne](../interfaces/IElasticClient#searchone)

#### Defined in

[libs/elastic/src/lib/services/elastic-client.service.ts:26](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-client.service.ts#L26)

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

#### Inherited from

[ElasticRawClient](ElasticRawClient).[searchOneRaw](ElasticRawClient#searchoneraw)

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

#### Inherited from

[ElasticRawClient](ElasticRawClient).[searchRaw](ElasticRawClient#searchraw)

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L15)
