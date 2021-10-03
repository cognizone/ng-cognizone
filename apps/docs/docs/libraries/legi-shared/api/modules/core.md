---
id: "core"
title: "Module: core"
sidebar_label: "core"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [LegiSharedModule](../classes/core.LegiSharedModule)
- [LegiSharedModuleRoot](../classes/core.LegiSharedModuleRoot)

## Interfaces

- [LegiSharedOptions](../interfaces/core.LegiSharedOptions)

## Variables

### DEFAULT\_LEGI\_SHARED\_OPTIONS

• **DEFAULT\_LEGI\_SHARED\_OPTIONS**: [`LegiSharedOptions`](../interfaces/core.LegiSharedOptions)

#### Defined in

[libs/legi-shared/core/models/legi-shared-options.ts:10](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/core/models/legi-shared-options.ts#L10)

___

### LEGI\_SHARED\_OPTIONS\_TOKEN

• **LEGI\_SHARED\_OPTIONS\_TOKEN**: `InjectionToken`<[`LegiSharedOptions`](../interfaces/core.LegiSharedOptions)\>

#### Defined in

[libs/legi-shared/core/models/legi-shared-options.ts:3](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/core/models/legi-shared-options.ts#L3)

## Functions

### dateLocaleHandlerFactory

▸ **dateLocaleHandlerFactory**(`i18nService`, `adapter`, `options`): `Function`

#### Parameters

| Name | Type |
| :------ | :------ |
| `i18nService` | `I18nService` |
| `adapter` | `DateAdapter`<`unknown`\> |
| `options` | [`LegiSharedOptions`](../interfaces/core.LegiSharedOptions) |

#### Returns

`Function`

#### Defined in

[libs/legi-shared/core/legi-shared.module.ts:36](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-shared/core/legi-shared.module.ts#L36)
