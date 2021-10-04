---
id: "modules"
title: "@cognizone/model-utils"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [SelectOptionsProvidersMerger](classes/SelectOptionsProvidersMerger)
- [SubSink](classes/SubSink)

## Interfaces

- [ElasticAggregation](interfaces/ElasticAggregation)
- [ElasticBucket](interfaces/ElasticBucket)
- [ElasticHit](interfaces/ElasticHit)
- [ElasticQuery](interfaces/ElasticQuery)
- [ElasticSearchResponse](interfaces/ElasticSearchResponse)
- [GetSelectOptionsParams](interfaces/GetSelectOptionsParams)
- [LangString](interfaces/LangString)
- [LangStringSimple](interfaces/LangStringSimple)
- [Pagination](interfaces/Pagination)
- [SelectOption](interfaces/SelectOption)
- [SelectOptionCounts](interfaces/SelectOptionCounts)
- [SelectOptionGroup](interfaces/SelectOptionGroup)
- [SelectOptionsProvider](interfaces/SelectOptionsProvider)

## Type aliases

### AnyObject

Ƭ **AnyObject**: `Record`<`string`, `unknown`\>

#### Defined in

[lib/models/any-object.ts:1](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/any-object.ts#L1)

___

### Completable

Ƭ **Completable**<`T`\>: `Observable`<`T`\> \| `Promise`<`T`\> \| `T`

The `Completable` type represents a resource that should "complete" in the
Observable sense. A `Completable` is either directly the generic type given, a `Promise` that returns that type or an
`Observable` that does the same.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[lib/models/completable.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/completable.ts#L9)

___

### CzLabel

Ƭ **CzLabel**: [`LangString`](interfaces/LangString) \| [`LangStringSimple`](interfaces/LangStringSimple) \| `string`

Union type that encompass all the usual types we use for labels

#### Defined in

[lib/models/cz-label.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/cz-label.ts#L7)

___

### Dictionary

Ƭ **Dictionary**<`T`\>: `Object`

A shorthand for indexed object with `string` as keys

#### Type parameters

| Name |
| :------ |
| `T` |

#### Index signature

▪ [index: `string`]: `T`

#### Defined in

[lib/models/dictionary.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/dictionary.ts#L4)

___

### Many

Ƭ **Many**<`T`\>: `T` \| `T`[]

A shorthand to specify if it's either the given type or an array of it

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[lib/models/many.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/many.ts#L4)

___

### Nil

Ƭ **Nil**<`T`\>: `T` \| ``null`` \| `undefined`

Shorthand type for type being either itself, null or undefined

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[lib/models/nil.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/nil.ts#L4)

___

### SelectOptionLabel

Ƭ **SelectOptionLabel**: [`LangString`](interfaces/LangString) \| [`LangStringSimple`](interfaces/LangStringSimple) \| `string`

The label of a [SelectOption](interfaces/SelectOption)

#### Defined in

[lib/models/select-option.ts:34](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L34)

___

### Sorter

Ƭ **Sorter**<`T`\>: (`a`: `T`, `b`: `T`) => `number`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`a`, `b`): `number`

Describes a function to be used as argument for `Array<T>::sort`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |
| `b` | `T` |

##### Returns

`number`

#### Defined in

[lib/models/sorter.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/sorter.ts#L4)

## Functions

### awaitForCompletable

▸ `Const` **awaitForCompletable**<`T`\>(`resource`): `Promise`<`T`\>

This is deprecated, use [completableToPromise](modules#completabletopromise) instead

**`deprecated`** use `completableToPromise` instead

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `resource` | [`Completable`](modules#completable)<`T`\> |

#### Returns

`Promise`<`T`\>

#### Defined in

[lib/models/completable.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/completable.ts#L16)

___

### completableToObservable

▸ **completableToObservable**<`T`\>(`resource`): `Observable`<`T`\>

Convert a [Completable](modules#completable) to an `Observable`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Completable`](modules#completable)<`T`\> | The `Completable` to be transformed into an `Observable`. |

#### Returns

`Observable`<`T`\>

resource as an `Observable`

#### Defined in

[lib/models/completable.ts:39](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/completable.ts#L39)

___

### completableToPromise

▸ **completableToPromise**<`T`\>(`resource`): `Promise`<`T`\>

Convert a [Completable](modules#completable) to a `Promise`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resource` | [`Completable`](modules#completable)<`T`\> | The `Completable` to be transformed into a `Promise`. For ease of use, if it is an `Observable`, it is piped with `first()` |

#### Returns

`Promise`<`T`\>

resource as a `Promise`

#### Defined in

[lib/models/completable.ts:25](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/completable.ts#L25)

___

### createElasticQuery

▸ **createElasticQuery**(): [`ElasticQuery`](interfaces/ElasticQuery)

Create a basic structure for an [ElasticQuery](interfaces/ElasticQuery)

**`deprecated`**

#### Returns

[`ElasticQuery`](interfaces/ElasticQuery)

#### Defined in

[lib/models/elastic-query.ts:53](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-query.ts#L53)

___

### czLabelToString

▸ **czLabelToString**(`label`, `lang`, `fallbackLangs?`): `string` \| `undefined`

same as [getLangStringValue](modules#getlangstringvalue) but also return label as-is if it's already a string

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `label` | [`Nil`](modules#nil)<[`CzLabel`](modules#czlabel)\> | `undefined` |
| `lang` | `string` | `undefined` |
| `fallbackLangs` | `string`[] | `[]` |

#### Returns

`string` \| `undefined`

#### Defined in

[lib/models/cz-label.ts:12](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/cz-label.ts#L12)

___

### dateToDateString

▸ **dateToDateString**(`value`): `string`

Returns the given `Date` as a `string` in the YYYY-MM-dd format

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Date` |

#### Returns

`string`

#### Defined in

[lib/utils/date-to-date-string.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/utils/date-to-date-string.ts#L5)

___

### debounceSync

▸ **debounceSync**<`T`\>(): `MonoTypeOperatorFunction`<`T`\>

rxjs operator to be used for debouncing the source in a synchronous way

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`MonoTypeOperatorFunction`<`T`\>

#### Defined in

[lib/operators/debounce-sync.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/operators/debounce-sync.ts#L7)

___

### downloadBlob

▸ **downloadBlob**(`data`, `fileName?`): `void`

Triggers a browser download of the given `Blob`, and should be cross-browser
compatible (looking at you IE).

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Blob` |
| `fileName?` | `string` |

#### Returns

`void`

#### Defined in

[lib/utils/download-blob.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/utils/download-blob.ts#L5)

___

### extractOneSourceFromElasticResponse

▸ **extractOneSourceFromElasticResponse**<`T`\>(`response`): `T`

Extract the first `_source` of the first `hits` of an {@link ElasticResponse}

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`ElasticSearchResponse`](interfaces/ElasticSearchResponse)<`T`\> | The json returned by a _search elastic call |

#### Returns

`T`

#### Defined in

[lib/models/elastic-response.ts:80](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-response.ts#L80)

___

### extractSourcesFromElasticResponse

▸ **extractSourcesFromElasticResponse**<`T`\>(`response`): `T`[]

Aggregate all `_source` in all `hits` of an {@link ElasticResponse} in a single array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`ElasticSearchResponse`](interfaces/ElasticSearchResponse)<`T`\> | The json returned by a _search elastic call |

#### Returns

`T`[]

#### Defined in

[lib/models/elastic-response.ts:71](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-response.ts#L71)

___

### getAllProperties

▸ **getAllProperties**(`obj`): `string`[]

get all properties of the given object, and goes of the prototype chain. This
is mostly useful for debugging purposes and javascript digging.

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Object` |

#### Returns

`string`[]

#### Defined in

[lib/utils/get-all-properties.ts:5](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/utils/get-all-properties.ts#L5)

___

### getAllSelectOptions

▸ **getAllSelectOptions**<`T`\>(`options`): [`SelectOption`](interfaces/SelectOption)<`T`\>[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | ([`SelectOption`](interfaces/SelectOption)<`T`\> \| [`SelectOptionGroup`](interfaces/SelectOptionGroup)<`T`\>)[] |

#### Returns

[`SelectOption`](interfaces/SelectOption)<`T`\>[]

#### Defined in

[lib/models/select-option.ts:146](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L146)

___

### getLangStringValue

▸ **getLangStringValue**(`langString`, `lang`, `fallbackLangs?`): `string` \| `undefined`

Extract from a [LangString](interfaces/LangString) the label in a corresponding `lang`. If not
found, it will try extract the label of one of the fallback languages.
If even there nothing is found, it will fallback to the first label found.
It is to be noted that even if the label is a string[] with multiple values,
only the 0th element will be taken.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `langString` | [`Nil`](modules#nil)<[`LangString`](interfaces/LangString) \| [`LangStringSimple`](interfaces/LangStringSimple)\> | `undefined` | The lang string from which we want to extract a label |
| `lang` | `string` | `undefined` | The preferred lang to get the label for |
| `fallbackLangs` | `string`[] | `[]` | ordered list of fallback languages |

#### Returns

`string` \| `undefined`

#### Defined in

[lib/models/lang-string.ts:33](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/lang-string.ts#L33)

___

### groupSelectOptions

▸ **groupSelectOptions**<`T`\>(`options`): [`SelectOptionGroup`](interfaces/SelectOptionGroup)<`T`\>[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | ([`SelectOption`](interfaces/SelectOption)<`T`\> \| [`SelectOptionGroup`](interfaces/SelectOptionGroup)<`T`\>)[] |

#### Returns

[`SelectOptionGroup`](interfaces/SelectOptionGroup)<`T`\>[]

#### Defined in

[lib/models/select-option.ts:158](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L158)

___

### manyToArray

▸ **manyToArray**<`T`\>(`x`): `T`[]

Convert a `Many` to an array. Beware that it is nullish-safe, so you could end up with `[undefined]`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`Many`](modules#many)<`T`\> |

#### Returns

`T`[]

#### Defined in

[lib/models/many.ts:9](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/many.ts#L9)

___

### manyToOne

▸ **manyToOne**<`T`\>(`x`): `T`

Convert a `Many` to its base type, taking the 0th element of the array if applicable.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | [`Many`](modules#many)<`T`\> |

#### Returns

`T`

#### Defined in

[lib/models/many.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/many.ts#L16)

___

### mapElasticSources

▸ **mapElasticSources**<`T`, `U`\>(`response`, `project`): [`ElasticSearchResponse`](interfaces/ElasticSearchResponse)<`U`\>

Return a transformed {@link ElasticResponse} where all `_source` are transformed using the given `project` function

#### Type parameters

| Name |
| :------ |
| `T` |
| `U` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`ElasticSearchResponse`](interfaces/ElasticSearchResponse)<`T`\> | The json returned by a _search elastic call |
| `project` | (`data`: `T`) => `U` | The projection function |

#### Returns

[`ElasticSearchResponse`](interfaces/ElasticSearchResponse)<`U`\>

#### Defined in

[lib/models/elastic-response.ts:62](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/elastic-response.ts#L62)

___

### notNil

▸ **notNil**<`T`\>(`o`): o is Exclude<T, undefined \| null\>

Checking that the argument is not [Nil](modules#nil), so basically `o != null`. Its
main usage is to be used in array filtering or rxjs stream filtering. For example
`const myStringArray = ['a', undefined, null, 'b'].filter(notNil);`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `T` |

#### Returns

o is Exclude<T, undefined \| null\>

#### Defined in

[lib/models/nil.ts:11](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/nil.ts#L11)

___

### orElse

▸ **orElse**<`T`, `R`\>(`value`): `OperatorFunction`<`T`, `R`\>

rxjs operator to be used for defaulting to a given value if the stream passes a nullish value. For example:
`from(['a', undefined, 'c']).pipe(orElse('b')).subscribe(console.log)` will log 'a' 'b' 'c'.

#### Type parameters

| Name |
| :------ |
| `T` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `R` |

#### Returns

`OperatorFunction`<`T`, `R`\>

#### Defined in

[lib/operators/or-else.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/operators/or-else.ts#L8)

___

### selectOptionMatchQuery

▸ **selectOptionMatchQuery**<`T`\>(`option`, `query`): `boolean`

This will (naively) check that on the labels of the given option matches the query.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `option` | [`SelectOption`](interfaces/SelectOption)<`T`\> |
| `query` | [`Nil`](modules#nil)<`string`\> |

#### Returns

`boolean`

#### Defined in

[lib/models/select-option.ts:53](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L53)

___

### selectProp

▸ **selectProp**<`T`, `K`\>(`key`): `OperatorFunction`<`T`, `T`[`K`]\>

Simply take the key property of the obecjt going trhough the stream, and applyting a distinctUntilChanged right after.
This is mostly used for selecting parts of a reactive state. (Like we mostly do with ngxs)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `K` |

#### Returns

`OperatorFunction`<`T`, `T`[`K`]\>

#### Defined in

[lib/operators/select-prop.ts:8](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/operators/select-prop.ts#L8)

___

### strictEntries

▸ **strictEntries**<`T`\>(`o`): [keyof `T`, `T`[keyof `T`]][]

Same as `Object.entries`, but strongly typed

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `T` |

#### Returns

[keyof `T`, `T`[keyof `T`]][]

#### Defined in

[lib/utils/strict-entries.ts:4](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/utils/strict-entries.ts#L4)

___

### trackBySelectOption

▸ **trackBySelectOption**<`T`\>(`index`, `option`): `T`

a TrackByFn to be used with an `*ngFor` in case it is used on an array of [SelectOption](interfaces/SelectOption)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |
| `option` | [`SelectOption`](interfaces/SelectOption)<`T`\> |

#### Returns

`T`

#### Defined in

[lib/models/select-option.ts:46](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/select-option.ts#L46)
