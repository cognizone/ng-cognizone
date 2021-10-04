---
id: "YasguiComponent"
title: "Class: YasguiComponent"
sidebar_label: "YasguiComponent"
sidebar_position: 0
custom_edit_url: null
---

## Implements

- `OnInit`
- `OnChanges`
- `OnDestroy`

## Constructors

### constructor

• **new YasguiComponent**(`yasguiService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `yasguiService` | [`YasguiService`](YasguiService) |

#### Defined in

[lib/components/yasgui/yasgui.component.ts:30](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L30)

## Properties

### multiple

• `Optional` **multiple**: `boolean`

#### Defined in

[lib/components/yasgui/yasgui.component.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L17)

___

### options

• `Optional` **options**: [`YasguiOptions`](../modules#yasguioptions)

#### Defined in

[lib/components/yasgui/yasgui.component.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L14)

___

### query

• `Optional` **query**: `string`

#### Defined in

[lib/components/yasgui/yasgui.component.ts:20](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L20)

___

### queryChange

• **queryChange**: `EventEmitter`<`string`\>

#### Defined in

[lib/components/yasgui/yasgui.component.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L26)

___

### yasgui

• `Private` **yasgui**: [`Yasgui`](../interfaces/Yasgui)

#### Defined in

[lib/components/yasgui/yasgui.component.ts:28](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L28)

___

### yasguiRef

• **yasguiRef**: `ElementRef`<`any`\>

#### Defined in

[lib/components/yasgui/yasgui.component.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L23)

## Methods

### createYasgui

▸ `Private` **createYasgui**(): `Promise`<[`Yasgui`](../interfaces/Yasgui)\>

#### Returns

`Promise`<[`Yasgui`](../interfaces/Yasgui)\>

#### Defined in

[lib/components/yasgui/yasgui.component.ts:63](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L63)

___

### loadQuery

▸ `Private` **loadQuery**(): `void`

#### Returns

`void`

#### Defined in

[lib/components/yasgui/yasgui.component.ts:54](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L54)

___

### ngOnChanges

▸ **ngOnChanges**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `SimpleChanges` |

#### Returns

`void`

#### Implementation of

OnChanges.ngOnChanges

#### Defined in

[lib/components/yasgui/yasgui.component.ts:47](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L47)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[lib/components/yasgui/yasgui.component.ts:43](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L43)

___

### ngOnInit

▸ **ngOnInit**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Implementation of

OnInit.ngOnInit

#### Defined in

[lib/components/yasgui/yasgui.component.ts:32](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-yasgui/src/lib/components/yasgui/yasgui.component.ts#L32)
