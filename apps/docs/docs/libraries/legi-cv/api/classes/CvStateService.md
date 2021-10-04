---
id: "CvStateService"
title: "Class: CvStateService"
sidebar_label: "CvStateService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new CvStateService**(`store`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | `Store` |

#### Defined in

[libs/legi-cv/src/lib/services/cv-state.service.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-state.service.ts#L12)

## Methods

### getCv

▸ **getCv**(`cvName`): `Observable`<[`CvDictionary`](../modules#cvdictionary)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cvName` | `string` |

#### Returns

`Observable`<[`CvDictionary`](../modules#cvdictionary)\>

#### Defined in

[libs/legi-cv/src/lib/services/cv-state.service.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-state.service.ts#L18)

___

### setCv

▸ **setCv**(`options`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.cv` | [`Cv`](../modules#cv) |
| `options.cvName` | `string` |
| `options.uri` | `string` |

#### Returns

`void`

#### Defined in

[libs/legi-cv/src/lib/services/cv-state.service.ts:14](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/legi-cv/src/lib/services/cv-state.service.ts#L14)
