#!/usr/bin/env node

let someUtils = require('./../lib/index');
let runCLI = require('child_process').execSync;
let packageJSON = require('./../package.json');
let args = process.argv.splice(process.execArgv.length + 2);

let defines = [];

console.log(`\x1b[93mMyDefine \x1b[95mv${packageJSON.version}\x1b[0m`);

const main = async () => {
  defines = await someUtils.read();
  if (defines && defines.length === 0) {
    defines = [{ "name": "myd", "define": "https://github.com/Th0rN13/myd.git"}]
    await someUtils.write(defines);
    defines = await someUtils.read();
  }
  //console.log(`Defines: ${defines} ${typeof defines}`)
  switch (args[0] && args[0].toLowerCase()) {
    case 'define':
      if (args[1] && args[2]) {
        let find = defines.findIndex((el) => (args[1].toLowerCase() === el.name))
        if (find >= 0) {
          console.log(`\x1b[95mChange define: \x1b[93m${args[1]}\x1b[0m to \x1b[92m${args[2]}\x1b[0m`);
          defines[find] = { 'name': args[1], 'define': args[2] };
          await someUtils.write(defines);
        } else {
          console.log(`\x1b[95mNew define: \x1b[93m${args[1]}\x1b[0m for \x1b[92m${args[2]}\x1b[0m`);
          defines.push({ 'name': args[1], 'define': args[2] });
          await someUtils.write(defines);
        }

      } else {
        console.log('Need 2 arguments to define');
      }
      break;
    case 'delete':
    case 'remove':
      if (args[1]) {
        console.log(`\x1b[95mTry to delete define: \x1b[93m${args[1]}\x1b[0m`);
        let find = defines.findIndex( (el) => (args[1].toLowerCase() === el.name))
        if (find >= 0) {
          console.log(`\x1b[95mDelete define: \x1b[93m${defines[find].name}\x1b[0m equal to \x1b[92m${defines[find].define}\x1b[0m`);
          defines.splice(find, 1);
          await someUtils.write(defines);
        } else {
          console.log(`\x1b[95mDefine with name \x1b[93m${args[1]}\x1b[95m not found\x1b[0m`);
        }
      } else {
        console.log('Need [def] argument to delete');
      }
      break;
    case 'list':
      if (args[1]) {
        console.log(`List defines with name: ${args[1]}`);
        defines.forEach((el) => {
          if (el.name.includes(args[1].toLowerCase())) {
            console.log(`Define \x1b[93m${el.name}\x1b[0m is equal for \x1b[92m${el.define}\x1b[0m`)
          }
        });
        //defines.push({ 'name': args[1], 'define': args[2] });
      } else {
        console.log('\x1b[95mList all defines:\x1b[0m');
        defines.forEach( (el) => {
          console.log(`Define \x1b[93m${el.name}\x1b[0m is equal for \x1b[92m${el.define}\x1b[0m`)
        });
      }
      break;
    case 'cl':
      if (args[1]) {
        console.log(`Run "git clone" for "${args[1]}"`);
        let find = defines.findIndex((el) => (args[1].toLowerCase() === el.name))
        if (find >= 0) {
          console.log(`Define found ${defines[find].name} : ${defines[find].define}`);
          //run cli git
          try {
            runCLI('git clone ' + defines[find].define + " " + args.slice(2).join(' '))
          } catch(e) {
            console.log("Error run git")
          }
        } else {
          console.log(`\x1b[95mDefine with name \x1b[93m${args[1]}\x1b[95m not found\x1b[0m`);
        }
      } else {
        console.log('\x1b[95mList all defines:\x1b[0m');
        defines.forEach((el) => {
          console.log(`Define \x1b[93m${el.name}\x1b[0m is equal for \x1b[92m${el.define}\x1b[0m`)
        });
      }

      break;
    default:
      console.log('Help: use \x1b[92mmyd define [def] [expression] \x1b[0m to define');
      console.log('      --- \x1b[92mmyd delete [def]              \x1b[0m to delete define');
      console.log('      --- \x1b[92mmyd list                      \x1b[0m to list defines');
      console.log('      --- \x1b[92mmyd cl [def]                  \x1b[0m to run \x1b[92m"git clone [def]"\x1b[0m');
  }
}

main()
