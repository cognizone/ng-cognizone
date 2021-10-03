---
id: "JsonModelService"
title: "Class: JsonModelService"
sidebar_label: "JsonModelService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new JsonModelService**(`apHelper`, `idGenerator`, `apService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apHelper` | [`ApHelper`](ApHelper) |
| `idGenerator` | [`IdGenerator`](IdGenerator) |
| `apService` | [`ApService`](ApService) |

#### Defined in

[ng-application-profile/src/lib/services/json-model.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/json-model.service.ts#L14)

## Methods

### \_fromGraph

▸ `Private` **_fromGraph**(`o`, `graph`, `allUnflattened`, `ap`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |
| `graph` | [`JsonModelFlatGraph`](../interfaces/JsonModelFlatGraph)<[`JsonModelFlat`](../modules#jsonmodelflat)<[`JsonModel`](../interfaces/JsonModel)\>\> |
| `allUnflattened` | [`JsonModels`](../interfaces/JsonModels)<[`JsonModel`](../interfaces/JsonModel)\> |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |

#### Returns

`unknown`

#### Defined in

[ng-application-profile/src/lib/services/json-model.service.ts:56](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/json-model.service.ts#L56)

___

### \_toGraph

▸ `Private` **_toGraph**(`o`, `all`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |
| `all` | [`JsonModelFlatGraph`](../interfaces/JsonModelFlatGraph)<[`JsonModelFlat`](../modules#jsonmodelflat)<[`JsonModel`](../interfaces/JsonModel)\>\> |

#### Returns

`unknown`

#### Defined in

[ng-application-profile/src/lib/services/json-model.service.ts:86](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/json-model.service.ts#L86)

___

### createNewJsonModel

▸ **createNewJsonModel**(`types`, `apLike`, `root?`): [`JsonModel`](../interfaces/JsonModel)

#### Parameters

| Name | Type |
| :------ | :------ |
| `types` | `Many`<`string`\> |
| `apLike` | [`ApplicationProfileOrApName`](../modules#applicationprofileorapname) |
| `root?` | `string` \| [`JsonModel`](../interfaces/JsonModel) |

#### Returns

[`JsonModel`](../interfaces/JsonModel)

#### Defined in

[ng-application-profile/src/lib/services/json-model.service.ts:28](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/json-model.service.ts#L28)

___

### fromFlatGraph

▸ **fromFlatGraph**<`T`\>(`graph`, `apLike`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`JsonModel`](../interfaces/JsonModel) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`JsonModelFlatGraph`](../interfaces/JsonModelFlatGraph)<[`JsonModelFlat`](../modules#jsonmodelflat)<[`JsonModel`](../interfaces/JsonModel)\>\> |
| `apLike` | [`ApplicationProfileOrApName`](../modules#applicationprofileorapname) |

#### Returns

`T`

#### Defined in

[ng-application-profile/src/lib/services/json-model.service.ts:22](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/json-model.service.ts#L22)

___

### toFlatGraph

▸ **toFlatGraph**(`root`): [`JsonModelFlatGraph`](../interfaces/JsonModelFlatGraph)<[`JsonModelFlat`](../modules#jsonmodelflat)<[`JsonModel`](../interfaces/JsonModel)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`JsonModel`](../interfaces/JsonModel) |

#### Returns

[`JsonModelFlatGraph`](../interfaces/JsonModelFlatGraph)<[`JsonModelFlat`](../modules#jsonmodelflat)<[`JsonModel`](../interfaces/JsonModel)\>\>

#### Defined in

[ng-application-profile/src/lib/services/json-model.service.ts:16](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/json-model.service.ts#L16)
