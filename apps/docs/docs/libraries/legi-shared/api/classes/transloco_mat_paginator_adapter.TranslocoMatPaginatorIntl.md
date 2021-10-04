---
id: "transloco_mat_paginator_adapter.TranslocoMatPaginatorIntl"
title: "Class: TranslocoMatPaginatorIntl"
sidebar_label: "TranslocoMatPaginatorIntl"
custom_edit_url: null
---

[transloco-mat-paginator-adapter](../modules/transloco_mat_paginator_adapter).TranslocoMatPaginatorIntl

## Hierarchy

- `MatPaginatorIntl`

  ↳ **`TranslocoMatPaginatorIntl`**

## Constructors

### constructor

• **new TranslocoMatPaginatorIntl**(`i18nService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `i18nService` | `I18nService` |

#### Overrides

MatPaginatorIntl.constructor

#### Defined in

[libs/legi-shared/transloco-mat-paginator-adapter/transloco-mat-paginator-intl.service.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/transloco-mat-paginator-adapter/transloco-mat-paginator-intl.service.ts#L7)

## Properties

### changes

• `Readonly` **changes**: `Subject`<`void`\>

Stream to emit from when labels are changed. Use this to notify components when the labels have
changed after initialization.

#### Inherited from

MatPaginatorIntl.changes

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:20

___

### firstPageLabel

• **firstPageLabel**: `string`

A label for the button that moves to the first page.

#### Inherited from

MatPaginatorIntl.firstPageLabel

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:28

___

### getRangeLabel

• **getRangeLabel**: (`page`: `number`, `pageSize`: `number`, `length`: `number`) => `string`

#### Type declaration

▸ (`page`, `pageSize`, `length`): `string`

A label for the range of items within the current page and the length of the whole list.

##### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |
| `pageSize` | `number` |
| `length` | `number` |

##### Returns

`string`

#### Overrides

MatPaginatorIntl.getRangeLabel

#### Defined in

[libs/legi-shared/transloco-mat-paginator-adapter/transloco-mat-paginator-intl.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/transloco-mat-paginator-adapter/transloco-mat-paginator-intl.service.ts#L15)

___

### itemsPerPageLabel

• **itemsPerPageLabel**: `string`

A label for the page size selector.

#### Inherited from

MatPaginatorIntl.itemsPerPageLabel

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:22

___

### lastPageLabel

• **lastPageLabel**: `string`

A label for the button that moves to the last page.

#### Inherited from

MatPaginatorIntl.lastPageLabel

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:30

___

### nextPageLabel

• **nextPageLabel**: `string`

A label for the button that increments the current page.

#### Inherited from

MatPaginatorIntl.nextPageLabel

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:24

___

### previousPageLabel

• **previousPageLabel**: `string`

A label for the button that decrements the current page.

#### Inherited from

MatPaginatorIntl.previousPageLabel

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:26

___

### ɵfac

▪ `Static` **ɵfac**: `unknown`

#### Inherited from

MatPaginatorIntl.ɵfac

#### Defined in

node_modules/@angular/material/paginator/paginator-intl.d.ts:33

## Methods

### adaptLabels

▸ `Private` **adaptLabels**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/transloco-mat-paginator-adapter/transloco-mat-paginator-intl.service.ts:29](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-shared/transloco-mat-paginator-adapter/transloco-mat-paginator-intl.service.ts#L29)
