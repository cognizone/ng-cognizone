---
id: "ResourceMapper"
title: "Class: ResourceMapper"
sidebar_label: "ResourceMapper"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ResourceMapper**(`mappers`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mappers` | [`MicroAttributeMapper`](../interfaces/MicroAttributeMapper)<`unknown`, `unknown`\>[] |

#### Defined in

[ng-application-profile/src/lib/services/resource-mapper.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-mapper.service.ts#L15)

## Properties

### attributeMapper

• `Private` **attributeMapper**: [`AttributeMapper`](../interfaces/AttributeMapper)

#### Defined in

[ng-application-profile/src/lib/services/resource-mapper.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-mapper.service.ts#L10)

## Methods

### deserialize

▸ **deserialize**<`T`\>(`raw`): [`Resource`](../interfaces/Resource)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `raw` | [`ResourceRaw`](../interfaces/ResourceRaw) |

#### Returns

[`Resource`](../interfaces/Resource)<`T`\>

#### Defined in

[ng-application-profile/src/lib/services/resource-mapper.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-mapper.service.ts#L23)

___

### deserializeAttribute

▸ `Private` **deserializeAttribute**<`T`, `U`\>(`dataType`, `value`): `U`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `T` |

#### Returns

`U`

#### Defined in

[ng-application-profile/src/lib/services/resource-mapper.service.ts:52](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-mapper.service.ts#L52)

___

### serialize

▸ **serialize**(`model`): [`ResourceRaw`](../interfaces/ResourceRaw)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Resource`](../interfaces/Resource)<`Object`\> |

#### Returns

[`ResourceRaw`](../interfaces/ResourceRaw)

#### Defined in

[ng-application-profile/src/lib/services/resource-mapper.service.ts:38](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-mapper.service.ts#L38)

___

### serializeAttribute

▸ `Private` **serializeAttribute**<`T`, `U`\>(`dataType`, `value`): `U`

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `T` |

#### Returns

`U`

#### Defined in

[ng-application-profile/src/lib/services/resource-mapper.service.ts:58](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/resource-mapper.service.ts#L58)
