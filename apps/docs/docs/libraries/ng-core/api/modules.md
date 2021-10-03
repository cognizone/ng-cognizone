---
id: "modules"
title: "@cognizone/ng-core"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [LogLevel](enums/LogLevel)

## Classes

- [ControlComponent](classes/ControlComponent)
- [DisabledControl](classes/DisabledControl)
- [LoadingService](classes/LoadingService)
- [Logger](classes/Logger)
- [LoggerModule](classes/LoggerModule)
- [OnDestroy$](classes/OnDestroy_)

## Interfaces

- [OnDestroyMixin](interfaces/OnDestroyMixin)

## Type aliases

### LogFunction

Ƭ **LogFunction**: (...`args`: `unknown`[]) => `void`

#### Type declaration

▸ (...`args`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `unknown`[] |

##### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:6](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/modules/logger/logger.service.ts#L6)

___

### Maybe

Ƭ **Maybe**<`T`\>: `T` \| `undefined`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[libs/ng-core/src/lib/types/maybe.ts:1](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/types/maybe.ts#L1)

## Functions

### OnDestroyMixin

▸ **OnDestroyMixin**<`T`\>(`base`): `T` & `Type`<[`OnDestroyMixin`](modules#ondestroymixin)\>

**`description`** beware that if you use this with a base class that has injection, it will not work in AOT
unless you redefine the constructor in the child class, i.g. :
```
export class MyGreatComponent extends OnDestroyMixin(Autoinjectable) {
    constructor(injector: Injector) {
        super(injector);
    }
}
```

Also if you use this mixin on a parent class of a component that has @Input, those inputs will not be seen in AOT and will throw an error

All those issues should be fixed with Ivy (Angular 9+) https://github.com/angular/angular/issues/19145

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Type`<`any`, `T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `base` | `T` |

#### Returns

`T` & `Type`<[`OnDestroyMixin`](modules#ondestroymixin)\>

#### Defined in

[libs/ng-core/src/lib/mixins/on-destroy.mixin.ts:33](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/mixins/on-destroy.mixin.ts#L33)

___

### isInstanceOf

▸ **isInstanceOf**<`T`, `U`, `V`, `W`\>(`typeA`, `typeB`, `typeC`): `OperatorFunction`<`T`, `U` \| `V` \| `W`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |
| `V` |
| `W` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeA` | `Type`<`U`\> |
| `typeB` | `Type`<`V`\> |
| `typeC` | `Type`<`W`\> |

#### Returns

`OperatorFunction`<`T`, `U` \| `V` \| `W`\>

#### Defined in

[libs/ng-core/src/lib/operators/is-instance-of.ts:5](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/operators/is-instance-of.ts#L5)

▸ **isInstanceOf**<`T`, `U`, `V`\>(`typeA`, `typeB`): `OperatorFunction`<`T`, `U` \| `V`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `typeA` | `Type`<`U`\> |
| `typeB` | `Type`<`V`\> |

#### Returns

`OperatorFunction`<`T`, `U` \| `V`\>

#### Defined in

[libs/ng-core/src/lib/operators/is-instance-of.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/operators/is-instance-of.ts#L10)

▸ **isInstanceOf**<`T`, `U`\>(`type`): `OperatorFunction`<`T`, `U`\>

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `Type`<`U`\> |

#### Returns

`OperatorFunction`<`T`, `U`\>

#### Defined in

[libs/ng-core/src/lib/operators/is-instance-of.ts:11](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/operators/is-instance-of.ts#L11)

___

### startWithTap

▸ **startWithTap**<`T`\>(`callback`): (`source`: `Observable`<`T`\>) => `Observable`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | () => `void` |

#### Returns

`fn`

▸ (`source`): `Observable`<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Observable`<`T`\> |

##### Returns

`Observable`<`T`\>

#### Defined in

[libs/ng-core/src/lib/operators/start-with-tap.ts:4](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-core/src/lib/operators/start-with-tap.ts#L4)
