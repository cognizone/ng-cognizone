---
id: "highlight.HighlightPipe"
title: "Class: HighlightPipe"
sidebar_label: "HighlightPipe"
custom_edit_url: null
---

[highlight](../modules/highlight).HighlightPipe

## Implements

- `PipeTransform`

## Constructors

### constructor

• **new HighlightPipe**(`highlightMatch`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `highlightMatch` | `HighlightMatch` |

#### Defined in

[libs/legi-shared/highlight/highlight.pipe.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/highlight/highlight.pipe.ts#L11)

## Methods

### transform

▸ **transform**(`value`, `query`, `highlightedClass?`): `Nil`<`SafeHtml`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `Nil`<`string`\> | `undefined` |
| `query` | `Nil`<`string`\> | `undefined` |
| `highlightedClass` | `string` | `'is-highlighted'` |

#### Returns

`Nil`<`SafeHtml`\>

#### Implementation of

PipeTransform.transform

#### Defined in

[libs/legi-shared/highlight/highlight.pipe.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/highlight/highlight.pipe.ts#L13)
