---
id: "SubSink"
title: "Class: SubSink"
sidebar_label: "SubSink"
sidebar_position: 0
custom_edit_url: null
---

Utility class used for handling rxjs subscription in a gracefull manner.

## Constructors

### constructor

• **new SubSink**()

## Properties

### subscriptions

• `Private` **subscriptions**: `Subscription`[] = `[]`

#### Defined in

[lib/models/sub-sink.ts:7](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/sub-sink.ts#L7)

## Accessors

### add

• `set` **add**(`value`): `void`

Add a subscription to the pool of subscriptions. multiple calls can be made in succession, like
`mySubSink = timer(500).subscribe();`
`mySubSink = timer(1000).subscribe();`.
This was done to avoid having to wrap a subscription in a method call, like
`mySubSink.addInArray(timer(1000).subscribe());`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `Subscription` |

#### Returns

`void`

#### Defined in

[lib/models/sub-sink.ts:16](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/sub-sink.ts#L16)

## Methods

### empty

▸ **empty**(): `void`

Unsuscribe from all the added subscriptions and empties the internal pool.

#### Returns

`void`

#### Defined in

[lib/models/sub-sink.ts:23](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/model-utils/src/lib/models/sub-sink.ts#L23)
