---
id: "DateTimeMapper"
title: "Class: DateTimeMapper"
sidebar_label: "DateTimeMapper"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`MicroAttributeMapper`](../interfaces/MicroAttributeMapper)<`string`, `Date`\>

## Constructors

### constructor

• **new DateTimeMapper**()

## Methods

### deserialize

▸ **deserialize**(`dataType`, `value`): `Date`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `string` |

#### Returns

`Date`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[deserialize](../interfaces/MicroAttributeMapper#deserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts#L10)

___

### serialize

▸ **serialize**(`dataType`, `value`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `Date` |

#### Returns

`string`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[serialize](../interfaces/MicroAttributeMapper#serialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts#L18)

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

[ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts:6](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts#L6)

___

### supportSerialize

▸ **supportSerialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `Date` |

#### Returns

`boolean`

#### Implementation of

[MicroAttributeMapper](../interfaces/MicroAttributeMapper).[supportSerialize](../interfaces/MicroAttributeMapper#supportserialize)

#### Defined in

[ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-time-mapper.service.ts#L14)
