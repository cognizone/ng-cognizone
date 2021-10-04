---
id: "Logger"
title: "Class: Logger"
sidebar_label: "Logger"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Logger**(`namespace`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L23)

## Properties

### debug

• **debug**: [`LogFunction`](../modules#logfunction)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L11)

___

### error

• **error**: [`LogFunction`](../modules#logfunction)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L19)

___

### info

• **info**: [`LogFunction`](../modules#logfunction)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L15)

___

### log

• **log**: [`LogFunction`](../modules#logfunction)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L13)

___

### logLevel

• **logLevel**: [`LogLevel`](../enums/LogLevel)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L21)

___

### namespace

• **namespace**: `string`

___

### warn

• **warn**: [`LogFunction`](../modules#logfunction)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L17)

## Accessors

### prefix

• `Private` `get` **prefix**(): `string`

#### Returns

`string`

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:38](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L38)

## Methods

### bindToConsoleMethod

▸ `Private` **bindToConsoleMethod**(`logType`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logType` | ``"debug"`` \| ``"error"`` \| ``"info"`` \| ``"log"`` \| ``"warn"`` |

#### Returns

`void`

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:42](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L42)

___

### extend

▸ **extend**(`namespace`): [`Logger`](Logger)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespace` | `string` |

#### Returns

[`Logger`](Logger)

#### Defined in

[libs/ng-core/src/lib/modules/logger/logger.service.ts:31](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-core/src/lib/modules/logger/logger.service.ts#L31)
