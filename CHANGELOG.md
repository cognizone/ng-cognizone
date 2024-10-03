# [5.0.0-beta.12](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.11...v5.0.0-beta.12) (2024-10-03)


### Bug Fixes

* **json-ld:** better typing ([189d554](https://github.com/cognizone/ng-cognizone/commit/189d554dffa44c4e0768516cc131789a4527beed))

# [5.0.0-beta.11](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.10...v5.0.0-beta.11) (2024-10-02)


### Bug Fixes

* **cdk/result:** better typing for pipes ([171e345](https://github.com/cognizone/ng-cognizone/commit/171e345ec5c2631da67fd52cafc3bf53dff5591e))

# [5.0.0-beta.10](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.9...v5.0.0-beta.10) (2024-10-02)


### Features

* add utilities for Result and signals ([11d6503](https://github.com/cognizone/ng-cognizone/commit/11d650300b13d1f844cd076d2a3d65a8baf10c0c))

# [5.0.0-beta.9](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.8...v5.0.0-beta.9) (2024-10-02)


### Features

* **json-ld:** add FetchStore ([1c557fb](https://github.com/cognizone/ng-cognizone/commit/1c557fb1c166bdf2e496898da80225bb6fe6445e))

# [5.0.0-beta.8](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.7...v5.0.0-beta.8) (2024-09-16)


### Features

* **json-ld:** JsonLdService expand method got a flatten option now ([bbbad2e](https://github.com/cognizone/ng-cognizone/commit/bbbad2e44e611a9f3d67f37c7443df064e393f07))

# [5.0.0-beta.7](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.6...v5.0.0-beta.7) (2024-09-10)


### Features

* **ng-core:** make use of DestroyRef for the OnDestroy$ utility class ([63c817a](https://github.com/cognizone/ng-cognizone/commit/63c817a14615c12535bbf4382d5cc37175e25da4))


### BREAKING CHANGES

* **ng-core:** onDestroyMixin has been removed
* **ng-core:** OnDestroy$ does not use ngOnDestroy anymore, so extending it and calling super.ngOnDestroy() will throw an error now.

# [5.0.0-beta.6](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.5...v5.0.0-beta.6) (2024-09-04)


### Features

* make pure .ts libs export as both cjs and esm ([e5f5849](https://github.com/cognizone/ng-cognizone/commit/e5f58499f6fa47fb6e0e66ec55831d7dc316e6ce))

# [5.0.0-beta.5](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.4...v5.0.0-beta.5) (2024-08-27)


### Features

* **model-utils:** add Result type and utilities ([6e45259](https://github.com/cognizone/ng-cognizone/commit/6e4525998c20e6f881e511c1e72056549a99ac18))

# [5.0.0-beta.4](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.3...v5.0.0-beta.4) (2024-08-22)


### Bug Fixes

* peer deps to beta ([bbef86a](https://github.com/cognizone/ng-cognizone/commit/bbef86afcc5ca5e04e72b635f11ed8c6e7674ea9))

# [5.0.0-beta.3](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.2...v5.0.0-beta.3) (2024-08-20)


### Bug Fixes

* **json-ld:** issue with change to node in JsonLdLabelDirective ([45c1a47](https://github.com/cognizone/ng-cognizone/commit/45c1a476646056f60bac7dcdf0b3d010219092e5))

# [5.0.0-beta.2](https://github.com/cognizone/ng-cognizone/compare/v5.0.0-beta.1...v5.0.0-beta.2) (2024-08-19)


### Features

* **legi-cv:** add snapshot method to CvStateService ([c7ee1c6](https://github.com/cognizone/ng-cognizone/commit/c7ee1c6e4506d21a50d6b35c4ee3fd00e26a9f24))

# [5.0.0-beta.1](https://github.com/cognizone/ng-cognizone/compare/v4.1.0-beta.1...v5.0.0-beta.1) (2024-08-09)


### Features

* correct breaking change to trigger 5.0.0 beta ([042309b](https://github.com/cognizone/ng-cognizone/commit/042309b4685447ad5f4d13d9a4f1a66ef5aebeb3))


### BREAKING CHANGES

* upgrade to angular 18

# [4.1.0-beta.1](https://github.com/cognizone/ng-cognizone/compare/v4.0.0...v4.1.0-beta.1) (2024-08-09)


### Features

* upgrade to angular 17 ([8156507](https://github.com/cognizone/ng-cognizone/commit/8156507ad5644fa6d750abfaa60de4bfb8a6325c))
* upgrade to angular 18 / nx 19 ([fdb0299](https://github.com/cognizone/ng-cognizone/commit/fdb0299247f0929c5c6ee13a4f7f4c084cd47139))

# [4.0.0](https://github.com/cognizone/ng-cognizone/compare/v3.14.2...v4.0.0) (2024-08-09)


### Bug Fixes

* **18n:** add token injection for other libraries ([403c5b5](https://github.com/cognizone/ng-cognizone/commit/403c5b519aa2112dbc972d3674142faf1b12db3d))
* **eslint-config:** remove member ordering ([a125b0a](https://github.com/cognizone/ng-cognizone/commit/a125b0a7a28f2da31d46ca3f1219ccd0e1db3682))
* **html-diff:** add missing <sup> as possible specialClosingTag ([61267ed](https://github.com/cognizone/ng-cognizone/commit/61267edf928d9f772a7d49603b3d21049e57e565))
* **i18n:** remove I18N_SERVICE token ([a9d7079](https://github.com/cognizone/ng-cognizone/commit/a9d70791c578d3a238fadba02e7811cdc01253d2))
* **json-ld:** directly use transloco for now ([60139dc](https://github.com/cognizone/ng-cognizone/commit/60139dcccad48415aa2c8b32bf988a9c597b689c))
* too much imports ([c1eba12](https://github.com/cognizone/ng-cognizone/commit/c1eba12bea4181d0081329babe15c3d79b6d6a73))
* upgrade node and npm ([87e6267](https://github.com/cognizone/ng-cognizone/commit/87e626766e20123387efe58667a3e83836f080a0))


### Features

* **i18n:** add setActiveLang method ([bda3d02](https://github.com/cognizone/ng-cognizone/commit/bda3d02649d982ef9ea0fbbd756f2ef9187084dc))
* **json-ld:** add JsonLdLabelDirective ([8a2bd42](https://github.com/cognizone/ng-cognizone/commit/8a2bd42a40fec897e04476aef889eed2c56c9dfa))
* **ng-core:** use Unsubscribable instead of Subscription for OnDestroy$ ([accf4f7](https://github.com/cognizone/ng-cognizone/commit/accf4f756ca3004bda09d9097321bb49f3ab266e))
* upgrade to angular 15 ([77fa6a5](https://github.com/cognizone/ng-cognizone/commit/77fa6a59da1cfb17bdd5a2e886ef239cfa4ba115))
* upgrade to Angular 16 ([43ed66b](https://github.com/cognizone/ng-cognizone/commit/43ed66b995fdbb8d324406b96325ab0e0fa261cb))


### BREAKING CHANGES

* upgrade to Angular 16
* upgrade to angular 15

# [4.0.0-rc.9](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.8...v4.0.0-rc.9) (2024-08-01)

### Features

- **ng-core:** use Unsubscribable instead of Subscription for OnDestroy$ ([accf4f7](https://github.com/cognizone/ng-cognizone/commit/accf4f756ca3004bda09d9097321bb49f3ab266e))

# [4.0.0-rc.8](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.7...v4.0.0-rc.8) (2024-07-26)

### Bug Fixes

- **i18n:** remove I18N_SERVICE token ([a9d7079](https://github.com/cognizone/ng-cognizone/commit/a9d70791c578d3a238fadba02e7811cdc01253d2))
- too much imports ([c1eba12](https://github.com/cognizone/ng-cognizone/commit/c1eba12bea4181d0081329babe15c3d79b6d6a73))

# [4.0.0-rc.7](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.6...v4.0.0-rc.7) (2024-07-26)

### Bug Fixes

- **json-ld:** directly use transloco for now ([60139dc](https://github.com/cognizone/ng-cognizone/commit/60139dcccad48415aa2c8b32bf988a9c597b689c))

# [4.0.0-rc.6](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.5...v4.0.0-rc.6) (2024-07-26)

### Bug Fixes

- upgrade node and npm ([87e6267](https://github.com/cognizone/ng-cognizone/commit/87e626766e20123387efe58667a3e83836f080a0))

# [4.0.0-rc.5](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.4...v4.0.0-rc.5) (2024-07-26)

### Features

- **json-ld:** add JsonLdLabelDirective ([8a2bd42](https://github.com/cognizone/ng-cognizone/commit/8a2bd42a40fec897e04476aef889eed2c56c9dfa))

# [4.0.0-rc.4](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.3...v4.0.0-rc.4) (2024-07-26)

### Bug Fixes

- **18n:** add token injection for other libraries ([403c5b5](https://github.com/cognizone/ng-cognizone/commit/403c5b519aa2112dbc972d3674142faf1b12db3d))

# [4.0.0-rc.3](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.2...v4.0.0-rc.3) (2024-07-23)

### Features

- **i18n:** add setActiveLang method ([bda3d02](https://github.com/cognizone/ng-cognizone/commit/bda3d02649d982ef9ea0fbbd756f2ef9187084dc))

# [4.0.0-rc.2](https://github.com/cognizone/ng-cognizone/compare/v4.0.0-rc.1...v4.0.0-rc.2) (2024-07-23)

### Features

- upgrade to Angular 16 ([43ed66b](https://github.com/cognizone/ng-cognizone/commit/43ed66b995fdbb8d324406b96325ab0e0fa261cb))

### BREAKING CHANGES

- upgrade to Angular 16

# [4.0.0-rc.1](https://github.com/cognizone/ng-cognizone/compare/v3.14.1...v4.0.0-rc.1) (2024-07-23)

### Features

- upgrade to angular 15 ([77fa6a5](https://github.com/cognizone/ng-cognizone/commit/77fa6a59da1cfb17bdd5a2e886ef239cfa4ba115))

### BREAKING CHANGES

- upgrade to angular 15

## [3.14.2](https://github.com/cognizone/ng-cognizone/compare/v3.14.1...v3.14.2) (2024-08-08)

### Bug Fixes

- **html-diff:** add missing <sup> as possible specialClosingTag ([2011cdb](https://github.com/cognizone/ng-cognizone/commit/2011cdb57e823584a00903ed615e3b8ada1f47c2))

## [3.14.1](https://github.com/cognizone/ng-cognizone/compare/v3.14.0...v3.14.1) (2024-07-19)

### Bug Fixes

- **html-diff:** add missing export ([5f863bd](https://github.com/cognizone/ng-cognizone/commit/5f863bd5de148bab69f96fcf024acb1e7bb67c81))

# [3.14.0](https://github.com/cognizone/ng-cognizone/compare/v3.13.3...v3.14.0) (2024-07-19)

### Features

- **html-diff:** port htmldiff-js to our monorepo ([41940bc](https://github.com/cognizone/ng-cognizone/commit/41940bcfc1137a52e9e2e2703cf5660c7f1c1440))

## [3.13.3](https://github.com/cognizone/ng-cognizone/compare/v3.13.2...v3.13.3) (2024-07-17)

### Bug Fixes

- **prettier-config:** peed deps to prettier accept v3 ([b4c315d](https://github.com/cognizone/ng-cognizone/commit/b4c315df744c9851938fcdb12a3ff70826404d0b))

## [3.13.2](https://github.com/cognizone/ng-cognizone/compare/v3.13.1...v3.13.2) (2024-07-05)

### Bug Fixes

- more rxjs operators import fixes ([c38072d](https://github.com/cognizone/ng-cognizone/commit/c38072dab16b4df556bc241e9609a2a5cea186b2))

## [3.13.1](https://github.com/cognizone/ng-cognizone/compare/v3.13.0...v3.13.1) (2024-07-02)

### Bug Fixes

- correctly import rxjs operators from rxjs/operators ([d67d27f](https://github.com/cognizone/ng-cognizone/commit/d67d27f03ba2d8aa527dec87356bbd748993e3b0))

# [3.13.0](https://github.com/cognizone/ng-cognizone/compare/v3.12.4...v3.13.0) (2024-05-28)

### Features

- **json-model-graph:** czNodeAttributeLinked can be disabled programmatically ([b225f9f](https://github.com/cognizone/ng-cognizone/commit/b225f9fd5a6b32c546fafaf3f1872087ec8d74f1))

## [3.12.4](https://github.com/cognizone/ng-cognizone/compare/v3.12.3...v3.12.4) (2024-03-14)

### Bug Fixes

- **shacl-core:** remove lodash-es deps + cleanup shacl ([83d290c](https://github.com/cognizone/ng-cognizone/commit/83d290c25bad7efc61e0e4f64354019e5a49af68))

## [3.12.3](https://github.com/cognizone/ng-cognizone/compare/v3.12.2...v3.12.3) (2024-03-14)

### Bug Fixes

- **shacl-core:** peer deps, part 3 ([b135df4](https://github.com/cognizone/ng-cognizone/commit/b135df490e796c7d51019a1d7e19aed706067fa5))

## [3.12.2](https://github.com/cognizone/ng-cognizone/compare/v3.12.1...v3.12.2) (2024-03-14)

### Bug Fixes

- **shacl-core:** peer deps, part 2 ([bd5822f](https://github.com/cognizone/ng-cognizone/commit/bd5822f0a971525df12b6399c455768f3c639cdc))

## [3.12.1](https://github.com/cognizone/ng-cognizone/compare/v3.12.0...v3.12.1) (2024-03-14)

### Bug Fixes

- **shacl-core:** peer dependencies ([dc52d1e](https://github.com/cognizone/ng-cognizone/commit/dc52d1ecbca2f9abe78b4d1b6d3959151539bd61))

# [3.12.0](https://github.com/cognizone/ng-cognizone/compare/v3.11.0...v3.12.0) (2024-03-14)

### Features

- extracted /core subpaths from shacl, json-ld and lod ([bea58c7](https://github.com/cognizone/ng-cognizone/commit/bea58c74b0a980d73073d5d00cae3128fcd971b6))

# [3.11.0](https://github.com/cognizone/ng-cognizone/compare/v3.10.0...v3.11.0) (2024-02-16)

### Features

- **ui-kit:** ported toggletip module from Hanami ([3439a76](https://github.com/cognizone/ng-cognizone/commit/3439a76901222ef3e943df9a3df2ca5bd81d9bc0))

# [3.10.0](https://github.com/cognizone/ng-cognizone/compare/v3.9.4...v3.10.0) (2024-02-15)

### Features

- **cdk:** add loading directives ([92c9901](https://github.com/cognizone/ng-cognizone/commit/92c9901bb3ebc476fab189af5698aded47b231e0))
- **cdk:** added file-drop-zone directive and service ([062b984](https://github.com/cognizone/ng-cognizone/commit/062b984870720dfbf0781aee1d10263fde5b8687))
- **cdk:** introduce scrolling helper directive ([311ae55](https://github.com/cognizone/ng-cognizone/commit/311ae55e1ea4f7ec5cc4d63528da79c1d85dd22a))

## [3.9.4](https://github.com/cognizone/ng-cognizone/compare/v3.9.3...v3.9.4) (2024-02-07)

### Bug Fixes

- **shacl:** added getConcreteNodeKinds ([d1b2b94](https://github.com/cognizone/ng-cognizone/commit/d1b2b944c73bcfdfa0978c92b63ff25ad586dc01))

## [3.9.3](https://github.com/cognizone/ng-cognizone/compare/v3.9.2...v3.9.3) (2024-02-06)

### Bug Fixes

- peer dependencies (last fix, part 1/?) ([3b09bf3](https://github.com/cognizone/ng-cognizone/commit/3b09bf34c3074d43cf0ef3c4978d43aa9d88892c))

## [3.9.2](https://github.com/cognizone/ng-cognizone/compare/v3.9.1...v3.9.2) (2024-02-05)

### Bug Fixes

- peer dependencies (pretty please) ([278feb7](https://github.com/cognizone/ng-cognizone/commit/278feb7c50ddbeb707add0a82466e6ff42a6cef3))

## [3.9.1](https://github.com/cognizone/ng-cognizone/compare/v3.9.0...v3.9.1) (2024-02-05)

### Bug Fixes

- wrong peer dependencies ([f8646ff](https://github.com/cognizone/ng-cognizone/commit/f8646ffbf32d399c1dc308069025280e8bdfcd8d))

# [3.9.0](https://github.com/cognizone/ng-cognizone/compare/v3.8.4...v3.9.0) (2024-02-05)

### Features

- create a few core or ng-core sub entry points to make \*/core ones usable in nodejs scripts ([f589a1c](https://github.com/cognizone/ng-cognizone/commit/f589a1c1fb01a56134bbcdede68f78960d1ddf28))

## [3.8.4](https://github.com/cognizone/ng-cognizone/compare/v3.8.3...v3.8.4) (2024-01-31)

### Bug Fixes

- **tslint-config:** remove ordering for class properties to use inject more easily ([2f2767b](https://github.com/cognizone/ng-cognizone/commit/2f2767b7a75b4f38d1a4ee8f1f8a34823df1c10b))

## [3.8.3](https://github.com/cognizone/ng-cognizone/compare/v3.8.2...v3.8.3) (2024-01-23)

### Bug Fixes

- **ng-yasgui:** check for yasgui cache clean ([8be8d08](https://github.com/cognizone/ng-cognizone/commit/8be8d08b04d4a2f9bd44330e88cb822e2838d764))
- **ng-yasgui:** updating yasgui to prevent xss ([48110da](https://github.com/cognizone/ng-cognizone/commit/48110daf3d35ea4c1890f1559bd4eb6db943842f))

## [3.8.2](https://github.com/cognizone/ng-cognizone/compare/v3.8.1...v3.8.2) (2024-01-04)

### Bug Fixes

- **cdk:** added defaultsTo pipe ([a0c695b](https://github.com/cognizone/ng-cognizone/commit/a0c695b6e199a8ad90096432020602d579f09c73))
- **model-utils:** added isEmpty utility function ([6e4aa67](https://github.com/cognizone/ng-cognizone/commit/6e4aa677aa75c186343a76e3cc2186b6ca9ef70f))

## [3.8.1](https://github.com/cognizone/ng-cognizone/compare/v3.8.0...v3.8.1) (2024-01-02)

### Bug Fixes

- dummy change to trigger new release ([f4d490d](https://github.com/cognizone/ng-cognizone/commit/f4d490d511dc8a63a7c287c4ec0b0df808e925f4))

# [3.8.0](https://github.com/cognizone/ng-cognizone/compare/v3.7.1...v3.8.0) (2024-01-02)

### Features

- **cdk:** add feature flag service and directive ([00338ea](https://github.com/cognizone/ng-cognizone/commit/00338eac25a49a3a1fde3673612e7662ae156e76))
- **cdk:** added AutoResizeHelperDirective and FOCUSABLE_ELEMENTS_SELECTOR ([bb12716](https://github.com/cognizone/ng-cognizone/commit/bb1271688913b4c2c5f1f24b80d69b9406a0031e))
- **json-ld:** add json-ld lib imported from Hanami ([32df0b4](https://github.com/cognizone/ng-cognizone/commit/32df0b4b1879d9e5b8ba44f043359fc3be0ea2bc))
- **shacl:** added shacl lib ([c162e6e](https://github.com/cognizone/ng-cognizone/commit/c162e6e82070c6130dcc66dbb702bf4c31fa0bdf))
- **ui-kit:** created library ([bebe73f](https://github.com/cognizone/ng-cognizone/commit/bebe73f2732731ca5ad7c35c637b2fc8190c190d))

## [3.7.1](https://github.com/cognizone/ng-cognizone/compare/v3.7.0...v3.7.1) (2023-12-12)

### Bug Fixes

- **ng-yasgui:** renamed isQueryExecuted to runQueryOnChange ([75a2ea9](https://github.com/cognizone/ng-cognizone/commit/75a2ea9477d2e95b78f7b8559cdae45c59f40fb3))

# [3.7.0](https://github.com/cognizone/ng-cognizone/compare/v3.6.4...v3.7.0) (2023-12-12)

### Features

- **ng-yasgui:** adding condition to execute the query on click via parent ([78d218a](https://github.com/cognizone/ng-cognizone/commit/78d218aa8a0d3aaaab3a37c4b6d3851a6806b5ee))

## [3.6.4](https://github.com/cognizone/ng-cognizone/compare/v3.6.3...v3.6.4) (2023-11-09)

### Bug Fixes

- **model-utils:** add values-of type ([e3eb1f3](https://github.com/cognizone/ng-cognizone/commit/e3eb1f383d8420447913800b5ce7f9dae5f22b2b))

## [3.6.3](https://github.com/cognizone/ng-cognizone/compare/v3.6.2...v3.6.3) (2023-11-08)

### Bug Fixes

- **seo:** adding multi to title options ([b6d7620](https://github.com/cognizone/ng-cognizone/commit/b6d7620e27365c4033a9dc27d3e8e631bfed1cca))

## [3.6.2](https://github.com/cognizone/ng-cognizone/compare/v3.6.1...v3.6.2) (2023-11-07)

### Bug Fixes

- **lod:** actually export namespace.ts ([5ae4e66](https://github.com/cognizone/ng-cognizone/commit/5ae4e66fae11f98a329716546db17c8bf7123141))

## [3.6.1](https://github.com/cognizone/ng-cognizone/compare/v3.6.0...v3.6.1) (2023-11-02)

### Bug Fixes

- **seo:** added singular meta reset ([95cf972](https://github.com/cognizone/ng-cognizone/commit/95cf97278be58b5760958e5f7c012644d086b2d9))

# [3.6.0](https://github.com/cognizone/ng-cognizone/compare/v3.5.0...v3.6.0) (2023-10-31)

### Features

- **seo:** add seo library ([17f024e](https://github.com/cognizone/ng-cognizone/commit/17f024e6302d0676c50b00ed1f8e168682c286bc))

# [3.5.0](https://github.com/cognizone/ng-cognizone/compare/v3.4.2...v3.5.0) (2023-10-31)

### Features

- **lod:** add lod library ([05d3293](https://github.com/cognizone/ng-cognizone/commit/05d329338e5435136a27095b38f1ba9c72649825))

## [3.4.2](https://github.com/cognizone/ng-cognizone/compare/v3.4.1...v3.4.2) (2023-10-25)

### Bug Fixes

- **legi-shared:** correctly disable option in autocomplete ([b7c7fc9](https://github.com/cognizone/ng-cognizone/commit/b7c7fc98336d600466a6ab473d8950e0bc32872a))

## [3.4.1](https://github.com/cognizone/ng-cognizone/compare/v3.4.0...v3.4.1) (2023-10-05)

### Bug Fixes

- **eslint-config:** correct peer dependencies ([3d9fa30](https://github.com/cognizone/ng-cognizone/commit/3d9fa304215520751a9428dc480b3bbe89294e60))

# [3.4.0](https://github.com/cognizone/ng-cognizone/compare/v3.3.0...v3.4.0) (2023-05-24)

### Features

- **legi-shared:** add custom label handling for most inputs ([a5cb8f5](https://github.com/cognizone/ng-cognizone/commit/a5cb8f57aea5e301e20ce38f6b29ca0807594c3c))

# [3.3.0](https://github.com/cognizone/ng-cognizone/compare/v3.2.0...v3.3.0) (2023-04-27)

### Features

- **ng-core:** added LoadingServiceFactory to ease reuse with defined options ([0194b71](https://github.com/cognizone/ng-cognizone/commit/0194b71088ec3b422301b04ab56e3a0c358f23b7))

# [3.2.0](https://github.com/cognizone/ng-cognizone/compare/v3.1.0...v3.2.0) (2023-04-17)

### Features

- **model-utils:** add pagination to select options provider ([474bf1c](https://github.com/cognizone/ng-cognizone/commit/474bf1cd0448a2fb39f348d6c7a46ec7a3e5d857))

# [3.1.0](https://github.com/cognizone/ng-cognizone/compare/v3.0.2...v3.1.0) (2023-04-07)

### Features

- **legi-shared:** changed default value of updateOnBlur to true for the datepicker ([c6a0efb](https://github.com/cognizone/ng-cognizone/commit/c6a0efb5c8b256848d00171fd19be55439d64e74))
- **ng-core:** add loading scopes ([284c567](https://github.com/cognizone/ng-cognizone/commit/284c5674eea4e91f2aab6eae805f43b7b508e8e7))

## [3.0.2](https://github.com/cognizone/ng-cognizone/compare/v3.0.1...v3.0.2) (2023-03-30)

### Bug Fixes

- **cdk:** fix pure pipe issue needing any instead of unknown ([7240355](https://github.com/cognizone/ng-cognizone/commit/724035544845699bd3a1d1b04e6e9d05b65622ee))

## [3.0.1](https://github.com/cognizone/ng-cognizone/compare/v3.0.0...v3.0.1) (2023-03-29)

### Bug Fixes

- **legi-shared:** handle nullish options provider in select component ([525a4b6](https://github.com/cognizone/ng-cognizone/commit/525a4b6cba418a41012bb2d6def2e343b1f1a13d))

# [3.0.0](https://github.com/cognizone/ng-cognizone/compare/v2.7.7...v3.0.0) (2023-03-21)

### Bug Fixes

- cli build, part 1 ([eb7c71c](https://github.com/cognizone/ng-cognizone/commit/eb7c71c54e4e1c6bd11883066cb27874f0059c2a))
- fixing github actions ([a98818b](https://github.com/cognizone/ng-cognizone/commit/a98818b1da647e352419a46d12f643bc911f81fa))
- peer dependencies part 2 ([2834116](https://github.com/cognizone/ng-cognizone/commit/2834116d4117c366f9c049668e504b24abc9225c))
- peer deps to rxjs accept ^7.0.0 ([3497fbf](https://github.com/cognizone/ng-cognizone/commit/3497fbffa8e6cce985c59045598be426559c8036))
- **cdk:** public publish ([a355bc7](https://github.com/cognizone/ng-cognizone/commit/a355bc74cf48c3d07e52c06c85c99ba0626e3cc7))
- **cli:** generate ap interfaces with optional facets ([e157016](https://github.com/cognizone/ng-cognizone/commit/e157016e68da490cce7368744f9ea1a9ba08998e))
- **cli:** make it build again ([e1b9dd7](https://github.com/cognizone/ng-cognizone/commit/e1b9dd72bee87ce6a2698731985d3263004b756b))
- **i18n:** translate pipe returns string ([c8b8394](https://github.com/cognizone/ng-cognizone/commit/c8b8394a67427a226b7e558ac38eff3a6ef2dad1))
- **json-model:** added nullish checks for or cases ([c50ad99](https://github.com/cognizone/ng-cognizone/commit/c50ad9943f51599739794d58261d532835f2fc77))
- **json-model:** export mappers from lib ([c72b673](https://github.com/cognizone/ng-cognizone/commit/c72b673123740e12c9b815b0610dd125d01f8cfb))
- **json-model:** make sure to use longest uris when compacting ([eadae3e](https://github.com/cognizone/ng-cognizone/commit/eadae3e523a336026be845266cc034e5e9a3723b))
- **json-model:** throw on properties that are neither attribute or reference ([9a70d55](https://github.com/cognizone/ng-cognizone/commit/9a70d55cd02c5d904e2aa2f00c4ad0867cae1780))
- **json-model-graph:** set context on new node creation ([7e8757b](https://github.com/cognizone/ng-cognizone/commit/7e8757b6c2080d430593e954a89bad1ab329c4f6))
- **legi-cv:** make CvService not fail if no providers were given ([f63517b](https://github.com/cognizone/ng-cognizone/commit/f63517b682a73056e8960fbe489e6609e460a32c))
- **legi-shared:** add hint and error to cz-autocomplete-multi ([2a2d1ff](https://github.com/cognizone/ng-cognizone/commit/2a2d1ff8465118689b23e6c74ab9411e80af33f1))
- **legi-shared:** add option to legishared to determine the date-picker icon position ([e8a9f47](https://github.com/cognizone/ng-cognizone/commit/e8a9f47e69162cad04a65fdfc6e0b105dddca313))
- **legi-shared:** add startView input on date picker component ([d68870a](https://github.com/cognizone/ng-cognizone/commit/d68870a2dc940f0046b63fd8549611592c16bc83))
- **legi-shared:** changing class for mat progress spinner and adding mode type ([2872c97](https://github.com/cognizone/ng-cognizone/commit/2872c97347cbc62f226f7c12d976bf09e2f53bfc))
- **legi-shared:** handle number type in cz-input ([d091b7a](https://github.com/cognizone/ng-cognizone/commit/d091b7a4b0ef12a9947a4328d47ba120289bcec3))
- **legi-shared:** show options content of autocomplete multi as innerHTML ([1cec0b0](https://github.com/cognizone/ng-cognizone/commit/1cec0b00b25d37cf0064bc3b7b39b81444ecadc8))
- **ng-application-profile:** added missing export ([7f10b8e](https://github.com/cognizone/ng-cognizone/commit/7f10b8e20240cc0b4d73bfadce2560be2673577b))
- **ng-application-profile:** handle or on datatype ([7310d8e](https://github.com/cognizone/ng-cognizone/commit/7310d8ed079038fa1f2474bb8e55df638dfbc5a7))
- **ng-application-profile:** prevent saving of empty strings ([7aafacf](https://github.com/cognizone/ng-cognizone/commit/7aafacffa9ef24e084b8225e8d734b6b0629d0e9))
- adapt peer dependencies ([56672b7](https://github.com/cognizone/ng-cognizone/commit/56672b74a1b8bad403770e80c86b7c75433719dc))
- adapt peer dependencies to work with npm 7+ ([75ac274](https://github.com/cognizone/ng-cognizone/commit/75ac274ee173bf4d3e78908af747652580b44465))
- adding rxjs everywhere in peer deps because nx add it automatically ([a8c5d1e](https://github.com/cognizone/ng-cognizone/commit/a8c5d1e523024c7ab7f7afe0e9a04423cc460713))
- come on Nx! ([0fcdf4d](https://github.com/cognizone/ng-cognizone/commit/0fcdf4d2d1ff14139878b11f44c8e20cd68e8dc6))
- come on Nx! part 2 ([c29773d](https://github.com/cognizone/ng-cognizone/commit/c29773dc7badea3abc7022fa54d1418d679fd7b1))
- come on Nx! part 3 ([af22ae6](https://github.com/cognizone/ng-cognizone/commit/af22ae6fc858c69c4dabf798c04bd34faa9f35c3))
- issue with ivy builds being enabled for model-utils, ng-core and ng-yasgui ([aded6c5](https://github.com/cognizone/ng-cognizone/commit/aded6c595b6a165fd1532ac821cc42a5b3c7672c))
- peer deps, part 4 ([2dab208](https://github.com/cognizone/ng-cognizone/commit/2dab2087df25e0745c90bdfa3b3e248ca12be881))
- remove lodash-es/set from resource-graph.service ([557af15](https://github.com/cognizone/ng-cognizone/commit/557af15e720b5295647cb2f6292868e139b11f34))
- **legi-shared:** mark component for check on setDisabledState ([f6ba330](https://github.com/cognizone/ng-cognizone/commit/f6ba330e63b359eade80e78d399b66deda7eafc1))
- **model-utils:** accept rxjs 7 ([bb677a8](https://github.com/cognizone/ng-cognizone/commit/bb677a8f0787227c5886fd4737a332e695f9af8f))
- **ng-application-profile:** handle apName in getConcreteType ([6adf6a3](https://github.com/cognizone/ng-cognizone/commit/6adf6a3a04b924e8d326281a3d038a825e2a6b86))
- **ng-application-profile:** handle or with datatype ([1c5311d](https://github.com/cognizone/ng-cognizone/commit/1c5311d0a085b9b00a44e32c2b925b5aae4b0b21))
- trigger release again ([3b094b4](https://github.com/cognizone/ng-cognizone/commit/3b094b467cfe5c41c7b232891bcb537839153141))

### chore

- **json-model-graph:** make the lib independent from Ap ([1640de3](https://github.com/cognizone/ng-cognizone/commit/1640de36b7857c26f96e3dd522620fb3b10fa684))

### Features

- **cdk:** new library, added pureMethod and pureFn pipes ([dd086ee](https://github.com/cognizone/ng-cognizone/commit/dd086ee55114cf87fd6a4a0f8b864a1d9d929d1c))
- **elastic-explorer:** full screen mode feature ([52c69fd](https://github.com/cognizone/ng-cognizone/commit/52c69fd85b0e031fca5748a5d20dd6c926ae5c15)), closes [#T14867](https://github.com/cognizone/ng-cognizone/issues/T14867)
- **elastic-explorer:** update ngx-monaco-editor and applying styles for full screen width ([c3a93e7](https://github.com/cognizone/ng-cognizone/commit/c3a93e7b198be4ade09ca030edd13ba7b808bbb8)), closes [#T14867](https://github.com/cognizone/ng-cognizone/issues/T14867)
- **json-model:** added more capabilities to PrefixCcService ([66cb86e](https://github.com/cognizone/ng-cognizone/commit/66cb86e450b96ef54cc9125f6e21a318ce3d1fe5))
- **json-model:** created dedicated json-model library ([7e07384](https://github.com/cognizone/ng-cognizone/commit/7e073848fe1d4755086102d24178564b2d9f0605))
- **json-model:** handle range of multiple datatypes ([5a327a1](https://github.com/cognizone/ng-cognizone/commit/5a327a1c6269818303c085729195c47f584cd899))
- **json-model:** more adaptations for shacl library ([35e9e51](https://github.com/cognizone/ng-cognizone/commit/35e9e5134815b09138a422d647005cf4108bf0bc))
- **json-model:** smarter default IdGenerator ([dfbfb60](https://github.com/cognizone/ng-cognizone/commit/dfbfb60b34b4ce7f75b7dfca9f934867743b186c))
- **json-model:** use new [@context](https://github.com/context) typed as TypedResourceContext ([a87f8c4](https://github.com/cognizone/ng-cognizone/commit/a87f8c4945e4e8a4a640e8bdf1a36d079e25385d))
- **json-model-graph:** accept undefined referenceUri in setReference ([4b6bba2](https://github.com/cognizone/ng-cognizone/commit/4b6bba2984718a756aabfe6bb8b68e6739c68b9f))
- **json-model-graph:** added innerPath option for linking model to control ([52e6641](https://github.com/cognizone/ng-cognizone/commit/52e6641bed6001fa5adfc63570e4657d2b3b4b9d))
- **json-model-graph:** added option to use czRootUri as a structural directive ([c1009f3](https://github.com/cognizone/ng-cognizone/commit/c1009f3e3c73427ddca18400d91ca0b2a821fa4c))
- **json-model-graph:** introducing GraphFormContextService ([d35dbd4](https://github.com/cognizone/ng-cognizone/commit/d35dbd4f7d8ebd1802ffb2aae73dd9ecacef17d5))
- **json-model-graph:** lazy evaluation of linked graphs ([e69f532](https://github.com/cognizone/ng-cognizone/commit/e69f532800612bcf8872f7eb0ef07b223e62a824))
- **legi-cv:** make it easier to override Concept to SelectOption mapping ([9a33b92](https://github.com/cognizone/ng-cognizone/commit/9a33b925b293027bced114c828d7e2c1fefa4711))
- **legi-shared:** add partial string handling in date-picker ([318723a](https://github.com/cognizone/ng-cognizone/commit/318723af92f0c1b640e28b32bb905dba0b8248f2))
- upgrade angular and nx to 14 ([8cd63f8](https://github.com/cognizone/ng-cognizone/commit/8cd63f87d596dbfe5a12fe39b59e9aa402dce796))
- **legi-shared:** made cz-input and cz-date-picker better suited for validation ([e343f11](https://github.com/cognizone/ng-cognizone/commit/e343f11b8bea06a334980510e3b6417dba5f896d))

### Performance Improvements

- **json-model-graph:** more efficient way to get state snapshot ([e0f6248](https://github.com/cognizone/ng-cognizone/commit/e0f624860175b0794bdf593e1d70261fd224974f))

### BREAKING CHANGES

- **json-model-graph:** removed RootUriDirective:apName, since it was already available from the graph state
- **json-model:** @context is now set as TypedResourceContext, which is more feature-ful than the old type.
  It is expected that the old @context was not used by consumers, it was there for legacy and debugging purposes. This is getting use
  closer to the json-ld spec (but still not there).

## [2.7.7](https://github.com/cognizone/ng-cognizone/compare/v2.7.6...v2.7.7) (2023-02-22)

### Bug Fixes

- **ng-application-profile:** prevent saving of empty strings ([e489e74](https://github.com/cognizone/ng-cognizone/commit/e489e7478551c400b2fbcbf32f9ce97a33fae3f3))

## [2.7.6](https://github.com/cognizone/ng-cognizone/compare/v2.7.5...v2.7.6) (2022-10-06)

### Bug Fixes

- **legi-shared:** changing class for mat progress spinner and adding mode type ([37d01d0](https://github.com/cognizone/ng-cognizone/commit/37d01d0ec644beff238ff13893aa5d3666401717))

## [2.7.5](https://github.com/cognizone/ng-cognizone/compare/v2.7.4...v2.7.5) (2022-05-06)

### Bug Fixes

- **legi-shared:** adding class for autocomplete-multi disabled values ([89b3b4a](https://github.com/cognizone/ng-cognizone/commit/89b3b4a554d8ef71a87b28328ce51eca4fe02f65))

## [2.7.4](https://github.com/cognizone/ng-cognizone/compare/v2.7.3...v2.7.4) (2022-04-06)

### Bug Fixes

- **json-model-graph:** state can now handle circular graphs ([1a003ce](https://github.com/cognizone/ng-cognizone/commit/1a003cee361548680d312187e0b99fe34c175d13))

## [2.7.3](https://github.com/cognizone/ng-cognizone/compare/v2.7.2...v2.7.3) (2022-03-29)

### Bug Fixes

- **legi-shared:** date-picker icon not showing for angular 12+ ([ff57285](https://github.com/cognizone/ng-cognizone/commit/ff57285d88ba92e63c4359ddbd8d6e554093f9f5))

## [2.7.2](https://github.com/cognizone/ng-cognizone/compare/v2.7.1...v2.7.2) (2022-03-25)

### Bug Fixes

- **legi-shared:** adding check for removing disabled options for checkbox group ([d309e30](https://github.com/cognizone/ng-cognizone/commit/d309e30fadba5b07045934397c78cef93d4fdc19))

## [2.7.1](https://github.com/cognizone/ng-cognizone/compare/v2.7.0...v2.7.1) (2022-03-14)

### Bug Fixes

- **legi-cv:** smarter default concept matcher ([fb6a4c6](https://github.com/cognizone/ng-cognizone/commit/fb6a4c6738587a7e61dcf4bbc653fc915bfc4057))

# [3.0.0-beta.49](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.48...v3.0.0-beta.49) (2023-03-16)

### Bug Fixes

- peer dependencies part 2 ([2834116](https://github.com/cognizone/ng-cognizone/commit/2834116d4117c366f9c049668e504b24abc9225c))

# [3.0.0-beta.48](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.47...v3.0.0-beta.48) (2023-03-16)

### Bug Fixes

- peer deps to rxjs accept ^7.0.0 ([3497fbf](https://github.com/cognizone/ng-cognizone/commit/3497fbffa8e6cce985c59045598be426559c8036))

# [3.0.0-beta.47](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.46...v3.0.0-beta.47) (2023-03-16)

### Bug Fixes

- cli build, part 1 ([eb7c71c](https://github.com/cognizone/ng-cognizone/commit/eb7c71c54e4e1c6bd11883066cb27874f0059c2a))
- fixing github actions ([a98818b](https://github.com/cognizone/ng-cognizone/commit/a98818b1da647e352419a46d12f643bc911f81fa))

# [3.0.0-beta.46](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.45...v3.0.0-beta.46) (2023-03-16)

### Bug Fixes

- **cdk:** public publish ([a355bc7](https://github.com/cognizone/ng-cognizone/commit/a355bc74cf48c3d07e52c06c85c99ba0626e3cc7))

# [3.0.0-beta.45](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.44...v3.0.0-beta.45) (2023-03-16)

### Features

- **cdk:** new library, added pureMethod and pureFn pipes ([dd086ee](https://github.com/cognizone/ng-cognizone/commit/dd086ee55114cf87fd6a4a0f8b864a1d9d929d1c))

# [3.0.0-beta.44](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.43...v3.0.0-beta.44) (2023-02-22)

### Bug Fixes

- **ng-application-profile:** prevent saving of empty strings ([7aafacf](https://github.com/cognizone/ng-cognizone/commit/7aafacffa9ef24e084b8225e8d734b6b0629d0e9))

# [3.0.0-beta.43](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.42...v3.0.0-beta.43) (2023-01-23)

### Features

- **legi-shared:** add partial string handling in date-picker ([318723a](https://github.com/cognizone/ng-cognizone/commit/318723af92f0c1b640e28b32bb905dba0b8248f2))

# [3.0.0-beta.42](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.41...v3.0.0-beta.42) (2022-12-06)

### Bug Fixes

- **cli:** generate ap interfaces with optional facets ([e157016](https://github.com/cognizone/ng-cognizone/commit/e157016e68da490cce7368744f9ea1a9ba08998e))

# [3.0.0-beta.41](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.40...v3.0.0-beta.41) (2022-11-29)

### Bug Fixes

- **legi-shared:** add startView input on date picker component ([d68870a](https://github.com/cognizone/ng-cognizone/commit/d68870a2dc940f0046b63fd8549611592c16bc83))

# [3.0.0-beta.40](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.39...v3.0.0-beta.40) (2022-11-28)

### Features

- **elastic-explorer:** update ngx-monaco-editor and applying styles for full screen width ([c3a93e7](https://github.com/cognizone/ng-cognizone/commit/c3a93e7b198be4ade09ca030edd13ba7b808bbb8)), closes [#T14867](https://github.com/cognizone/ng-cognizone/issues/T14867)

# [3.0.0-beta.39](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.38...v3.0.0-beta.39) (2022-11-28)

### Bug Fixes

- adapt peer dependencies to work with npm 7+ ([75ac274](https://github.com/cognizone/ng-cognizone/commit/75ac274ee173bf4d3e78908af747652580b44465))

# [3.0.0-beta.38](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.37...v3.0.0-beta.38) (2022-11-21)

### Features

- **legi-cv:** make it easier to override Concept to SelectOption mapping ([9a33b92](https://github.com/cognizone/ng-cognizone/commit/9a33b925b293027bced114c828d7e2c1fefa4711))

# [3.0.0-beta.37](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.36...v3.0.0-beta.37) (2022-11-18)

### Features

- **json-model-graph:** added option to use czRootUri as a structural directive ([c1009f3](https://github.com/cognizone/ng-cognizone/commit/c1009f3e3c73427ddca18400d91ca0b2a821fa4c))

# [3.0.0-beta.36](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.35...v3.0.0-beta.36) (2022-11-17)

### Bug Fixes

- **cli:** make it build again ([e1b9dd7](https://github.com/cognizone/ng-cognizone/commit/e1b9dd72bee87ce6a2698731985d3263004b756b))

# [3.0.0-beta.35](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.34...v3.0.0-beta.35) (2022-11-17)

### Features

- **elastic-explorer:** full screen mode feature ([52c69fd](https://github.com/cognizone/ng-cognizone/commit/52c69fd85b0e031fca5748a5d20dd6c926ae5c15)), closes [#T14867](https://github.com/cognizone/ng-cognizone/issues/T14867)

# [3.0.0-beta.34](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.33...v3.0.0-beta.34) (2022-11-08)

### Bug Fixes

- **legi-shared:** show options content of autocomplete multi as innerHTML ([1cec0b0](https://github.com/cognizone/ng-cognizone/commit/1cec0b00b25d37cf0064bc3b7b39b81444ecadc8))

# [3.0.0-beta.33](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.32...v3.0.0-beta.33) (2022-11-04)

### Bug Fixes

- **legi-shared:** add hint and error to cz-autocomplete-multi ([2a2d1ff](https://github.com/cognizone/ng-cognizone/commit/2a2d1ff8465118689b23e6c74ab9411e80af33f1))

# [3.0.0-beta.32](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.31...v3.0.0-beta.32) (2022-11-02)

### Bug Fixes

- **json-model:** make sure to use longest uris when compacting ([eadae3e](https://github.com/cognizone/ng-cognizone/commit/eadae3e523a336026be845266cc034e5e9a3723b))

# [3.0.0-beta.31](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.30...v3.0.0-beta.31) (2022-10-06)

### Bug Fixes

- **legi-shared:** changing class for mat progress spinner and adding mode type ([2872c97](https://github.com/cognizone/ng-cognizone/commit/2872c97347cbc62f226f7c12d976bf09e2f53bfc))

# [3.0.0-beta.30](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.29...v3.0.0-beta.30) (2022-10-06)

### Bug Fixes

- **legi-shared:** add option to legishared to determine the date-picker icon position ([e8a9f47](https://github.com/cognizone/ng-cognizone/commit/e8a9f47e69162cad04a65fdfc6e0b105dddca313))

# [3.0.0-beta.29](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.28...v3.0.0-beta.29) (2022-10-06)

### Bug Fixes

- **json-model:** added nullish checks for or cases ([c50ad99](https://github.com/cognizone/ng-cognizone/commit/c50ad9943f51599739794d58261d532835f2fc77))

# [3.0.0-beta.28](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.27...v3.0.0-beta.28) (2022-09-27)

### Bug Fixes

- **ng-application-profile:** handle or on datatype ([7310d8e](https://github.com/cognizone/ng-cognizone/commit/7310d8ed079038fa1f2474bb8e55df638dfbc5a7))

# [3.0.0-beta.27](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.26...v3.0.0-beta.27) (2022-09-23)

### Bug Fixes

- **ng-application-profile:** added missing export ([7f10b8e](https://github.com/cognizone/ng-cognizone/commit/7f10b8e20240cc0b4d73bfadce2560be2673577b))

# [3.0.0-beta.26](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.25...v3.0.0-beta.26) (2022-09-21)

### Features

- **json-model:** handle range of multiple datatypes ([5a327a1](https://github.com/cognizone/ng-cognizone/commit/5a327a1c6269818303c085729195c47f584cd899))

# [3.0.0-beta.25](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.24...v3.0.0-beta.25) (2022-09-02)

### Performance Improvements

- **json-model-graph:** more efficient way to get state snapshot ([e0f6248](https://github.com/cognizone/ng-cognizone/commit/e0f624860175b0794bdf593e1d70261fd224974f))

# [3.0.0-beta.24](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.23...v3.0.0-beta.24) (2022-09-01)

### Bug Fixes

- come on Nx! part 3 ([af22ae6](https://github.com/cognizone/ng-cognizone/commit/af22ae6fc858c69c4dabf798c04bd34faa9f35c3))

# [3.0.0-beta.23](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.22...v3.0.0-beta.23) (2022-09-01)

### Bug Fixes

- come on Nx! part 2 ([c29773d](https://github.com/cognizone/ng-cognizone/commit/c29773dc7badea3abc7022fa54d1418d679fd7b1))

# [3.0.0-beta.22](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.21...v3.0.0-beta.22) (2022-09-01)

### Bug Fixes

- come on Nx! ([0fcdf4d](https://github.com/cognizone/ng-cognizone/commit/0fcdf4d2d1ff14139878b11f44c8e20cd68e8dc6))

# [3.0.0-beta.21](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.20...v3.0.0-beta.21) (2022-09-01)

### Bug Fixes

- issue with ivy builds being enabled for model-utils, ng-core and ng-yasgui ([aded6c5](https://github.com/cognizone/ng-cognizone/commit/aded6c595b6a165fd1532ac821cc42a5b3c7672c))

# [3.0.0-beta.20](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.19...v3.0.0-beta.20) (2022-09-01)

### Features

- upgrade angular and nx to 14 ([8cd63f8](https://github.com/cognizone/ng-cognizone/commit/8cd63f87d596dbfe5a12fe39b59e9aa402dce796))

# [3.0.0-beta.19](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.18...v3.0.0-beta.19) (2022-08-23)

### Bug Fixes

- remove lodash-es/set from resource-graph.service ([557af15](https://github.com/cognizone/ng-cognizone/commit/557af15e720b5295647cb2f6292868e139b11f34))

# [3.0.0-beta.18](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.17...v3.0.0-beta.18) (2022-08-19)

### Features

- **json-model-graph:** lazy evaluation of linked graphs ([e69f532](https://github.com/cognizone/ng-cognizone/commit/e69f532800612bcf8872f7eb0ef07b223e62a824))

# [3.0.0-beta.17](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.16...v3.0.0-beta.17) (2022-08-11)

### Bug Fixes

- **json-model-graph:** set context on new node creation ([7e8757b](https://github.com/cognizone/ng-cognizone/commit/7e8757b6c2080d430593e954a89bad1ab329c4f6))

# [3.0.0-beta.16](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.15...v3.0.0-beta.16) (2022-08-10)

### Bug Fixes

- **json-model:** export mappers from lib ([c72b673](https://github.com/cognizone/ng-cognizone/commit/c72b673123740e12c9b815b0610dd125d01f8cfb))

# [3.0.0-beta.15](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.14...v3.0.0-beta.15) (2022-08-01)

### Bug Fixes

- **json-model:** throw on properties that are neither attribute or reference ([9a70d55](https://github.com/cognizone/ng-cognizone/commit/9a70d55cd02c5d904e2aa2f00c4ad0867cae1780))

# [3.0.0-beta.14](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.13...v3.0.0-beta.14) (2022-07-07)

### Bug Fixes

- peer deps, part 4 ([2dab208](https://github.com/cognizone/ng-cognizone/commit/2dab2087df25e0745c90bdfa3b3e248ca12be881))

### Reverts

- Revert "fix: peer deps, part 3" ([cb7a0c5](https://github.com/cognizone/ng-cognizone/commit/cb7a0c5518aa0b579a6d759d3c9134161d5224f3))

# [3.0.0-beta.13](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.12...v3.0.0-beta.13) (2022-07-07)

### Bug Fixes

- peer deps, part 3 ([538808e](https://github.com/cognizone/ng-cognizone/commit/538808e9d4390a97ead56d1585d1c2e837403cf2))

# [3.0.0-beta.12](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.11...v3.0.0-beta.12) (2022-07-07)

### Bug Fixes

- adding rxjs everywhere in peer deps because nx add it automatically ([a8c5d1e](https://github.com/cognizone/ng-cognizone/commit/a8c5d1e523024c7ab7f7afe0e9a04423cc460713))

# [3.0.0-beta.11](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.10...v3.0.0-beta.11) (2022-07-07)

### Bug Fixes

- adapt peer dependencies ([56672b7](https://github.com/cognizone/ng-cognizone/commit/56672b74a1b8bad403770e80c86b7c75433719dc))

# [3.0.0-beta.10](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.9...v3.0.0-beta.10) (2022-07-06)

### Bug Fixes

- **legi-shared:** mark component for check on setDisabledState ([f6ba330](https://github.com/cognizone/ng-cognizone/commit/f6ba330e63b359eade80e78d399b66deda7eafc1))

# [3.0.0-beta.9](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.8...v3.0.0-beta.9) (2022-06-27)

### Bug Fixes

- **ng-application-profile:** handle or with datatype ([1c5311d](https://github.com/cognizone/ng-cognizone/commit/1c5311d0a085b9b00a44e32c2b925b5aae4b0b21))

# [3.0.0-beta.8](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2022-06-24)

### Bug Fixes

- **ng-application-profile:** handle apName in getConcreteType ([6adf6a3](https://github.com/cognizone/ng-cognizone/commit/6adf6a3a04b924e8d326281a3d038a825e2a6b86))

# [3.0.0-beta.7](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2022-06-20)

### Features

- **json-model-graph:** added innerPath option for linking model to control ([52e6641](https://github.com/cognizone/ng-cognizone/commit/52e6641bed6001fa5adfc63570e4657d2b3b4b9d))

# [3.0.0-beta.6](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2022-05-03)

### Bug Fixes

- **model-utils:** accept rxjs 7 ([bb677a8](https://github.com/cognizone/ng-cognizone/commit/bb677a8f0787227c5886fd4737a332e695f9af8f))

# [3.0.0-beta.5](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2022-05-03)

### Bug Fixes

- **i18n:** translate pipe returns string ([c8b8394](https://github.com/cognizone/ng-cognizone/commit/c8b8394a67427a226b7e558ac38eff3a6ef2dad1))
- **legi-shared:** handle number type in cz-input ([d091b7a](https://github.com/cognizone/ng-cognizone/commit/d091b7a4b0ef12a9947a4328d47ba120289bcec3))

### Features

- **json-model:** smarter default IdGenerator ([dfbfb60](https://github.com/cognizone/ng-cognizone/commit/dfbfb60b34b4ce7f75b7dfca9f934867743b186c))
- **json-model-graph:** accept undefined referenceUri in setReference ([4b6bba2](https://github.com/cognizone/ng-cognizone/commit/4b6bba2984718a756aabfe6bb8b68e6739c68b9f))

# [3.0.0-beta.4](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2022-04-11)

### Bug Fixes

- **legi-cv:** make CvService not fail if no providers were given ([f63517b](https://github.com/cognizone/ng-cognizone/commit/f63517b682a73056e8960fbe489e6609e460a32c))

### Features

- **json-model:** more adaptations for shacl library ([35e9e51](https://github.com/cognizone/ng-cognizone/commit/35e9e5134815b09138a422d647005cf4108bf0bc))
- **json-model-graph:** introducing GraphFormContextService ([d35dbd4](https://github.com/cognizone/ng-cognizone/commit/d35dbd4f7d8ebd1802ffb2aae73dd9ecacef17d5))
- **legi-shared:** made cz-input and cz-date-picker better suited for validation ([e343f11](https://github.com/cognizone/ng-cognizone/commit/e343f11b8bea06a334980510e3b6417dba5f896d))

# [3.0.0-beta.3](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2022-02-14)

### Features

- **elastic explorer:** adding documentation for cognizone elastic explorer[#10560](https://github.com/cognizone/ng-cognizone/issues/10560) ([a254cc7](https://github.com/cognizone/ng-cognizone/commit/a254cc716dd2402455da1678055cb0371977a154))

# [3.0.0-beta.2](https://github.com/cognizone/ng-cognizone/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2022-02-14)

### chore

- **json-model-graph:** make the lib independent from Ap ([1640de3](https://github.com/cognizone/ng-cognizone/commit/1640de36b7857c26f96e3dd522620fb3b10fa684))

### BREAKING CHANGES

- **json-model-graph:** removed RootUriDirective:apName, since it was already available from the graph state

# [3.0.0-beta.1](https://github.com/cognizone/ng-cognizone/compare/v2.7.0-beta.2...v3.0.0-beta.1) (2022-02-14)

### Features

- **json-model:** added more capabilities to PrefixCcService ([66cb86e](https://github.com/cognizone/ng-cognizone/commit/66cb86e450b96ef54cc9125f6e21a318ce3d1fe5))
- **json-model:** use new [@context](https://github.com/context) typed as TypedResourceContext ([a87f8c4](https://github.com/cognizone/ng-cognizone/commit/a87f8c4945e4e8a4a640e8bdf1a36d079e25385d))

### BREAKING CHANGES

- **json-model:** @context is now set as TypedResourceContext, which is more feature-ful than the old type.
  It is expected that the old @context was not used by consumers, it was there for legacy and debugging purposes. This is getting use
  closer to the json-ld spec (but still not there).

# [2.7.0-beta.2](https://github.com/cognizone/ng-cognizone/compare/v2.7.0-beta.1...v2.7.0-beta.2) (2022-02-01)

# [2.7.0-beta.1](https://github.com/cognizone/ng-cognizone/compare/v2.6.5...v2.7.0-beta.1) (2022-02-01)

- **json-model:** created dedicated json-model library ([7e07384](https://github.com/cognizone/ng-cognizone/commit/7e073848fe1d4755086102d24178564b2d9f0605))

# [2.7.0](https://github.com/cognizone/ng-cognizone/compare/v2.6.5...v2.7.0) (2022-02-14)

### Features

- **elastic explorer:** adding documentation for cognizone elastic explorer[#10560](https://github.com/cognizone/ng-cognizone/issues/10560) ([a254cc7](https://github.com/cognizone/ng-cognizone/commit/a254cc716dd2402455da1678055cb0371977a154))

## [2.6.5](https://github.com/cognizone/ng-cognizone/compare/v2.6.4...v2.6.5) (2022-01-24)

### Bug Fixes

- correctly set peer dependencies for all libs ([8d0eef2](https://github.com/cognizone/ng-cognizone/commit/8d0eef26c53209ae95f6f32d5831abf04e565d21))

## [2.6.4](https://github.com/cognizone/ng-cognizone/compare/v2.6.3...v2.6.4) (2022-01-06)

### Bug Fixes

- **model-utils:** add nullish check to manyToArray ([451b1e3](https://github.com/cognizone/ng-cognizone/commit/451b1e3ac0ba953337280bb9e77e769faf3a83e1))

## [2.6.3](https://github.com/cognizone/ng-cognizone/compare/v2.6.2...v2.6.3) (2022-01-04)

### Bug Fixes

- **i18n:** added missing fallbackLangs as argument ([6ffabf6](https://github.com/cognizone/ng-cognizone/commit/6ffabf6de60f3c7fbade87d3c1ce5e2144cce015))

## [2.6.2](https://github.com/cognizone/ng-cognizone/compare/v2.6.1...v2.6.2) (2022-01-04)

### Bug Fixes

- **model-utils:** remove "first lang found" fallback from czLabelToString ([428a85b](https://github.com/cognizone/ng-cognizone/commit/428a85b219e110cd1ab9a73bcdfca343251029fa))

## [2.6.1](https://github.com/cognizone/ng-cognizone/compare/v2.6.0...v2.6.1) (2021-12-22)

### Bug Fixes

- **elastic-explorer:** doc details available again ([7cc43b8](https://github.com/cognizone/ng-cognizone/commit/7cc43b855bfc80056cfd87050478f4ceadb157e8))

# [2.6.0](https://github.com/cognizone/ng-cognizone/compare/v2.5.2...v2.6.0) (2021-12-21)

### Features

- **elastic-explorer:** data validation ui ([077a44f](https://github.com/cognizone/ng-cognizone/commit/077a44f0664bc15d66a7efcc9a66c7936fa641c0))

## [2.5.2](https://github.com/cognizone/ng-cognizone/compare/v2.5.1...v2.5.2) (2021-12-15)

### Bug Fixes

- **legi-shared:** add possibility for custom tooltip on autocomplete-single ([63c1b8e](https://github.com/cognizone/ng-cognizone/commit/63c1b8e9eec4401333782f27e754829f10eb4422))

## [2.5.1](https://github.com/cognizone/ng-cognizone/compare/v2.5.0...v2.5.1) (2021-11-18)

### Bug Fixes

- **legi-shared:** added selectionChange output to cz-select ([652a6e3](https://github.com/cognizone/ng-cognizone/commit/652a6e3feabff3416c1e6672fc50c4e479dd9747))

# [2.5.0](https://github.com/cognizone/ng-cognizone/compare/v2.4.3...v2.5.0) (2021-11-05)

### Bug Fixes

- **legi-shared:** added blur & focus for cz-input ([c0fbd04](https://github.com/cognizone/ng-cognizone/commit/c0fbd0485cfc94e76976246a72d98d58c21213ce))

### Features

- **elastic-explorer:** add data validator ([6cdddf3](https://github.com/cognizone/ng-cognizone/commit/6cdddf383b719ce12f025f349c9e7fb6035a9040))
- **elastic-explorer:** view types & local search ([8fcc172](https://github.com/cognizone/ng-cognizone/commit/8fcc1721920a75b8e76afaf14b427410d95520a3))

## [2.4.3](https://github.com/cognizone/ng-cognizone/compare/v2.4.2...v2.4.3) (2021-10-19)

### Bug Fixes

- **legi-shared:** remove duplicating option in radio-group ([5fddfee](https://github.com/cognizone/ng-cognizone/commit/5fddfeeccabda9cfbae49cd5ce686be3a8a55e57))

## [2.4.2](https://github.com/cognizone/ng-cognizone/compare/v2.4.1...v2.4.2) (2021-10-08)

### Bug Fixes

- **model-utils:** removed AnyObject model in favor of UnknownObject ([c5b3f22](https://github.com/cognizone/ng-cognizone/commit/c5b3f22664771d8a08f4628c821b85f91610da6a))

## [2.4.1](https://github.com/cognizone/ng-cognizone/compare/v2.4.0...v2.4.1) (2021-10-05)

### Bug Fixes

- **elastic-explorer:** keep some attributes when filtering ([6d8fed4](https://github.com/cognizone/ng-cognizone/commit/6d8fed4213dd212b2d1b43961355300d155ab96f))
- **elastic-explorer-chrome-extension:** make it work again with angular 12 ([e30cd49](https://github.com/cognizone/ng-cognizone/commit/e30cd49d868954c9ac960595fea0a213fa39e703))
- **i18n:** added the pipes to exported modules ([7e8f863](https://github.com/cognizone/ng-cognizone/commit/7e8f8631e1d05bc3ee089ca67cf86c9888217a37))

# [2.4.0](https://github.com/cognizone/ng-cognizone/compare/v2.3.2...v2.4.0) (2021-09-23)

### Features

- **i18n:** adding missing locale handling ([684936e](https://github.com/cognizone/ng-cognizone/commit/684936e3fe9dfaf82e15b70536dea6a4d2b1f1bb))

## [2.3.2](https://github.com/cognizone/ng-cognizone/compare/v2.3.1...v2.3.2) (2021-09-17)

### Bug Fixes

- **cli:** better sort-ap, handles imports ([570ef78](https://github.com/cognizone/ng-cognizone/commit/570ef78e6d46ca46ffc31be10904b9ad6b03c351))

## [2.3.1](https://github.com/cognizone/ng-cognizone/compare/v2.3.0...v2.3.1) (2021-09-09)

### Bug Fixes

- **application-profile:** better logging of issues ([95f8b8e](https://github.com/cognizone/ng-cognizone/commit/95f8b8e6eb4c16b52dabecf29c258d627cb96a22))
- **legi-cv:** more lenient way to detect Concept ([47ab834](https://github.com/cognizone/ng-cognizone/commit/47ab83480adb3d68b28aec661ea96d69acba2a03))

# [2.3.0](https://github.com/cognizone/ng-cognizone/compare/v2.2.0...v2.3.0) (2021-09-01)

### Features

- updated to angular 12, but not shipping ivy yet ([c9a4052](https://github.com/cognizone/ng-cognizone/commit/c9a405298d3e4a8206003d3d18200442e6877d23))

# [2.2.0](https://github.com/cognizone/ng-cognizone/compare/v2.1.11...v2.2.0) (2021-08-31)

### Features

- **cz-cli:** added sorting and validation commands for Ap ([e385757](https://github.com/cognizone/ng-cognizone/commit/e3857571f4ba1cadb5d18b7c581ea751343a83df))
- **elastic-explorer:** more lenient uri filter ([a81d14e](https://github.com/cognizone/ng-cognizone/commit/a81d14e54be3eebcf4eb58008868dd33d5e85183))

## [2.1.11](https://github.com/cognizone/ng-cognizone/compare/v2.1.10...v2.1.11) (2021-08-24)

### Bug Fixes

- **legi-cv:** migrated from transloco to I18nService ([2f3e978](https://github.com/cognizone/ng-cognizone/commit/2f3e97823581df492be8aa8d72b3d634f96ee584))
- **legi-shared:** migrated from transloco to I18nService ([e609f9b](https://github.com/cognizone/ng-cognizone/commit/e609f9b6e14e36c1e40b0bcafabb4b4d6ecf8ae0))

## [2.1.10](https://github.com/cognizone/ng-cognizone/compare/v2.1.9...v2.1.10) (2021-08-11)

### Bug Fixes

- styling of mat components ([1dbd7a4](https://github.com/cognizone/ng-cognizone/commit/1dbd7a43cce07682ca25216c6ee19dcd43ebab04))

## [2.1.9](https://github.com/cognizone/ng-cognizone/compare/v2.1.8...v2.1.9) (2021-08-10)

### Bug Fixes

- correct use of control in cz-error ([c339d65](https://github.com/cognizone/ng-cognizone/commit/c339d650480506273a1615b37a332dbe7dcb4c42))

## [2.1.8](https://github.com/cognizone/ng-cognizone/compare/v2.1.7...v2.1.8) (2021-08-09)

### Bug Fixes

- stricter check for reference linking ([983122e](https://github.com/cognizone/ng-cognizone/commit/983122ebed3fa83a66c2285d2b455eda9c5e3f4a))

## [2.1.7](https://github.com/cognizone/ng-cognizone/compare/v2.1.6...v2.1.7) (2021-08-09)

### Bug Fixes

- better spacing for mat-error ([09fd742](https://github.com/cognizone/ng-cognizone/commit/09fd74275dfbf8256dfb7d87300df450cadebbae))

## [2.1.6](https://github.com/cognizone/ng-cognizone/compare/v2.1.5...v2.1.6) (2021-08-05)

### Bug Fixes

- accept "/" as last delimiting charater for rdf types uris ([c0d5154](https://github.com/cognizone/ng-cognizone/commit/c0d51548d1a75f695ffa1de540ade0b790af695b))

## [2.1.5](https://github.com/cognizone/ng-cognizone/compare/v2.1.4...v2.1.5) (2021-08-04)

### Bug Fixes

- discard null values whenever possible in favor of undefined ([c8be24b](https://github.com/cognizone/ng-cognizone/commit/c8be24b80792632137f84ff4e86c1079f28f2b9d))

## [2.1.4](https://github.com/cognizone/ng-cognizone/compare/v2.1.3...v2.1.4) (2021-08-03)

### Bug Fixes

- correct name computation in czNodeAttributeLinked directive ([1a2de0d](https://github.com/cognizone/ng-cognizone/commit/1a2de0d4dfb24b5b83f13bdc5a2947bfcf5f4da8))

## [2.1.3](https://github.com/cognizone/ng-cognizone/compare/v2.1.2...v2.1.3) (2021-08-02)

### Bug Fixes

- adapted peer deps ([04444ba](https://github.com/cognizone/ng-cognizone/commit/04444ba40d45efa5a79352ee3a7febf1b7e7d40f))

## [2.1.2](https://github.com/cognizone/ng-cognizone/compare/v2.1.1...v2.1.2) (2021-08-02)

### Bug Fixes

- added @cognizone/tslint-config ([7e9148e](https://github.com/cognizone/ng-cognizone/commit/7e9148ebfa0d85cfa6d7dadd80d4ecb40b1e5a37))

## [2.1.1](https://github.com/cognizone/ng-cognizone/compare/v2.1.0...v2.1.1) (2021-08-02)

### Bug Fixes

- added @cognizone/eslint-config ([47cb636](https://github.com/cognizone/ng-cognizone/commit/47cb6364a78221af9a6050a753f776a3be2d4af2))
- added @cognizone/prettier ([cb3ad28](https://github.com/cognizone/ng-cognizone/commit/cb3ad285695ec30b8931eedb453bc77f6a7646db))

# [2.1.0](https://github.com/cognizone/ng-cognizone/compare/v2.0.3...v2.1.0) (2021-07-28)

### Bug Fixes

- deprecating @cognizone/transloco-langstring ([3c60e42](https://github.com/cognizone/ng-cognizone/commit/3c60e42c6293f4e3a0d717e9796e0af7605ece9e))
- **legi-shared:** renamed legacy theme to classic ([9089b56](https://github.com/cognizone/ng-cognizone/commit/9089b566cb8305ce201bc44972b64e3e4e2684e2))
- replaced I18nService from legi-shared with the one from the i18n lib ([c230b09](https://github.com/cognizone/ng-cognizone/commit/c230b099af37aa6ef247a18f3592faf5c845f364))

### Features

- added i18n and i18n-transloco libraries ([b212fae](https://github.com/cognizone/ng-cognizone/commit/b212fae4c755f622852d4ed0d1269d73be7f7528))

# [2.1.0-beta.4](https://github.com/cognizone/ng-cognizone/compare/v2.1.0-beta.3...v2.1.0-beta.4) (2021-07-27)

### Bug Fixes

- deprecating @cognizone/transloco-langstring ([3c60e42](https://github.com/cognizone/ng-cognizone/commit/3c60e42c6293f4e3a0d717e9796e0af7605ece9e))

# [2.1.0-beta.3](https://github.com/cognizone/ng-cognizone/compare/v2.1.0-beta.2...v2.1.0-beta.3) (2021-07-27)

### Bug Fixes

- **legi-shared:** renamed legacy theme to classic ([9089b56](https://github.com/cognizone/ng-cognizone/commit/9089b566cb8305ce201bc44972b64e3e4e2684e2))

# [2.1.0-beta.2](https://github.com/cognizone/ng-cognizone/compare/v2.1.0-beta.1...v2.1.0-beta.2) (2021-07-27)

### Bug Fixes

- replaced I18nService from legi-shared with the one from the i18n lib ([c230b09](https://github.com/cognizone/ng-cognizone/commit/c230b099af37aa6ef247a18f3592faf5c845f364))

# [2.1.0-beta.1](https://github.com/cognizone/ng-cognizone/compare/v2.0.3...v2.1.0-beta.1) (2021-07-27)

### Features

- added i18n and i18n-transloco libraries ([b212fae](https://github.com/cognizone/ng-cognizone/commit/b212fae4c755f622852d4ed0d1269d73be7f7528))

## [2.0.3](https://github.com/cognizone/ng-cognizone/compare/v2.0.2...v2.0.3) (2021-07-26)

### Bug Fixes

- export LegalTaxonomy model ([90b17a7](https://github.com/cognizone/ng-cognizone/commit/90b17a78b8c5355ea82713ded815c1da85f983a0))

## [2.0.2](https://github.com/cognizone/ng-cognizone/compare/v2.0.1...v2.0.2) (2021-07-26)

### Bug Fixes

- **cli:** remove scripts in published package.json ([af5b42a](https://github.com/cognizone/ng-cognizone/commit/af5b42a9ea13f70159c23efd6768a7735b7bd0d9))

## [2.0.1](https://github.com/cognizone/ng-cognizone/compare/v2.0.0...v2.0.1) (2021-07-26)

### Bug Fixes

- dummy commit for first real release ([e5fafac](https://github.com/cognizone/ng-cognizone/commit/e5fafac1ee95e20c658aa967fb2034f6032faa09))
