---
id: "DefaultMapper"
title: "Class: DefaultMapper"
sidebar_label: "DefaultMapper"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`MicroAttributeMapper`](../interfaces/MicroAttributeMapper)<`unknown`, `unknown`\>

## Constructors

### constructor

• **new DefaultMapper**()

## Properties

### priority

• **priority**: `number` = `-1000`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[priority](../interfaces/MicroAttributeMapper#priority)

#### Defined in

[ng-application-profile/src/lib/services/mappers/default-mapper.service.ts:4](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/default-mapper.service.ts#L4)

## Methods

### deserialize

▸ **deserialize**(`dataType`, `value`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `unknown` |

#### Returns

`unknown`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[deserialize](../interfaces/MicroAttributeMapper#deserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/default-mapper.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/default-mapper.service.ts#L10)

___

### serialize

▸ **serialize**(`dataType`, `value`): `unknown`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `unknown` |

#### Returns

`unknown`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[serialize](../interfaces/MicroAttributeMapper#serialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/default-mapper.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/default-mapper.service.ts#L18)

___

### supportDeserialize

▸ **supportDeserialize**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportDeserialize](../interfaces/MicroAttributeMapper#supportdeserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/default-mapper.service.ts:6](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/default-mapper.service.ts#L6)

___

### supportSerialize

▸ **supportSerialize**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportSerialize](../interfaces/MicroAttributeMapper#supportserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/default-mapper.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/default-mapper.service.ts#L14)
