---
id: "ResourceGraphService"
title: "Class: ResourceGraphService"
sidebar_label: "ResourceGraphService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ResourceGraphService**(`apHelper`, `apService`, `resourceMapper`, `prefixCc`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apHelper` | [`ApHelper`](ApHelper) |
| `apService` | [`ApService`](ApService) |
| `resourceMapper` | [`ResourceMapper`](ResourceMapper) |
| `prefixCc` | [`PrefixCcService`](PrefixCcService) |

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:24](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L24)

## Methods

### \_resourceToJsonModel

▸ `Private` **_resourceToJsonModel**<`T`\>(`data`, `ap?`): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`JsonModel`](../interfaces/JsonModel) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Resource`](../interfaces/Resource)<`Object`\> |
| `ap?` | [`ApplicationProfile`](../modules#applicationprofile) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `json` | `T` |
| `references` | `Object` |

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:157](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L157)

___

### getAp

▸ `Private` **getAp**(`ap`): [`ApplicationProfile`](../modules#applicationprofile)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfileOrApName`](../modules#applicationprofileorapname) |

#### Returns

[`ApplicationProfile`](../modules#applicationprofile)

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:176](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L176)

___

### jsonModelToResourceGraph

▸ `Private` **jsonModelToResourceGraph**(`json`, `ap`, `alreadyTransformed?`): `undefined` \| [`ResourceGraph`](../interfaces/ResourceGraph)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `undefined` \| [`JsonModel`](../interfaces/JsonModel) |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `alreadyTransformed` | `Set`<`string`\> |

#### Returns

`undefined` \| [`ResourceGraph`](../interfaces/ResourceGraph)

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:88](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L88)

___

### jsonModelToResourceGraphRaw

▸ **jsonModelToResourceGraphRaw**(`json`, `apLike`): `undefined` \| [`ResourceGraphRaw`](../modules#resourcegraphraw)

#### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `undefined` \| [`JsonModel`](../interfaces/JsonModel) |
| `apLike` | [`ApplicationProfileOrApName`](../modules#applicationprofileorapname) |

#### Returns

`undefined` \| [`ResourceGraphRaw`](../modules#resourcegraphraw)

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:31](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L31)

___

### resourceGraphRawToJsonModel

▸ **resourceGraphRawToJsonModel**(`rawSource`, `apLike?`): [`JsonModel`](../interfaces/JsonModel)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rawSource` | [`ResourceGraphRaw`](../modules#resourcegraphraw) |
| `apLike?` | [`ApplicationProfileOrApName`](../modules#applicationprofileorapname) |

#### Returns

[`JsonModel`](../interfaces/JsonModel)

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:52](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L52)

___

### shortenUri

▸ `Private` **shortenUri**(`uri`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |

#### Returns

`string`

#### Defined in

[ng-application-profile/src/lib/services/resource-graph.service.ts:152](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-graph.service.ts#L152)
