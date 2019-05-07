## MyDefine

Tool for define shortcodes for often used repositories

## Install

npm i -g myd

## Usage

`myd define \[shortcode\] \[expression\]` - define `\[shortcode\]` to `\[expression\]`

`myd delete \[shortcode\]` - delete `\[shortcode\]`

`myd list`  - show list of your shortcodes

`myd cl \[shortcodes\] \[arguments\]` - for your `\[shortcode\]` run command `git clone \[expression\] \[arguments\]`

**Examples**

`myd define pug https://github.com/Th0rN13/pug-template` - set `pug` shortcode for my template

`myd cl pug` - git clone my template pug-template