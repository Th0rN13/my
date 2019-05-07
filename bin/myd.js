#!/usr/bin/env node

const runCLI = require('child_process').execSync
const someUtils = require('./../lib/index')
const packageJSON = require('./../package.json')

const argsStart = 2
const args = process.argv.splice(process.execArgv.length + argsStart)

let defines = []

console.log(`\u001B[93mMyDefine \u001B[95mv${packageJSON.version}\u001B[0m`)

const main = async () => {
  defines = await someUtils.read()
  if (defines && defines.length === 0) {
    defines = [{ 'name': 'myd', 'define': 'https://github.com/Th0rN13/myd.git'}]
    await someUtils.write(defines)
    defines = await someUtils.read()
  }
  // console.log(`Defines: ${defines} ${typeof defines}`)
  switch (args[0] && args[0].toLowerCase()) {
    case 'define':
      if (args[1] && args[2]) {
        const find = defines.findIndex((el) => (args[1].toLowerCase() === el.name))
        if (find >= 0) {
          console.log(`\u001B[95mChange define: \u001B[93m${args[1]}\u001B[0m to \u001B[92m${args[2]}\u001B[0m`)
          defines[find] = { 'name': args[1], 'define': args[2] }
          await someUtils.write(defines)
        } else {
          console.log(`\u001B[95mNew define: \u001B[93m${args[1]}\u001B[0m for \u001B[92m${args[2]}\u001B[0m`)
          defines.push({ 'name': args[1], 'define': args[2] })
          await someUtils.write(defines)
        }

      } else {
        console.log('Need 2 arguments to define')
      }
      break
    case 'delete':
    case 'remove':
      if (args[1]) {
        console.log(`\u001B[95mTry to delete define: \u001B[93m${args[1]}\u001B[0m`)
        const find = defines.findIndex( (el) => (args[1].toLowerCase() === el.name))
        if (find >= 0) {
          console.log(`\u001B[95mDelete define: \u001B[93m${defines[find].name}\u001B[0m equal to \u001B[92m${defines[find].define}\u001B[0m`)
          defines.splice(find, 1)
          await someUtils.write(defines)
        } else {
          console.log(`\u001B[95mDefine with name \u001B[93m${args[1]}\u001B[95m not found\u001B[0m`)
        }
      } else {
        console.log('Need [def] argument to delete')
      }
      break
    case 'list':
      if (args[1]) {
        console.log(`List defines with name: ${args[1]}`)
        defines.forEach((el) => {
          if (el.name.includes(args[1].toLowerCase())) {
            console.log(`Define \u001B[93m${el.name}\u001B[0m is equal for \u001B[92m${el.define}\u001B[0m`)
          }
        })
        // defines.push({ 'name': args[1], 'define': args[2] });
      } else {
        console.log('\u001B[95mList all defines:\u001B[0m')
        defines.forEach( (el) => {
          console.log(`Define \u001B[93m${el.name}\u001B[0m is equal for \u001B[92m${el.define}\u001B[0m`)
        })
      }
      break
    case 'cl':
      if (args[1]) {
        console.log(`Run "git clone" for "${args[1]}"`)
        const find = defines.findIndex((el) => (args[1].toLowerCase() === el.name))
        if (find >= 0) {
          console.log(`Define found ${defines[find].name} : ${defines[find].define}`)
          // run cli git
          try {
            runCLI(`git clone ${defines[find].define} ${args.slice(argsStart).join(' ')}`)
          } catch(error) {
            console.log('Error run git')
          }
        } else {
          console.log(`\u001B[95mDefine with name \u001B[93m${args[1]}\u001B[95m not found\u001B[0m`)
        }
      } else {
        console.log('\u001B[95mList all defines:\u001B[0m')
        defines.forEach((el) => {
          console.log(`Define \u001B[93m${el.name}\u001B[0m is equal for \u001B[92m${el.define}\u001B[0m`)
        })
      }

      break
    default:
      console.log('Help: use \u001B[92mmyd define [def] [expression] \u001B[0m to define')
      console.log('      --- \u001B[92mmyd delete [def]              \u001B[0m to delete define')
      console.log('      --- \u001B[92mmyd list                      \u001B[0m to list defines')
      console.log('      --- \u001B[92mmyd cl [def]                  \u001B[0m to run \u001B[92m"git clone [def]"\u001B[0m')
  }
}

main()
