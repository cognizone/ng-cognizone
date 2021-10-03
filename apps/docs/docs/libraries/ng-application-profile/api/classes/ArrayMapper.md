---
id: "ArrayMapper"
title: "Class: ArrayMapper"
sidebar_label: "ArrayMapper"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`MicroAttributeMapper`](../interfaces/MicroAttributeMapper)<`unknown`[], `unknown`[]\>

## Constructors

### constructor

• **new ArrayMapper**()

## Properties

### priority

• **priority**: `number` = `1000`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[priority](../interfaces/MicroAttributeMapper#priority)

#### Defined in

[ng-application-profile/src/lib/services/mappers/array-mapper.service.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/array-mapper.service.ts#L9)

## Methods

### deserialize

▸ **deserialize**(`dataType`, `value`, `macroMapper`): `unknown`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `unknown`[] |
| `macroMapper` | [`AttributeMapper`](../interfaces/AttributeMapper) |

#### Returns

`unknown`[]

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[deserialize](../interfaces/MicroAttributeMapper#deserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/array-mapper.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/array-mapper.service.ts#L15)

___

### serialize

▸ **serialize**(`dataType`, `value`, `macroMapper`): `unknown`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `unknown`[] |
| `macroMapper` | [`AttributeMapper`](../interfaces/AttributeMapper) |

#### Returns

`unknown`[]

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[serialize](../interfaces/MicroAttributeMapper#serialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/array-mapper.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/array-mapper.service.ts#L23)

___

### supportDeserialize

▸ **supportDeserialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `unknown`[] |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportDeserialize](../interfaces/MicroAttributeMapper#supportdeserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/array-mapper.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/array-mapper.service.ts#L11)

___

### supportSerialize

▸ **supportSerialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `unknown`[] |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportSerialize](../interfaces/MicroAttributeMapper#supportserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/array-mapper.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/array-mapper.service.ts#L19)
