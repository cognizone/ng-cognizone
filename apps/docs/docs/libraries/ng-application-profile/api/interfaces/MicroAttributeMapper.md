---
id: "MicroAttributeMapper"
title: "Interface: MicroAttributeMapper<RAW, MODEL>"
sidebar_label: "MicroAttributeMapper"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name |
| :------ |
| `RAW` |
| `MODEL` |

## Implemented by

- [`ArrayMapper`](../classes/ArrayMapper)
- [`BooleanMapper`](../classes/BooleanMapper)
- [`DateMapper`](../classes/DateMapper)
- [`DateTimeMapper`](../classes/DateTimeMapper)
- [`DefaultMapper`](../classes/DefaultMapper)

## Properties

### priority

• `Optional` **priority**: `number`

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:6](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L6)

## Methods

### deserialize

▸ **deserialize**(`dataType`, `value`, `macroMapper`): `MODEL`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `RAW` |
| `macroMapper` | [`AttributeMapper`](AttributeMapper) |

#### Returns

`MODEL`

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:8](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L8)

___

### serialize

▸ **serialize**(`dataType`, `value`, `macroMapper`): `RAW`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `MODEL` |
| `macroMapper` | [`AttributeMapper`](AttributeMapper) |

#### Returns

`RAW`

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L10)

___

### supportDeserialize

▸ **supportDeserialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `RAW` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:7](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L7)

___

### supportSerialize

▸ **supportSerialize**(`dataType`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataType` | `string` |
| `value` | `MODEL` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L9)
