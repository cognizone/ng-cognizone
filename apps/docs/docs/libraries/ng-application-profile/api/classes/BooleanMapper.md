---
id: "BooleanMapper"
title: "Class: BooleanMapper"
sidebar_label: "BooleanMapper"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`MicroAttributeMapper`](../interfaces/MicroAttributeMapper)<`boolean` \| `string`, `boolean`\>

## Constructors

### constructor

• **new BooleanMapper**()

## Methods

### deserialize

▸ **deserialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `string` |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[deserialize](../interfaces/MicroAttributeMapper#deserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts#L10)

___

### serialize

▸ **serialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `boolean` |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[serialize](../interfaces/MicroAttributeMapper#serialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts#L18)

___

### supportDeserialize

▸ **supportDeserialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `string` |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportDeserialize](../interfaces/MicroAttributeMapper#supportdeserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts#L6)

___

### supportSerialize

▸ **supportSerialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `boolean` |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportSerialize](../interfaces/MicroAttributeMapper#supportserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts#L14)

___

### toBoolean

▸ `Private` **toBoolean**(`val`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `string` \| `boolean` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/boolean-mapper.service.ts#L22)
