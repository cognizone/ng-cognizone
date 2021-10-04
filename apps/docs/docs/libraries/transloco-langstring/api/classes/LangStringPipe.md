---
id: "LangStringPipe"
title: "Class: LangStringPipe"
sidebar_label: "LangStringPipe"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `PipeTransform`

## Constructors

### constructor

• **new LangStringPipe**(`transloco`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `transloco` | `TranslocoService` |

#### Defined in

[lib/pipes/lang-string.pipe.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/transloco-langstring/src/lib/pipes/lang-string.pipe.ts#L9)

## Methods

### getOtherLangs

▸ `Private` **getOtherLangs**(): `string`[]

#### Returns

`string`[]

#### Defined in

[lib/pipes/lang-string.pipe.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/transloco-langstring/src/lib/pipes/lang-string.pipe.ts#L20)

___

### toShortLang

▸ `Private` **toShortLang**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[lib/pipes/lang-string.pipe.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/transloco-langstring/src/lib/pipes/lang-string.pipe.ts#L16)

___

### transform

▸ **transform**(`value`, `lang?`): `Nil`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Nil`<`string` \| `LangString` \| `LangStringSimple`\> |
| `lang` | `string` |

#### Returns

`Nil`<`string`\>

#### Implementation of

PipeTransform.transform

#### Defined in

[lib/pipes/lang-string.pipe.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/transloco-langstring/src/lib/pipes/lang-string.pipe.ts#L11)
