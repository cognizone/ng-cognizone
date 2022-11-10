cz-cli
=================

cz-cli

<!-- [![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json) -->

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @cognizone/cli
$ cz-cli COMMAND
running command...
$ cz-cli (--version)
@cognizone/cli/0.0.0 darwin-arm64 node-v16.18.1
$ cz-cli --help [COMMAND]
USAGE
  $ cz-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cz-cli create-ap-types`](#cz-cli-create-ap-types)
* [`cz-cli help [COMMAND]`](#cz-cli-help-command)
* [`cz-cli plugins`](#cz-cli-plugins)
* [`cz-cli plugins:install PLUGIN...`](#cz-cli-pluginsinstall-plugin)
* [`cz-cli plugins:inspect PLUGIN...`](#cz-cli-pluginsinspect-plugin)
* [`cz-cli plugins:install PLUGIN...`](#cz-cli-pluginsinstall-plugin-1)
* [`cz-cli plugins:link PLUGIN`](#cz-cli-pluginslink-plugin)
* [`cz-cli plugins:uninstall PLUGIN...`](#cz-cli-pluginsuninstall-plugin)
* [`cz-cli plugins:uninstall PLUGIN...`](#cz-cli-pluginsuninstall-plugin-1)
* [`cz-cli plugins:uninstall PLUGIN...`](#cz-cli-pluginsuninstall-plugin-2)
* [`cz-cli plugins update`](#cz-cli-plugins-update)
* [`cz-cli sort-ap PATH`](#cz-cli-sort-ap-path)
* [`cz-cli validate-ap PATH`](#cz-cli-validate-ap-path)

## `cz-cli create-ap-types`

create types from an application profile

```
USAGE
  $ cz-cli create-ap-types [-h] [--init] [--verbose] [--apName <value>]

FLAGS
  -h, --help           Show CLI help.
  --apName=<value>...
  --init
  --verbose

DESCRIPTION
  create types from an application profile

EXAMPLES
  $ cz-cli create-ap-types
```

_See code: [dist/commands/create-ap-types.ts](https://github.com/cognizone/ng-cognizone/blob/v0.0.0/dist/commands/create-ap-types.ts)_

## `cz-cli help [COMMAND]`

Display help for cz-cli.

```
USAGE
  $ cz-cli help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for cz-cli.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.17/src/commands/help.ts)_

## `cz-cli plugins`

List installed plugins.

```
USAGE
  $ cz-cli plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ cz-cli plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.6/src/commands/plugins/index.ts)_

## `cz-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cz-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ cz-cli plugins add

EXAMPLES
  $ cz-cli plugins:install myplugin 

  $ cz-cli plugins:install https://github.com/someuser/someplugin

  $ cz-cli plugins:install someuser/someplugin
```

## `cz-cli plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ cz-cli plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ cz-cli plugins:inspect myplugin
```

## `cz-cli plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ cz-cli plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ cz-cli plugins add

EXAMPLES
  $ cz-cli plugins:install myplugin 

  $ cz-cli plugins:install https://github.com/someuser/someplugin

  $ cz-cli plugins:install someuser/someplugin
```

## `cz-cli plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ cz-cli plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ cz-cli plugins:link myplugin
```

## `cz-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cz-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cz-cli plugins unlink
  $ cz-cli plugins remove
```

## `cz-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cz-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cz-cli plugins unlink
  $ cz-cli plugins remove
```

## `cz-cli plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ cz-cli plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ cz-cli plugins unlink
  $ cz-cli plugins remove
```

## `cz-cli plugins update`

Update installed plugins.

```
USAGE
  $ cz-cli plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `cz-cli sort-ap PATH`

create an angular library

```
USAGE
  $ cz-cli sort-ap [PATH] [-h]

ARGUMENTS
  PATH  path to the raw application profile json file

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  create an angular library

EXAMPLES
  $ cz-cli create-ng-library
```

_See code: [dist/commands/sort-ap.ts](https://github.com/cognizone/ng-cognizone/blob/v0.0.0/dist/commands/sort-ap.ts)_

## `cz-cli validate-ap PATH`

run some validations checks on given application profile(s)

```
USAGE
  $ cz-cli validate-ap [PATH] [-h]

ARGUMENTS
  PATH  path to the raw application profile json file

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  run some validations checks on given application profile(s)

EXAMPLES
  $ cz-cli validate-ap path/to/ap.json
```

_See code: [dist/commands/validate-ap.ts](https://github.com/cognizone/ng-cognizone/blob/v0.0.0/dist/commands/validate-ap.ts)_
<!-- commandsstop -->
