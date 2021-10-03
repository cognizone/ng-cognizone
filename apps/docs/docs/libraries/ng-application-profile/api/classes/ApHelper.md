---
id: "ApHelper"
title: "Class: ApHelper"
sidebar_label: "ApHelper"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ApHelper**(`logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `logger` | `Logger` |

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:27](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L27)

## Properties

### apMap

• `Private` **apMap**: `WeakMap`<[`ApplicationProfile`](../modules#applicationprofile), `number`\>

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L23)

___

### weakMapCount

• `Private` **weakMapCount**: `number` = `0`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:25](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L25)

## Methods

### getConcreteType

▸ **getConcreteType**(`ap`, `classIds`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `classIds` | `Many`<`string`\> |

#### Returns

`string`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:126](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L126)

___

### getRangeRule

▸ **getRangeRule**(`profile`, `key`): [`RangeRule`](../modules#rangerule)

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | [`TypeProfile`](../modules#typeprofile) |
| `key` | `string` |

#### Returns

[`RangeRule`](../modules#rangerule)

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:56](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L56)

___

### getRules

▸ **getRules**(`ap`, `types`, `key?`): [`Rule`](../modules#rule)<`string`, `unknown`\>[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `types` | `Many`<`string`\> |
| `key?` | `string` |

#### Returns

[`Rule`](../modules#rule)<`string`, `unknown`\>[]

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:105](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L105)

___

### getTypeProfile

▸ **getTypeProfile**(`ap`, `classIds`): [`TypeProfile`](../modules#typeprofile)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `classIds` | `Many`<`string`\> |

#### Returns

[`TypeProfile`](../modules#typeprofile)

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:38](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L38)

___

### hasAttribute

▸ **hasAttribute**(`profile`, `key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | [`TypeProfile`](../modules#typeprofile) |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:52](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L52)

___

### isAttribute

▸ **isAttribute**(`profile`, `key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | [`TypeProfile`](../modules#typeprofile) |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:66](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L66)

___

### isReference

▸ **isReference**(`profile`, `key`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | [`TypeProfile`](../modules#typeprofile) |
| `key` | `string` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:72](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L72)

___

### isRequiredAttribute

▸ **isRequiredAttribute**(`attr`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | [`AttributeProfile`](../modules#attributeprofile) |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:95](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L95)

___

### isSingle

▸ **isSingle**(`profile`, `attributeKey`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `profile` | [`TypeProfile`](../modules#typeprofile) |
| `attributeKey` | `string` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:78](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L78)

___

### isSingleAttribute

▸ **isSingleAttribute**(`attr`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `attr` | [`AttributeProfile`](../modules#attributeprofile) |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/ap-helper.service.ts:83](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-helper.service.ts#L83)
