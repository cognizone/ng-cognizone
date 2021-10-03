---
id: "DateMapper"
title: "Class: DateMapper"
sidebar_label: "DateMapper"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`MicroAttributeMapper`](../interfaces/MicroAttributeMapper)<`string`, `Date`\>

## Constructors

### constructor

• **new DateMapper**()

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

[ng-application-profile/src/lib/services/mappers/date-mapper.service.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-mapper.service.ts#L10)

___

### pad

▸ `Private` **pad**(`val`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `number` |

#### Returns

`string`

#### Defined in

[ng-application-profile/src/lib/services/mappers/date-mapper.service.ts:25](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-mapper.service.ts#L25)

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

[ng-application-profile/src/lib/services/mappers/date-mapper.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-mapper.service.ts#L18)

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

[ng-application-profile/src/lib/services/mappers/date-mapper.service.ts:6](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-mapper.service.ts#L6)

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

[ng-application-profile/src/lib/services/mappers/date-mapper.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/date-mapper.service.ts#L14)
