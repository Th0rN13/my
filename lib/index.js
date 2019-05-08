const fs = require('fs')
const homeDir = require('os').homedir()

const storageFile = `${homeDir}\\.myd_defs`
const JSONSpace = 2

const read = () => new Promise((resolve) => {
  fs.readFile(storageFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error read file')
      return resolve([])
    }
    let parsed

    try {
      parsed = JSON.parse(data)
    } catch (error) {
      console.error(`Error parsing file: ${error}`)
      parsed = []
    }

    return resolve(parsed)
  })
})

const write = (data) => new Promise((resolve, reject) => {
  fs.writeFile(
    storageFile,
    JSON.stringify(data, null, JSONSpace),
    (err, written) => err ? reject(err) : resolve(written)
  )
})

module.exports = { read, write }
