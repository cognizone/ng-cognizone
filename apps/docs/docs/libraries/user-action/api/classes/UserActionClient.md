---
id: "UserActionClient"
title: "Class: UserActionClient"
sidebar_label: "UserActionClient"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `ElasticRawClient`

  ↳ **`UserActionClient`**

## Constructors

### constructor

• **new UserActionClient**(`http`, `logger`, `optionsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `logger` | `Logger` |
| `optionsService` | [`UserActionOptionsService`](UserActionOptionsService) |

#### Overrides

ElasticRawClient.constructor

#### Defined in

[libs/user-action/src/lib/service/user-action-client.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/user-action/src/lib/service/user-action-client.service.ts#L18)

## Properties

### http

• `Protected` **http**: `HttpClient`

#### Inherited from

ElasticRawClient.http

___

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

ElasticRawClient.logger

## Accessors

### baseUrl

• `get` **baseUrl**(): `string`

#### Returns

`string`

#### Defined in

[libs/user-action/src/lib/service/user-action-client.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/user-action/src/lib/service/user-action-client.service.ts#L10)

___

### index

• `get` **index**(): `string`

#### Returns

`string`

#### Defined in

[libs/user-action/src/lib/service/user-action-client.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/user-action/src/lib/service/user-action-client.service.ts#L14)

## Methods

### getSearchUrl

▸ `Protected` **getSearchUrl**(): `string`

#### Returns

`string`

#### Inherited from

ElasticRawClient.getSearchUrl

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L23)

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

ElasticRawClient.searchOneRaw

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L19)

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

ElasticRawClient.searchRaw

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L15)
