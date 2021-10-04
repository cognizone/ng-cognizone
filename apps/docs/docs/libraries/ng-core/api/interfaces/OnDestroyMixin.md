---
id: "OnDestroyMixin"
title: "Interface: OnDestroyMixin"
sidebar_label: "OnDestroyMixin"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `OnDestroy`

  ↳ **`OnDestroyMixin`**

## Constructors

### constructor

• **constructor**: `Object`

#### Inherited from

OnDestroy.constructor

## Properties

### onDestroy$

• **onDestroy$**: `Observable`<`void`\>

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L9)

___

### subSink

• **subSink**: `Subscription`

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L10)

## Methods

### emptySink

▸ **emptySink**(): `void`

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L13)

___

### firstUntilDestroyed

▸ **firstUntilDestroyed**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L12)

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

#### Returns

`void`

#### Inherited from

OnDestroy.ngOnDestroy

#### Defined in

node_modules/@angular/core/core.d.ts:5167

___

### untilDestroyed

▸ **untilDestroyed**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L11)
