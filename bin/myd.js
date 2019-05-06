#!/usr/bin/env node

// let myLibrary = require('../lib/index.js');
let packageJSON = require('./../package.json');

console.log(`MyDefine v${packageJSON.version}`);

let args = process.argv.splice(process.execArgv.length + 2);

for (let i = 0; i < args.length; i++) {
  console.log(`${i}: ${args[i]}`);
}
