## MyDefine

The tool for define aliases to often used git repositories.

## Install

```sh
$ npm i -g myd
```

## Usage

#### Define `shortcode` to `expression`.

```sh
$ myd define shortcode expression
```

#### Delete `shortcode`.

```sh
$ myd delete shortcode
```

#### Show your shortcodes list.

```sh
$ myd list
```

#### Run command `git clone [expression] [arguments]` for your `shortcode`.

```sh
$ myd cl shortcodes arguments
```

## Examples

#### Setting `pug` shortcode for my `pug-template` repository.

```sh
$ myd define pug https://github.com/Th0rN13/pug-template
```

- git clone my template pug-template

```sh
$ myd cl pug
```
