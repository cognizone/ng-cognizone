---
id: "legal_taxonomy_cv_provider.LegalTaxonomyClientService"
title: "Class: LegalTaxonomyClientService"
sidebar_label: "LegalTaxonomyClientService"
custom_edit_url: null
---

[legal-taxonomy-cv-provider](../modules/legal_taxonomy_cv_provider).LegalTaxonomyClientService

## Hierarchy

- `ElasticClient`

  ↳ **`LegalTaxonomyClientService`**

## Constructors

### constructor

• **new LegalTaxonomyClientService**(`http`, `resourceGraphService`, `logger`, `optionsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `http` | `HttpClient` |
| `resourceGraphService` | `ResourceGraphService` |
| `logger` | `Logger` |
| `optionsService` | [`LegalTaxonomyCvProviderOptionsService`](legal_taxonomy_cv_provider.LegalTaxonomyCvProviderOptionsService) |

#### Overrides

ElasticClient.constructor

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts#L21)

## Properties

### http

• `Protected` **http**: `HttpClient`

#### Inherited from

ElasticClient.http

___

### logger

• `Protected` **logger**: `Logger`

#### Inherited from

ElasticClient.logger

___

### resourceGraphService

• `Protected` **resourceGraphService**: `ResourceGraphService`

#### Inherited from

ElasticClient.resourceGraphService

## Accessors

### apName

• `get` **apName**(): `string`

#### Returns

`string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts#L11)

___

### baseUrl

• `get` **baseUrl**(): `string`

#### Returns

`string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts#L17)

___

### index

• `get` **index**(): `string`

#### Returns

`string`

#### Defined in

[libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/legal-taxonomy-cv-provider/services/legal-taxonomy-client.service.ts#L14)

## Methods

### getSearchUrl

▸ `Protected` **getSearchUrl**(): `string`

#### Returns

`string`

#### Inherited from

ElasticClient.getSearchUrl

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L23)

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

#### Inherited from

ElasticClient.search

#### Defined in

[libs/elastic/src/lib/services/elastic-client.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-client.service.ts#L19)

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

#### Inherited from

ElasticClient.searchOne

#### Defined in

[libs/elastic/src/lib/services/elastic-client.service.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-client.service.ts#L26)

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

ElasticClient.searchOneRaw

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

ElasticClient.searchRaw

#### Defined in

[libs/elastic/src/lib/services/elastic-raw-client.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/elastic/src/lib/services/elastic-raw-client.service.ts#L15)
