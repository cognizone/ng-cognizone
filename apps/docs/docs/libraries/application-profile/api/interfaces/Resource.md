---
id: "Resource"
title: "Interface: Resource<T>"
sidebar_label: "Resource"
sidebar_position: 0
custom_edit_url: null
---

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object`{} |

## Properties

### attributes

• **attributes**: { [P in string \| number \| symbol]: ResourceAttribute<T[P]\> }

#### Defined in

[lib/models/resource.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource.ts#L16)

___

### references

• **references**: `Object`

#### Index signature

▪ [referenceKey: `string`]: `Many`<`string`\>

#### Defined in

[lib/models/resource.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource.ts#L15)

___

### type

• **type**: `Many`<`string`\>

#### Defined in

[lib/models/resource.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource.ts#L14)

___

### uri

• **uri**: `string`

#### Defined in

[lib/models/resource.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource.ts#L13)
