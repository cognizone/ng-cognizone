---
id: "LangString"
title: "Interface: LangString"
sidebar_label: "LangString"
sidebar_position: 0
custom_edit_url: null
---

This represents an rdf:langString as usually indexed in our elastic. Each key
is a lang (usually simple, like 'en' or 'fr') and its corersponding value is
the label in that language. In here, there can be multiple values, that's why
it is a `string[]`. Also, keys could be more complex, like uri of the
languages

## Indexable

▪ [lang: `string`]: `string`[]
