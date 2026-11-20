# ng-yasgui

This library was generated with [Nx](https://nx.dev).

## Query results and share links

The prebuilt client (`src/assets/yasgui.min.js`) writes query results and share-link settings into the page as HTML.
`YasguiService.loadYasgui()` returns a patched client, which `YasguiComponent` also uses:

- Result tables, map popups and chart warnings show values, labels, datatypes and variable names as text.
- Only `http://`, `https://` and `mailto:` uris are links. Other uris (`urn:`, `ftp:`, `tel:`, `javascript:`...) are shown
  as text, with the same `uri` class.
- Each time the client is created, it restricts the share link in the url (hash, or query string):
  - `outputSettings` keeps a chart configuration (type, options, state, column and row numbers) and a pivot table layout.
    Chart types are limited to those of the chart editor that draw SVG or text, and chart options that render HTML
    (`allowHtml`, `isHtml`) are dropped.
  - Only `query`, `outputFormat`, `outputSettings`, `tabTitle`, `namedGraph` and `defaultGraph` are kept, as the client
    runs the query of a link as soon as it opens it. The endpoint, request method, headers and request arguments come
    from the app's options.

To let share links choose the endpoint and request settings again:

```ts
inject(YasguiService).keepShareLinkRequestSettings = true;
```

## Running unit tests

Run `nx test ng-yasgui` to execute the unit tests.

### Reference for Yasgui JS

https://docs.triply.cc/yasgui-api/
