# @cognizone/cli

a cool cli for cool people

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

<!-- toc -->

- [@cognizone/cli](#cognizonecli)
- [Usage](#usage)
- [Commands](#commands)
  - [`cz-cli add-linting`](#cz-cli-add-linting)
  - [`cz-cli create-ap-types`](#cz-cli-create-ap-types)
  - [`cz-cli create-ng-library`](#cz-cli-create-ng-library)
  - [`cz-cli help [COMMAND]`](#cz-cli-help-command)
  - [`cz-cli ng-adapt-project`](#cz-cli-ng-adapt-project)

# Usage

<!-- usage -->

```sh-session
$ npm install -g @cognizone/cli
$ cz-cli COMMAND
running command...
$ cz-cli (-v|--version|version)
@cognizone/cli/1.6.0 win32-x64 node-v14.15.5
$ cz-cli --help [COMMAND]
USAGE
  $ cz-cli COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [@cognizone/cli](#cognizonecli)
- [Usage](#usage)
- [Commands](#commands)
  - [`cz-cli add-linting`](#cz-cli-add-linting)
  - [`cz-cli create-ap-types`](#cz-cli-create-ap-types)
  - [`cz-cli create-ng-library`](#cz-cli-create-ng-library)
  - [`cz-cli help [COMMAND]`](#cz-cli-help-command)
  - [`cz-cli ng-adapt-project`](#cz-cli-ng-adapt-project)

## `cz-cli add-linting`

add linting to a repository using typescript

```
USAGE
  $ cz-cli add-linting

OPTIONS
  -h, --help         show CLI help
  -i, --interactive  launch the cli in interactive mode
  --prettify         format all (compatible) files using prettier

EXAMPLE
  $ cz-cli add-linting --interactive
```

## `cz-cli create-ap-types`

create types from an application profile

```
USAGE
  $ cz-cli create-ap-types

OPTIONS
  -h, --help       show CLI help
  --apName=apName
  --init
  --verbose

EXAMPLE
  $ cz-cli create-ap-types
```

## `cz-cli create-ng-library`

create an angular library

```
USAGE
  $ cz-cli create-ng-library

OPTIONS
  -h, --help  show CLI help

EXAMPLE
  $ cz-cli create-ng-library
```

## `cz-cli help [COMMAND]`

display help for cz-cli

```
USAGE
  $ cz-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src\commands\help.ts)_

## `cz-cli ng-adapt-project`

create an angular library

```
USAGE
  $ cz-cli ng-adapt-project

OPTIONS
  -h, --help                       show CLI help
  -i, --interactive
  -p, --project=project
  --backendPort=backendPort
  --backendRootApi=backendRootApi

EXAMPLE
  $ cz-cli ng-adapt-application
```

<!-- commandsstop -->
