---
id: "MicroValidatorBuilder"
title: "Class: MicroValidatorBuilder"
sidebar_label: "MicroValidatorBuilder"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- **`MicroValidatorBuilder`**

  ↳ [`CardinalityValidatorService`](CardinalityValidatorService)

## Constructors

### constructor

• **new MicroValidatorBuilder**()

## Methods

### createValidator

▸ `Abstract` **createValidator**(`rules`): ``null`` \| `ValidatorFn`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rules` | [`Rule`](../modules#rule)<`string`, `unknown`\>[] |

#### Returns

``null`` \| `ValidatorFn`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L9)
