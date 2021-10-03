---
id: "RootUriDirective"
title: "Class: RootUriDirective"
sidebar_label: "RootUriDirective"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new RootUriDirective**(`graphWrapperFactory`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphWrapperFactory` | [`GraphWrapperFactory`](GraphWrapperFactory) |

#### Defined in

[libs/json-model-graph/src/lib/directives/root-uri.directive.ts:18](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/directives/root-uri.directive.ts#L18)

## Properties

### apName

• **apName**: `string`

#### Defined in

[libs/json-model-graph/src/lib/directives/root-uri.directive.ts:16](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/directives/root-uri.directive.ts#L16)

___

### rootUri

• **rootUri**: `string`

#### Defined in

[libs/json-model-graph/src/lib/directives/root-uri.directive.ts:13](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/directives/root-uri.directive.ts#L13)

## Methods

### getNodeWrapper

▸ **getNodeWrapper**<`T`\>(`nodeUri`): [`NodeWrapper`](NodeWrapper)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeUri` | `Uri`<`T`\> |

#### Returns

[`NodeWrapper`](NodeWrapper)<`T`\>

#### Defined in

[libs/json-model-graph/src/lib/directives/root-uri.directive.ts:24](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/directives/root-uri.directive.ts#L24)

___

### getWrapper

▸ **getWrapper**(): [`GraphWrapper`](GraphWrapper)

#### Returns

[`GraphWrapper`](GraphWrapper)

#### Defined in

[libs/json-model-graph/src/lib/directives/root-uri.directive.ts:20](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/directives/root-uri.directive.ts#L20)
