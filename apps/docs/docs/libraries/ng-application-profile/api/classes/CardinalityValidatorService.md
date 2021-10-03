---
id: "CardinalityValidatorService"
title: "Class: CardinalityValidatorService"
sidebar_label: "CardinalityValidatorService"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- [`MicroValidatorBuilder`](MicroValidatorBuilder)

  ↳ **`CardinalityValidatorService`**

## Constructors

### constructor

• **new CardinalityValidatorService**()

#### Inherited from

[MicroValidatorBuilder](MicroValidatorBuilder).[constructor](MicroValidatorBuilder#constructor)

## Properties

### MAX\_CARDINALITY\_ERROR\_KEY

▪ `Static` `Readonly` **MAX\_CARDINALITY\_ERROR\_KEY**: `string` = `'minCardinality'`

#### Defined in

[ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts#L13)

___

### MIN\_CARDINALITY\_ERROR\_KEY

▪ `Static` `Readonly` **MIN\_CARDINALITY\_ERROR\_KEY**: `string` = `'minCardinality'`

#### Defined in

[ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts#L11)

## Methods

### createValidator

▸ **createValidator**(`rules`): ``null`` \| `ValidatorFn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rules` | [`Rule`](../modules#rule)<`string`, `unknown`\>[] |

#### Returns

``null`` \| `ValidatorFn`

#### Overrides

[MicroValidatorBuilder](MicroValidatorBuilder).[createValidator](MicroValidatorBuilder#createvalidator)

#### Defined in

[ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts#L15)

___

### getMaxCardinalityValidator

▸ `Private` **getMaxCardinalityValidator**(`max`): `ValidatorFn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `max` | [`MaxCardinalityRule`](../modules#maxcardinalityrule) |

#### Returns

`ValidatorFn`

#### Defined in

[ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts:39](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts#L39)

___

### getMinCardinalityValidator

▸ `Private` **getMinCardinalityValidator**(`min`): `ValidatorFn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | [`MinCardinalityRule`](../modules#mincardinalityrule) |

#### Returns

`ValidatorFn`

#### Defined in

[ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts:28](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/validators/cardinality-validator.service.ts#L28)
