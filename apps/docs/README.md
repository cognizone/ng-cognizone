# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm start
```

This command starts a local development server to list on localhost:3000. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the root `docs` directory and can be served using any static contents hosting service.

### Contributing

#### Libraries

The "api" part for each library is generated based on the [tsdoc comments](http://typedoc.org/guides/doccomments/) present in the source .ts files of that library. For example for model-utils, everything behind the [api section](https://cognizone.github.io/ng-cognizone/docs/libraries/model-utils/api/) is generated. As an example, [here](https://github.com/cognizone/ng-cognizone/blob/main/libs/model-utils/src/lib/models/sub-sink.ts) is the source of the SubSink class, and [here](https://cognizone.github.io/ng-cognizone/docs/libraries/model-utils/api/) is the generated documentation.
