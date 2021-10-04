---
id: "I18nTranslocoService"
title: "Class: I18nTranslocoService"
sidebar_label: "I18nTranslocoService"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `I18nService`

  ↳ **`I18nTranslocoService`**

## Constructors

### constructor

• **new I18nTranslocoService**(`transloco`, `translocoLocaleService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transloco` | `TranslocoService` |
| `translocoLocaleService` | `TranslocoLocaleService` |

#### Overrides

I18nService.constructor

#### Defined in

[lib/services/i18n-transloco.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L11)

## Methods

### czLabelToString

▸ **czLabelToString**(`value`, `lang?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `CzLabel` |
| `lang` | `string` |

#### Returns

`string`

#### Overrides

I18nService.czLabelToString

#### Defined in

[lib/services/i18n-transloco.service.ts:49](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L49)

___

### getActiveLang

▸ **getActiveLang**(): `string`

#### Returns

`string`

#### Overrides

I18nService.getActiveLang

#### Defined in

[lib/services/i18n-transloco.service.ts:38](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L38)

___

### getActiveLocale

▸ **getActiveLocale**(): `string`

#### Returns

`string`

#### Overrides

I18nService.getActiveLocale

#### Defined in

[lib/services/i18n-transloco.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L19)

___

### getActiveSimpleLang

▸ **getActiveSimpleLang**(): `string`

#### Returns

`string`

#### Overrides

I18nService.getActiveSimpleLang

#### Defined in

[lib/services/i18n-transloco.service.ts:27](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L27)

___

### getAvailableLangs

▸ **getAvailableLangs**(): `string`[]

#### Returns

`string`[]

#### Overrides

I18nService.getAvailableLangs

#### Defined in

[lib/services/i18n-transloco.service.ts:59](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L59)

___

### getAvailableSimpleLangs

▸ **getAvailableSimpleLangs**(): `string`[]

#### Returns

`string`[]

#### Overrides

I18nService.getAvailableSimpleLangs

#### Defined in

[lib/services/i18n-transloco.service.ts:65](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L65)

___

### selectActiveLang

▸ **selectActiveLang**(): `Observable`<`string`\>

#### Returns

`Observable`<`string`\>

#### Overrides

I18nService.selectActiveLang

#### Defined in

[lib/services/i18n-transloco.service.ts:31](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L31)

___

### selectActiveLocale

▸ **selectActiveLocale**(): `Observable`<`string`\>

#### Returns

`Observable`<`string`\>

#### Overrides

I18nService.selectActiveLocale

#### Defined in

[lib/services/i18n-transloco.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L15)

___

### selectActiveSimpleLang

▸ **selectActiveSimpleLang**(): `Observable`<`string`\>

#### Returns

`Observable`<`string`\>

#### Overrides

I18nService.selectActiveSimpleLang

#### Defined in

[lib/services/i18n-transloco.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L23)

___

### selectTranslate

▸ **selectTranslate**<`T`\>(`key`, `params?`, `lang?`): `Observable`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `CzLabel` |
| `params?` | `Object` |
| `lang?` | `string` |

#### Returns

`Observable`<`T`\>

#### Overrides

I18nService.selectTranslate

#### Defined in

[lib/services/i18n-transloco.service.ts:53](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L53)

___

### toSimpleLang

▸ `Private` **toSimpleLang**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[lib/services/i18n-transloco.service.ts:69](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L69)

___

### translate

▸ **translate**<`T`\>(`value`, `params?`, `lang?`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `CzLabel` |
| `params?` | `Object` |
| `lang?` | `string` |

#### Returns

`T`

#### Overrides

I18nService.translate

#### Defined in

[lib/services/i18n-transloco.service.ts:42](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/i18n-transloco/src/lib/services/i18n-transloco.service.ts#L42)
