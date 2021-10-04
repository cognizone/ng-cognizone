---
id: "CognizoneMatIconRegistry"
title: "Class: CognizoneMatIconRegistry"
sidebar_label: "CognizoneMatIconRegistry"
sidebar_position: 0
custom_edit_url: null
---

## Hierarchy

- `MatIconRegistry`

  ↳ **`CognizoneMatIconRegistry`**

## Constructors

### constructor

• **new CognizoneMatIconRegistry**(`sanitizer`, `http`, `errorHandler`, `options`, `logger`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `sanitizer` | `DomSanitizer` |
| `http` | `HttpClient` |
| `errorHandler` | `ErrorHandler` |
| `options` | [`CognizoneMaterialIconsOptions`](../interfaces/CognizoneMaterialIconsOptions) |
| `logger` | `Logger` |

#### Overrides

MatIconRegistry.constructor

#### Defined in

[libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts:21](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts#L21)

## Properties

### options

• `Private` **options**: `Required`<[`CognizoneMaterialIconsOptions`](../interfaces/CognizoneMaterialIconsOptions)\>

#### Defined in

[libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts:19](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts#L19)

___

### registered

• `Private` **registered**: `Set`<`string`\>

#### Defined in

[libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts:17](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts#L17)

___

### ɵfac

▪ `Static` **ɵfac**: `unknown`

#### Inherited from

MatIconRegistry.ɵfac

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:261

## Methods

### addSvgIcon

▸ **addSvgIcon**(`iconName`, `url`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon by URL in the default namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iconName` | `string` | Name under which the icon should be registered. |
| `url` | `SafeResourceUrl` |  |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIcon

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:95

___

### addSvgIconInNamespace

▸ **addSvgIconInNamespace**(`namespace`, `iconName`, `url`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon by URL in the specified namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | Namespace in which the icon should be registered. |
| `iconName` | `string` | Name under which the icon should be registered. |
| `url` | `SafeResourceUrl` |  |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconInNamespace

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:108

___

### addSvgIconLiteral

▸ **addSvgIconLiteral**(`iconName`, `literal`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon using an HTML string in the default namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iconName` | `string` | Name under which the icon should be registered. |
| `literal` | `SafeHtml` | SVG source of the icon. |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconLiteral

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:101

___

### addSvgIconLiteralInNamespace

▸ **addSvgIconLiteralInNamespace**(`namespace`, `iconName`, `literal`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon using an HTML string in the specified namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | Namespace in which the icon should be registered. |
| `iconName` | `string` | Name under which the icon should be registered. |
| `literal` | `SafeHtml` | SVG source of the icon. |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconLiteralInNamespace

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:124

___

### addSvgIconResolver

▸ **addSvgIconResolver**(`resolver`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon resolver function with the registry. The function will be invoked with the
name and namespace of an icon when the registry tries to resolve the URL from which to fetch
the icon. The resolver is expected to return a `SafeResourceUrl` that points to the icon,
an object with the icon URL and icon options, or `null` if the icon is not supported. Resolvers
will be invoked in the order in which they have been registered.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `resolver` | `IconResolver` | Resolver function to be registered. |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconResolver

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:117

___

### addSvgIconSet

▸ **addSvgIconSet**(`url`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon set by URL in the default namespace.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `SafeResourceUrl` |
| `options?` | `IconOptions` |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconSet

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:129

___

### addSvgIconSetInNamespace

▸ **addSvgIconSetInNamespace**(`namespace`, `url`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon set by URL in the specified namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | Namespace in which to register the icon set. |
| `url` | `SafeResourceUrl` |  |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconSetInNamespace

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:140

___

### addSvgIconSetLiteral

▸ **addSvgIconSetLiteral**(`literal`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon set using an HTML string in the default namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `literal` | `SafeHtml` | SVG source of the icon set. |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconSetLiteral

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:134

___

### addSvgIconSetLiteralInNamespace

▸ **addSvgIconSetLiteralInNamespace**(`namespace`, `literal`, `options?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Registers an icon set using an HTML string in the specified namespace.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `namespace` | `string` | Namespace in which to register the icon set. |
| `literal` | `SafeHtml` | SVG source of the icon set. |
| `options?` | `IconOptions` | - |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.addSvgIconSetLiteralInNamespace

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:146

___

### classNameForFontAlias

▸ **classNameForFontAlias**(`alias`): `string`

Returns the CSS class name associated with the alias by a previous call to
registerFontClassAlias. If no CSS class has been associated, returns the alias unmodified.

#### Parameters

| Name | Type |
| :------ | :------ |
| `alias` | `string` |

#### Returns

`string`

#### Inherited from

MatIconRegistry.classNameForFontAlias

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:160

___

### getDefaultFontSetClass

▸ **getDefaultFontSetClass**(): `string`

Returns the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
have a fontSet input value, and is not loading an icon by name or URL.

#### Returns

`string`

#### Inherited from

MatIconRegistry.getDefaultFontSetClass

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:172

___

### getFilePath

▸ `Protected` **getFilePath**(`iconName`, `theme`): `SafeResourceUrl`

#### Parameters

| Name | Type |
| :------ | :------ |
| `iconName` | `string` |
| `theme` | `string` |

#### Returns

`SafeResourceUrl`

#### Defined in

[libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts:55](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts#L55)

___

### getNamedSvgIcon

▸ **getNamedSvgIcon**(`name`, `namespace?`): `Observable`<`SVGElement`\>

**`description`** If we fail to get an icon the first time, we try to register it as a material icon, then if it fails, it fails "hard"

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `namespace` | `string` | `''` |

#### Returns

`Observable`<`SVGElement`\>

#### Overrides

MatIconRegistry.getNamedSvgIcon

#### Defined in

[libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts:37](https://github.com/cognizone/ng-cognizone/blob/861cbad/libs/material-icons/src/lib/services/cognizone-mat-icon-registry.service.ts#L37)

___

### getSvgIconFromUrl

▸ **getSvgIconFromUrl**(`safeUrl`): `Observable`<`SVGElement`\>

Returns an Observable that produces the icon (as an `<svg>` DOM element) from the given URL.
The response from the URL may be cached so this will not always cause an HTTP request, but
the produced element will always be a new copy of the originally fetched icon. (That is,
it will not contain any modifications made to elements previously returned).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `safeUrl` | `SafeResourceUrl` | URL from which to fetch the SVG icon. |

#### Returns

`Observable`<`SVGElement`\>

#### Inherited from

MatIconRegistry.getSvgIconFromUrl

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:181

___

### ngOnDestroy

▸ **ngOnDestroy**(): `void`

#### Returns

`void`

#### Inherited from

MatIconRegistry.ngOnDestroy

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:191

___

### registerFontClassAlias

▸ **registerFontClassAlias**(`alias`, `className?`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Defines an alias for a CSS class name to be used for icon fonts. Creating an matIcon
component with the alias as the fontSet input will cause the class name to be applied
to the `<mat-icon>` element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alias` | `string` | Alias for the font. |
| `className?` | `string` | Class name override to be used instead of the alias. |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.registerFontClassAlias

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:155

___

### setDefaultFontSetClass

▸ **setDefaultFontSetClass**(`className`): [`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

Sets the CSS class name to be used for icon fonts when an `<mat-icon>` component does not
have a fontSet input value, and is not loading an icon by name or URL.

#### Parameters

| Name | Type |
| :------ | :------ |
| `className` | `string` |

#### Returns

[`CognizoneMatIconRegistry`](CognizoneMatIconRegistry)

#### Inherited from

MatIconRegistry.setDefaultFontSetClass

#### Defined in

node_modules/@angular/material/icon/icon-registry.d.ts:167
