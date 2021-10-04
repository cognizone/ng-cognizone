---
id: "ApFormBuilder"
title: "Class: ApFormBuilder"
sidebar_label: "ApFormBuilder"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new ApFormBuilder**(`apService`, `fb`, `validatorBuilders`, `asyncValidatorBuilders`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `apService` | [`ApHelper`](ApHelper) |
| `fb` | `FormBuilder` |
| `validatorBuilders` | [`MicroValidatorBuilder`](MicroValidatorBuilder)[] |
| `asyncValidatorBuilders` | [`MicroAsyncValidatorBuilder`](MicroAsyncValidatorBuilder)[] |

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L18)

## Methods

### addValidatorsFromRules

▸ `Private` **addValidatorsFromRules**<`T`\>(`control`, `rules`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `AbstractControl`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `T` |
| `rules` | [`Rule`](../modules#rule)<`string`, `unknown`\>[] |

#### Returns

`T`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:77](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L77)

___

### addValidatorsToControl

▸ **addValidatorsToControl**<`T`\>(`control`, `ap`, `types`, `key?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `AbstractControl`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `T` |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `types` | `Many`<`string`\> |
| `key?` | `string` |

#### Returns

`T`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:28](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L28)

___

### addValidatorsToFormArray

▸ **addValidatorsToFormArray**(`control`, `ap`, `types`, `key`): `FormArray`

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `FormArray` |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `types` | `Many`<`string`\> |
| `key` | `string` |

#### Returns

`FormArray`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:64](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L64)

___

### addValidatorsToFormControl

▸ **addValidatorsToFormControl**(`control`, `ap`, `types`, `key`): `FormControl`

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `FormControl` |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `types` | `Many`<`string`\> |
| `key` | `string` |

#### Returns

`FormControl`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:60](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L60)

___

### addValidatorsToFormGroup

▸ **addValidatorsToFormGroup**(`control`, `ap`, `types`, `key?`): `FormGroup`

#### Parameters

| Name | Type |
| :------ | :------ |
| `control` | `FormGroup` |
| `ap` | [`ApplicationProfile`](../modules#applicationprofile) |
| `types` | `Many`<`string`\> |
| `key?` | `string` |

#### Returns

`FormGroup`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:41](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L41)

___

### generateLangStringFormGroup

▸ **generateLangStringFormGroup**(`langs`): `FormGroup`

#### Parameters

| Name | Type |
| :------ | :------ |
| `langs` | `string`[] |

#### Returns

`FormGroup`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:71](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L71)
