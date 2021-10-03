---
id: "ApService"
title: "Class: ApService"
sidebar_label: "ApService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ApService**(`apStore`, `loaders`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apStore` | `ApStore` |
| `loaders` | [`ApLoader`](../interfaces/ApLoader)[] |

#### Defined in

[ng-application-profile/src/lib/services/ap.service.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap.service.ts#L12)

## Methods

### addAp

▸ **addAp**(`apName`, `ap`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `apName` | `string` |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |

#### Returns

`void`

#### Defined in

[ng-application-profile/src/lib/services/ap.service.ts:27](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap.service.ts#L27)

___

### getAp

▸ **getAp**(`apName`): [`ApplicationProfile`](../modules#applicationprofile)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apName` | `string` |

#### Returns

[`ApplicationProfile`](../modules#applicationprofile)

#### Defined in

[ng-application-profile/src/lib/services/ap.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap.service.ts#L21)

___

### init

▸ **init**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[ng-application-profile/src/lib/services/ap.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap.service.ts#L14)

___

### loadAp

▸ `Private` **loadAp**(`loader`): `Promise`<[`ApplicationProfile`](../modules#applicationprofile)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `loader` | [`ApLoader`](../interfaces/ApLoader) |

#### Returns

`Promise`<[`ApplicationProfile`](../modules#applicationprofile)\>

#### Defined in

[ng-application-profile/src/lib/services/ap.service.ts:31](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap.service.ts#L31)
