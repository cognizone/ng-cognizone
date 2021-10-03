---
id: "loading_button.LoadingButtonDirective"
title: "Class: LoadingButtonDirective"
sidebar_label: "LoadingButtonDirective"
custom_edit_url: null
---

[loading-button](../modules/loading_button).LoadingButtonDirective

## Implements

- `OnInit`
- `OnChanges`
- `OnDestroy`

## Constructors

### constructor

• **new LoadingButtonDirective**(`elRef`, `componentFactoryResolver`, `injector`, `config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `elRef` | `ElementRef`<`HTMLElement`\> |
| `componentFactoryResolver` | `ComponentFactoryResolver` |
| `injector` | `Injector` |
| `config` | [`LegiSharedOptions`](../interfaces/core.LegiSharedOptions) |

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:28](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L28)

## Properties

### loading

• **loading**: `boolean` = `false`

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:22](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L22)

___

### loadingOnce

• `Private` **loadingOnce**: `boolean` = `false`

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:25](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L25)

___

### spinner

• `Private` `Optional` **spinner**: `ComponentRef`<`MatSpinner`\>

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:26](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L26)

___

### spinnerDiv

• `Private` `Optional` **spinnerDiv**: `HTMLElement`

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:24](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L24)

## Methods

### getSpinnerDiv

▸ `Private` **getSpinnerDiv**(): `HTMLElement`

#### Returns

`HTMLElement`

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:65](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L65)

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

[libs/legi-shared/loading-button/loading-button.directive.ts:39](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L39)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Implementation of

OnDestroy.ngOnDestroy

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:45](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L45)

___

### ngOnInit

▸ **ngOnInit**(): `void`

#### Returns

`void`

#### Implementation of

OnInit.ngOnInit

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:35](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L35)

___

### toggleLoading

▸ `Private` **toggleLoading**(): `void`

#### Returns

`void`

#### Defined in

[libs/legi-shared/loading-button/loading-button.directive.ts:49](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/loading-button/loading-button.directive.ts#L49)
