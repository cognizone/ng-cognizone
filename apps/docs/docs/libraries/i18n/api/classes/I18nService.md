---
id: "I18nService"
title: "Class: I18nService"
sidebar_label: "I18nService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new I18nService**()

## Methods

### czLabelToString

▸ `Abstract` **czLabelToString**(`value`, `lang?`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `CzLabel` |
| `lang?` | `string` |

#### Returns

`string`

the extracted string from value, but not processed for translation!

#### Defined in

[lib/services/i18n.service.ts:51](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L51)

___

### getActiveLang

▸ `Abstract` **getActiveLang**(): `string`

#### Returns

`string`

the currently active lang in the app, in a short ('en') or long
('en-BE') format.

#### Defined in

[lib/services/i18n.service.ts:27](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L27)

___

### getActiveLocale

▸ `Abstract` **getActiveLocale**(): `string`

#### Returns

`string`

the currently active lang in the app, in a short ('en') or long
('en-BE') format.

#### Defined in

[lib/services/i18n.service.ts:38](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L38)

___

### getActiveSimpleLang

▸ `Abstract` **getActiveSimpleLang**(): `string`

#### Returns

`string`

the currently active lang in the app, in a short format (so like
'en', not 'en-BE')

#### Defined in

[lib/services/i18n.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L15)

___

### getAvailableLangs

▸ `Abstract` **getAvailableLangs**(): `string`[]

#### Returns

`string`[]

the list of available langs

#### Defined in

[lib/services/i18n.service.ts:64](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L64)

___

### getAvailableSimpleLangs

▸ `Abstract` **getAvailableSimpleLangs**(): `string`[]

#### Returns

`string`[]

the list of available langs, in short format

#### Defined in

[lib/services/i18n.service.ts:69](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L69)

___

### selectActiveLang

▸ `Abstract` **selectActiveLang**(): `Observable`<`string`\>

#### Returns

`Observable`<`string`\>

the currently active lang in the app, in a short ('en') or long
('en-BE') format, wrapped in an Observable.

#### Defined in

[lib/services/i18n.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L21)

___

### selectActiveLocale

▸ `Abstract` **selectActiveLocale**(): `Observable`<`string`\>

#### Returns

`Observable`<`string`\>

the currently active locale in the app

#### Defined in

[lib/services/i18n.service.ts:32](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L32)

___

### selectActiveSimpleLang

▸ `Abstract` **selectActiveSimpleLang**(): `Observable`<`string`\>

#### Returns

`Observable`<`string`\>

the currently active lang in the app, in a short format (so like
'en', not 'en-BE'), in an Observable

#### Defined in

[lib/services/i18n.service.ts:9](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L9)

___

### selectTranslate

▸ `Abstract` **selectTranslate**<`T`\>(`key`, `params?`, `lang?`): `Observable`<`T`\>

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

the translation associated to the given `key`, using `params` and
in the corresponding `lang`, as an Observable, in case the translation file
is not yet loaded, or if the `lang` changes (if not given)

#### Defined in

[lib/services/i18n.service.ts:59](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L59)

___

### translate

▸ `Abstract` **translate**<`T`\>(`key`, `params?`, `lang?`): `T`

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

`T`

the translation associated to the given `key`, using `params` and
in the corresponding `lang`

#### Defined in

[lib/services/i18n.service.ts:45](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/i18n/src/lib/services/i18n.service.ts#L45)
