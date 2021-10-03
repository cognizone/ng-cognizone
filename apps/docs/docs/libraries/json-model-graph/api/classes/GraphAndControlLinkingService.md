---
id: "GraphAndControlLinkingService"
title: "Class: GraphAndControlLinkingService"
sidebar_label: "GraphAndControlLinkingService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new GraphAndControlLinkingService**(`graphService`, `cvService`, `jsonModelService`, `fb`, `apHelper`, `apService`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `graphService` | [`GraphService`](GraphService) |
| `cvService` | `CvService` |
| `jsonModelService` | `JsonModelService` |
| `fb` | `FormBuilder` |
| `apHelper` | `ApHelper` |
| `apService` | `ApService` |

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:15](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L15)

## Methods

### addReferencesInGraph

▸ `Private` **addReferencesInGraph**(`value`, `__namedParameters`): `Promise`<`JsonModel`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Many`<`string`\> |
| `__namedParameters` | [`LinkReferenceOptions`](../interfaces/LinkReferenceOptions) |

#### Returns

`Promise`<`JsonModel`[]\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:109](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L109)

___

### getClassId

▸ `Private` **getClassId**(`uri`, `cvNames`): `Promise`<`Many`<`string`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uri` | `string` |
| `cvNames` | `Many`<`string`\> |

#### Returns

`Promise`<`Many`<`string`\>\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:132](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L132)

___

### isReference

▸ `Private` **isReference**(`__namedParameters`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Pick`<[`LinkControlToNodeAttributeOptions`](../interfaces/LinkControlToNodeAttributeOptions)<`JsonModel`\>, ``"apName"`` \| ``"attributeKey"`` \| ``"nodeUri"`` \| ``"rootUri"``\> |

#### Returns

`boolean`

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:97](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L97)

___

### linkControlToNodeAttribute

▸ **linkControlToNodeAttribute**<`T`\>(`__namedParameters`): `Observable`<`unknown`\>

**`description`** at first, the form is updated without emitEvent: false to ensure that local logic in the component is
triggered by the first time the node values are applied

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `JsonModel` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | [`LinkControlToNodeAttributeOptions`](../interfaces/LinkControlToNodeAttributeOptions)<`T`\> |

#### Returns

`Observable`<`unknown`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:29](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L29)

___

### patchValue

▸ `Private` **patchValue**(`value`, `control`, `emitEvent`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `unknown` |
| `control` | `AbstractControl` |
| `emitEvent` | `boolean` |

#### Returns

`void`

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:143](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L143)

___

### updateFormArray

▸ **updateFormArray**<`T`\>(`values$`, `formArray`, `controlBuilder?`): `Observable`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values$` | `Observable`<`T`[]\> |
| `formArray` | `FormArray` |
| `controlBuilder` | (`value`: `T`) => `AbstractControl` |

#### Returns

`Observable`<`void`\>

#### Defined in

[libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts:70](https://github.com/cognizone/ng-cognizone/blob/0401c67/libs/json-model-graph/src/lib/services/graph-and-control-linking.service.ts#L70)
