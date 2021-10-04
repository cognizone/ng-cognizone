---
id: "Pagination"
title: "Interface: Pagination"
sidebar_label: "Pagination"
sidebar_position: 0
custom_edit_url: null
---

Generic pagination type, it originates from elastic query, but it's better
to use this interface everywhere we have pagination, to not mix it up with
other kind of pagination, based on page number for example.

## Properties

### from

• **from**: `number`

absolute index of the first item of the page

#### Defined in

[lib/models/pagination.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/pagination.ts#L10)

___

### size

• **size**: `number`

Size of the page

#### Defined in

[lib/models/pagination.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/pagination.ts#L14)
