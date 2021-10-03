---
id: "UserActionService"
title: "Class: UserActionService"
sidebar_label: "UserActionService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new UserActionService**(`client`, `optionsService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`UserActionClient`](UserActionClient) |
| `optionsService` | [`UserActionOptionsService`](UserActionOptionsService) |

#### Defined in

[libs/user-action/src/lib/service/user-action.service.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/service/user-action.service.ts#L12)

## Methods

### buildQuery

▸ `Private` **buildQuery**(`options`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`UserActionSearchOptions`](../interfaces/UserActionSearchOptions) |

#### Returns

`Object`

#### Defined in

[libs/user-action/src/lib/service/user-action.service.ts:35](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/service/user-action.service.ts#L35)

___

### getOptionsFromAggregations

▸ **getOptionsFromAggregations**(`aggregation`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `aggregation` | `Dictionary`<`ElasticAggregation`\> |

#### Returns

`string`[]

#### Defined in

[libs/user-action/src/lib/service/user-action.service.ts:25](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/service/user-action.service.ts#L25)

___

### search

▸ **search**(`options`): `Observable`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`UserActionSearchOptions`](../interfaces/UserActionSearchOptions) |

#### Returns

`Observable`<`Object`\>

#### Defined in

[libs/user-action/src/lib/service/user-action.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/user-action/src/lib/service/user-action.service.ts#L14)
