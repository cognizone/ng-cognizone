---
id: "CvService"
title: "Class: CvService"
sidebar_label: "CvService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CvService**(`providers`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `providers` | [`CvProvider`](../interfaces/CvProvider)<[`Concept`](../interfaces/Concept)\>[] |

#### Defined in

[libs/legi-cv/src/lib/services/cv.service.ts:12](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/cv.service.ts#L12)

## Methods

### getAllOptions

▸ **getAllOptions**(`cvName`): `Observable`<`SelectOption`<`string`\>[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cvName` | `Many`<`string`\> |

#### Returns

`Observable`<`SelectOption`<`string`\>[]\>

#### Defined in

[libs/legi-cv/src/lib/services/cv.service.ts:27](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/cv.service.ts#L27)

___

### getProvider

▸ **getProvider**(`cvName`): [`CvProvider`](../interfaces/CvProvider)<[`Concept`](../interfaces/Concept)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cvName` | `string` |

#### Returns

[`CvProvider`](../interfaces/CvProvider)<[`Concept`](../interfaces/Concept)\>

#### Defined in

[libs/legi-cv/src/lib/services/cv.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/cv.service.ts#L14)

___

### getProviderAsSelectOptionProvider

▸ **getProviderAsSelectOptionProvider**(`cvName`): `SelectOptionsProvider`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cvName` | `string` |

#### Returns

`SelectOptionsProvider`<`string`\>

#### Defined in

[libs/legi-cv/src/lib/services/cv.service.ts:22](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/legi-cv/src/lib/services/cv.service.ts#L22)
