# vscode-prettier-on-save README

This is the README for the extension "vscode-prettier-on-save".

## Features

Simple VSCode extension to format individual files on save with the 'prettier' command. If prettier is not installed or not found, it reverts to "npx prettier@latest".

## Requirements

- node.js is required
- vsce is required

`npm install -g @vscode/vsce`

- prettier is optional but recommended

`npm install -g prettier@latest`

You can check by running "prettier" in cmd on windows or terminal on mac. If prettier is not installed this extension will still work via npx.

## Installation

1. Run `cd /path/to/vscode-prettier-on-save`
2. Run `vsce package`
3. In VSCode, Extensions -> ... -> Install from VSIX...
4. Select generated .vsix file

## Extension Settings

No extension settings

## Known Issues

- It does not yet make use of the "editor.defaultFormatter" setting
- You cannot yet configure which file types are formatted on save
- You cannot yet configure prettier via this extension, however configuration can be done via your local prettier installation
