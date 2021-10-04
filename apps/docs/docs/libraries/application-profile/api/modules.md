---
id: "modules"
title: "@cognizone/application-profile"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [Datatype](enums/Datatype)
- [DatatypeLong](enums/DatatypeLong)

## Interfaces

- [ApplicationProfileRaw](interfaces/ApplicationProfileRaw)
- [AttributeProfileRaw](interfaces/AttributeProfileRaw)
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

[lib/models/application-profile.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L5)

___

### ApplicationProfileOrApName

Ƭ **ApplicationProfileOrApName**: [`ApplicationProfile`](modules#applicationprofile) \| `string`

#### Defined in

[lib/models/application-profile.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L3)

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

[lib/models/application-profile.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L16)

___

### ClassIdRule

Ƭ **ClassIdRule**: [`Rule`](modules#rule)<``"classId"``, `string`\>

#### Defined in

[lib/models/rule.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L4)

___

### DataTypeRule

Ƭ **DataTypeRule**: [`Rule`](modules#rule)<``"datatype"``, `string`\>

#### Defined in

[lib/models/rule.ts:3](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L3)

___

### MaxCardinalityRule

Ƭ **MaxCardinalityRule**: [`Rule`](modules#rule)<``"maxCardinality"``, `number`\>

#### Defined in

[lib/models/rule.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L10)

___

### MinCardinalityRule

Ƭ **MinCardinalityRule**: [`Rule`](modules#rule)<``"minCardinality"``, `number`\>

#### Defined in

[lib/models/rule.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L9)

___

### OrClassIdRule

Ƭ **OrClassIdRule**: [`OrRule`](modules#orrule)<[`ClassIdRule`](modules#classidrule)\>

#### Defined in

[lib/models/rule.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L6)

___

### OrDataTypeRule

Ƭ **OrDataTypeRule**: [`OrRule`](modules#orrule)<[`DataTypeRule`](modules#datatyperule)\>

#### Defined in

[lib/models/rule.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L7)

___

### OrRule

Ƭ **OrRule**<`T`\>: [`Rule`](modules#rule)<``"or"``, `T`[]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Rule`](modules#rule) |

#### Defined in

[lib/models/rule.ts:2](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L2)

___

### RangeRule

Ƭ **RangeRule**: [`Rule`](modules#rule)<``"range"``, [`ClassIdRule`](modules#classidrule) \| [`DataTypeRule`](modules#datatyperule) \| [`OrClassIdRule`](modules#orclassidrule) \| [`OrDataTypeRule`](modules#ordatatyperule)\>

#### Defined in

[lib/models/rule.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L8)

___

### RdfTypesRule

Ƭ **RdfTypesRule**: [`Rule`](modules#rule)<``"rdfTypes"``, `string`[]\>

#### Defined in

[lib/models/rule.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L11)

___

### ResourceAttributeRaw

Ƭ **ResourceAttributeRaw**: `Object`

#### Index signature

▪ [dataType: `string`]: `Many`<`unknown`\>

#### Defined in

[lib/models/resource.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource.ts#L10)

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

[lib/models/resource-graph.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/resource-graph.ts#L9)

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

[lib/models/rule.ts:1](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L1)

___

### SubClassOfRule

Ƭ **SubClassOfRule**: [`Rule`](modules#rule)<``"subClassOf"``, `string`\>

#### Defined in

[lib/models/rule.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L5)

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

[lib/models/application-profile.ts:10](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L10)

## Variables

### EMPTY\_APPLICATION\_PROFILE

• **EMPTY\_APPLICATION\_PROFILE**: [`ApplicationProfile`](modules#applicationprofile)

#### Defined in

[lib/models/application-profile.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/application-profile.ts#L22)

___

### KNOWN\_PREFIXES

• **KNOWN\_PREFIXES**: [`Prefixes`](interfaces/Prefixes)

#### Defined in

[lib/models/prefixes.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/prefixes.ts#L5)

## Functions

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

[lib/utils/get-concrete-type.ts:6](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/utils/get-concrete-type.ts#L6)

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

[lib/utils/get-concrete-type.ts:30](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/utils/get-concrete-type.ts#L30)

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

[lib/utils/get-concrete-type.ts:48](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/utils/get-concrete-type.ts#L48)

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

[lib/models/rule.ts:22](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L22)

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

[lib/models/rule.ts:42](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L42)

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

[lib/models/rule.ts:34](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L34)

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

[lib/models/rule.ts:38](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L38)

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

[lib/models/rule.ts:26](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L26)

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

[lib/models/rule.ts:30](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L30)

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

[lib/models/rule.ts:18](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L18)

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

[lib/models/rule.ts:46](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L46)

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

[lib/models/rule.ts:50](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L50)

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

[lib/models/rule.ts:13](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L13)

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

[lib/models/rule.ts:54](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/application-profile/src/lib/models/rule.ts#L54)
