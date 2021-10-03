---
id: "modules"
title: "@cognizone/ng-yasgui"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [NgYasguiModule](classes/NgYasguiModule)
- [YasguiComponent](classes/YasguiComponent)
- [YasguiService](classes/YasguiService)

## Interfaces

- [CurrentYasgui](interfaces/CurrentYasgui)
- [YASGUI](interfaces/YASGUI)
- [Yasgui](interfaces/Yasgui)
- [Yasqe](interfaces/Yasqe)

## Type aliases

### YasguiOptions

Ƭ **YasguiOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `allowYasqeResize?` | `boolean` |
| `api?` | `Object` |
| `api.collections?` | `string` |
| `api.corsProxy?` | `string` |
| `api.urlShortener?` | `string` |
| `catalogueEndpoints?` | `string`[] \| (`instance`: [`Yasgui`](interfaces/Yasgui), `cb`: `Function`) => `void` |
| `endpoint?` | `string` |
| `tracker?` | `Object` |
| `tracker.askConsent?` | `boolean` |
| `tracker.googleAnalyticsId?` | `string` |
| `yasqe?` | [`YasqeOptions`](modules#yasqeoptions) |
| `persistencyPrefix?` | (...`args`: `any`[]) => `string` |

#### Defined in

[lib/models/yasgui.ts:21](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-yasgui/src/lib/models/yasgui.ts#L21)

___

### YasqeOptions

Ƭ **YasqeOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `sparql?` | `Object` |
| `sparql.endpoint?` | `string` |

#### Defined in

[lib/models/yasgui.ts:35](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/ng-yasgui/src/lib/models/yasgui.ts#L35)
