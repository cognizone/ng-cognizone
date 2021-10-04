---
id: "modules"
title: "@cognizone/ng-application-profile"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [Datatype](enums/Datatype)
- [DatatypeLong](enums/DatatypeLong)

## Classes

- [ApFormBuilder](classes/ApFormBuilder)
- [ApHelper](classes/ApHelper)
- [ApService](classes/ApService)
- [ArrayMapper](classes/ArrayMapper)
- [BooleanMapper](classes/BooleanMapper)
- [CardinalityValidatorService](classes/CardinalityValidatorService)
- [DateMapper](classes/DateMapper)
- [DateTimeMapper](classes/DateTimeMapper)
- [DefaultMapper](classes/DefaultMapper)
- [IdGenerator](classes/IdGenerator)
- [JsonModelService](classes/JsonModelService)
- [MicroAsyncValidatorBuilder](classes/MicroAsyncValidatorBuilder)
- [MicroValidatorBuilder](classes/MicroValidatorBuilder)
- [NgApplicationProfileModule](classes/NgApplicationProfileModule)
- [PrefixCcService](classes/PrefixCcService)
- [ResourceGraphService](classes/ResourceGraphService)
- [ResourceMapper](classes/ResourceMapper)

## Interfaces

- [ApLoader](interfaces/ApLoader)
- [ApplicationProfileRaw](interfaces/ApplicationProfileRaw)
- [AttributeMapper](interfaces/AttributeMapper)
- [AttributeProfileRaw](interfaces/AttributeProfileRaw)
- [JsonModel](interfaces/JsonModel)
- [JsonModelFlatGraph](interfaces/JsonModelFlatGraph)
- [JsonModels](interfaces/JsonModels)
- [MicroAttributeMapper](interfaces/MicroAttributeMapper)
- [Prefixes](interfaces/Prefixes)
- [Resource](interfaces/Resource)
- [ResourceAttribute](interfaces/ResourceAttribute)
- [ResourceGraph](interfaces/ResourceGraph)
- [ResourceRaw](interfaces/ResourceRaw)
- [TypeProfileRaw](interfaces/TypeProfileRaw)

## Type aliases

### ApplicationProfile

Ƭ **ApplicationProfile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `types` | `Object` |
| `uri` | `string` |

#### Defined in

[application-profile/src/lib/models/application-profile.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L5)

___

### ApplicationProfileOrApName

Ƭ **ApplicationProfileOrApName**: [`ApplicationProfile`](modules#applicationprofile) \| `string`

#### Defined in

[application-profile/src/lib/models/application-profile.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L3)

___

### AttributeProfile

Ƭ **AttributeProfile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributeId` | `string` |
| `rules` | [`Rule`](modules#rule)[] |
| `uri` | `string` |

#### Defined in

[application-profile/src/lib/models/application-profile.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L16)

___

### ClassIdRule

Ƭ **ClassIdRule**: [`Rule`](modules#rule)<``"classId"``, `string`\>

#### Defined in

[application-profile/src/lib/models/rule.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L4)

___

### DataTypeRule

Ƭ **DataTypeRule**: [`Rule`](modules#rule)<``"datatype"``, `string`\>

#### Defined in

[application-profile/src/lib/models/rule.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L3)

___

### JsonModelFlat

Ƭ **JsonModelFlat**<`T`\>: { [key in keyof T]: T[key] extends JsonModel ? string : T[key] extends JsonModel \| undefined ? string \| undefined : T[key] extends JsonModel[] ? string[] : T[key] extends JsonModel[] \| undefined ? string[] \| undefined : T[key] }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | [`JsonModel`](interfaces/JsonModel) |

#### Defined in

[ng-application-profile/src/lib/models/json-model.ts:29](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L29)

___

### JsonModelType

Ƭ **JsonModelType**<`T`\>: `T` extends `string` ? `Many`<`string`\> \| `T` \| [`T`, ...string[]] : `Many`<`string`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Many`<`string`\>`string` |

#### Defined in

[ng-application-profile/src/lib/models/json-model.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L19)

___

### MaxCardinalityRule

Ƭ **MaxCardinalityRule**: [`Rule`](modules#rule)<``"maxCardinality"``, `number`\>

#### Defined in

[application-profile/src/lib/models/rule.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L10)

___

### MinCardinalityRule

Ƭ **MinCardinalityRule**: [`Rule`](modules#rule)<``"minCardinality"``, `number`\>

#### Defined in

[application-profile/src/lib/models/rule.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L9)

___

### OrClassIdRule

Ƭ **OrClassIdRule**: [`OrRule`](modules#orrule)<[`ClassIdRule`](modules#classidrule)\>

#### Defined in

[application-profile/src/lib/models/rule.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L6)

___

### OrDataTypeRule

Ƭ **OrDataTypeRule**: [`OrRule`](modules#orrule)<[`DataTypeRule`](modules#datatyperule)\>

#### Defined in

[application-profile/src/lib/models/rule.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L7)

___

### OrRule

Ƭ **OrRule**<`T`\>: [`Rule`](modules#rule)<``"or"``, `T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Rule`](modules#rule) |

#### Defined in

[application-profile/src/lib/models/rule.ts:2](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L2)

___

### RangeRule

Ƭ **RangeRule**: [`Rule`](modules#rule)<``"range"``, [`ClassIdRule`](modules#classidrule) \| [`DataTypeRule`](modules#datatyperule) \| [`OrClassIdRule`](modules#orclassidrule) \| [`OrDataTypeRule`](modules#ordatatyperule)\>

#### Defined in

[application-profile/src/lib/models/rule.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L8)

___

### RdfTypesRule

Ƭ **RdfTypesRule**: [`Rule`](modules#rule)<``"rdfTypes"``, `string`[]\>

#### Defined in

[application-profile/src/lib/models/rule.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L11)

___

### ResourceAttributeRaw

Ƭ **ResourceAttributeRaw**: `Object`

#### Index signature

▪ [dataType: `string`]: `Many`<`unknown`\>

#### Defined in

[application-profile/src/lib/models/resource.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource.ts#L10)

___

### ResourceGraphRaw

Ƭ **ResourceGraphRaw**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | [`ResourceRaw`](interfaces/ResourceRaw) |
| `facets?` | `Object` |
| `included?` | [`ResourceRaw`](interfaces/ResourceRaw)[] |

#### Defined in

[application-profile/src/lib/models/resource-graph.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource-graph.ts#L9)

___

### Rule

Ƭ **Rule**<`T`, `U`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string``string` |
| `U` | `unknown` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `name` | `T` |
| `value` | `U` |

#### Defined in

[application-profile/src/lib/models/rule.ts:1](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L1)

___

### SubClassOfRule

Ƭ **SubClassOfRule**: [`Rule`](modules#rule)<``"subClassOf"``, `string`\>

#### Defined in

[application-profile/src/lib/models/rule.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L5)

___

### TypeProfile

Ƭ **TypeProfile**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `attributes` | `Object` |
| `classIds` | `string`[] |
| `rules` | [`Rule`](modules#rule)[] |

#### Defined in

[application-profile/src/lib/models/application-profile.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L10)

___

### Uri

Ƭ **Uri**<`T`\>: `string` & { `@@meta_type_placeholder@@?`: `T`  }

**`experimental`**

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`JsonModel`](interfaces/JsonModel) |

#### Defined in

[ng-application-profile/src/lib/models/json-model.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L7)

## Variables

### AP\_LOADER\_TOKEN

• **AP\_LOADER\_TOKEN**: `InjectionToken`<[`ApLoader`](interfaces/ApLoader)[]\>

#### Defined in

[ng-application-profile/src/lib/services/ap-loader.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-loader.ts#L11)

___

### EMPTY\_APPLICATION\_PROFILE

• **EMPTY\_APPLICATION\_PROFILE**: [`ApplicationProfile`](modules#applicationprofile)

#### Defined in

[application-profile/src/lib/models/application-profile.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L22)

___

### KNOWN\_PREFIXES

• **KNOWN\_PREFIXES**: [`Prefixes`](interfaces/Prefixes)

#### Defined in

[application-profile/src/lib/models/prefixes.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/prefixes.ts#L5)

___

### MICRO\_ATTRIBUTE\_MAPPER\_TOKEN

• **MICRO\_ATTRIBUTE\_MAPPER\_TOKEN**: `InjectionToken`<[`MicroAttributeMapper`](interfaces/MicroAttributeMapper)<`unknown`, `unknown`\>\>

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L3)

## Functions

### createMicroValidatorProvider

▸ **createMicroValidatorProvider**(`service`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `Type`<[`MicroValidatorBuilder`](classes/MicroValidatorBuilder)\> |

#### Returns

`Provider`

#### Defined in

[ng-application-profile/src/lib/services/ap-form-builder.service.ts:86](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-form-builder.service.ts#L86)

___

### getConcreteType

▸ **getConcreteType**(`ap`, `classIds`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfile`](modules#applicationprofile) |
| `classIds` | `Many`<`string`\> |

#### Returns

`string`

#### Defined in

[application-profile/src/lib/utils/get-concrete-type.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/utils/get-concrete-type.ts#L6)

___

### getConcreteTypeFromRdfTypesRule

▸ **getConcreteTypeFromRdfTypesRule**(`ap`, `classIds`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfile`](modules#applicationprofile) |
| `classIds` | `string`[] |

#### Returns

`string`

#### Defined in

[application-profile/src/lib/utils/get-concrete-type.ts:30](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/utils/get-concrete-type.ts#L30)

___

### getConcreteTypeFromSubClassOfRules

▸ **getConcreteTypeFromSubClassOfRules**(`ap`, `classIds`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `ap` | [`ApplicationProfile`](modules#applicationprofile) |
| `classIds` | `string`[] |

#### Returns

`string`

#### Defined in

[application-profile/src/lib/utils/get-concrete-type.ts:48](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/utils/get-concrete-type.ts#L48)

___

### getUri

▸ **getUri**(`o`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `string` \| [`JsonModel`](interfaces/JsonModel) \| [`JsonModelFlat`](modules#jsonmodelflat)<[`JsonModel`](interfaces/JsonModel)\> |

#### Returns

`string`

#### Defined in

[ng-application-profile/src/lib/utils/get-uri.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/get-uri.ts#L3)

___

### isClassIdRule

▸ **isClassIdRule**(`o`): o is ClassIdRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is ClassIdRule

#### Defined in

[application-profile/src/lib/models/rule.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L22)

___

### isDataTypeRule

▸ **isDataTypeRule**(`o`): o is DataTypeRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is DataTypeRule

#### Defined in

[application-profile/src/lib/models/rule.ts:42](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L42)

___

### isJsonModel

▸ **isJsonModel**(`o`): o is JsonModel

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is JsonModel

#### Defined in

[ng-application-profile/src/lib/models/json-model.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/models/json-model.ts#L21)

___

### isJsonModelFlatOfType

▸ **isJsonModelFlatOfType**<`T`\>(`model`, `type`): model is JsonModelFlat<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `unknown` |
| `type` | `string` |

#### Returns

model is JsonModelFlat<T\>

#### Defined in

[ng-application-profile/src/lib/utils/is-of-type.ts:15](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/is-of-type.ts#L15)

___

### isJsonModelFlatOfTypeCurr

▸ **isJsonModelFlatOfTypeCurr**<`T`\>(`type`): (`model`: `unknown`) => model is JsonModelFlat<T\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`fn`

▸ (`model`): model is JsonModelFlat<T\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `model` | `unknown` |

##### Returns

model is JsonModelFlat<T\>

#### Defined in

[ng-application-profile/src/lib/utils/is-of-type.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/is-of-type.ts#L19)

___

### isJsonModelOfType

▸ **isJsonModelOfType**<`T`\>(`model`, `type`): model is T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`JsonModel`](interfaces/JsonModel) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`JsonModel`](interfaces/JsonModel) |
| `type` | `string` |

#### Returns

model is T

#### Defined in

[ng-application-profile/src/lib/utils/is-of-type.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/is-of-type.ts#L11)

___

### isMaxCardinalityRule

▸ **isMaxCardinalityRule**(`o`): o is MaxCardinalityRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is MaxCardinalityRule

#### Defined in

[application-profile/src/lib/models/rule.ts:34](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L34)

___

### isMinCardinalityRule

▸ **isMinCardinalityRule**(`o`): o is MinCardinalityRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is MinCardinalityRule

#### Defined in

[application-profile/src/lib/models/rule.ts:38](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L38)

___

### isOfType

▸ **isOfType**(`model`, `type`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`JsonModel`](interfaces/JsonModel) \| `Many`<`string`\> |
| `type` | `string` |

#### Returns

`boolean`

#### Defined in

[ng-application-profile/src/lib/utils/is-of-type.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/is-of-type.ts#L5)

___

### isOrClassIdRule

▸ **isOrClassIdRule**(`o`): o is OrClassIdRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is OrClassIdRule

#### Defined in

[application-profile/src/lib/models/rule.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L26)

___

### isOrDataTypeRule

▸ **isOrDataTypeRule**(`o`): o is OrClassIdRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is OrClassIdRule

#### Defined in

[application-profile/src/lib/models/rule.ts:30](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L30)

___

### isOrRule

▸ **isOrRule**(`o`): o is OrRule<Rule<string, unknown\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is OrRule<Rule<string, unknown\>\>

#### Defined in

[application-profile/src/lib/models/rule.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L18)

___

### isRangeRule

▸ **isRangeRule**(`o`): o is RangeRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is RangeRule

#### Defined in

[application-profile/src/lib/models/rule.ts:46](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L46)

___

### isRdfTypesRule

▸ **isRdfTypesRule**(`o`): o is RdfTypesRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is RdfTypesRule

#### Defined in

[application-profile/src/lib/models/rule.ts:50](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L50)

___

### isRule

▸ **isRule**(`o`): o is Rule<string, unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is Rule<string, unknown\>

#### Defined in

[application-profile/src/lib/models/rule.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L13)

___

### isSubClassOfRule

▸ **isSubClassOfRule**(`o`): o is SubClassOfRule

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `unknown` |

#### Returns

o is SubClassOfRule

#### Defined in

[application-profile/src/lib/models/rule.ts:54](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L54)

___

### keys

▸ **keys**<`T`\>(`obj`): keyof `T`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |

#### Returns

keyof `T`[]

#### Defined in

[ng-application-profile/src/lib/utils/keys.ts:1](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/keys.ts#L1)

___

### provideApLoader

▸ **provideApLoader**(`clazz`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `clazz` | `Type`<[`ApLoader`](interfaces/ApLoader)\> |

#### Returns

`Provider`

#### Defined in

[ng-application-profile/src/lib/services/ap-loader.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/ap-loader.ts#L13)

___

### provideMicroAttributeMapper

▸ **provideMicroAttributeMapper**(`service`): `Provider`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | `Type`<[`MicroAttributeMapper`](interfaces/MicroAttributeMapper)<`unknown`, `unknown`\>\> |

#### Returns

`Provider`

#### Defined in

[ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/services/mappers/micro-attribute-mapper.ts#L18)

___

### stringKeys

▸ **stringKeys**<`T`\>(`obj`): `StringKeys`<`T`\>[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |

#### Returns

`StringKeys`<`T`\>[]

#### Defined in

[ng-application-profile/src/lib/utils/keys.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/ng-application-profile/src/lib/utils/keys.ts#L5)
