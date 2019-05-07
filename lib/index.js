const fs = require('fs')

const storageFile = `${__dirname}\\..\\defines.json`

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
    JSON.stringify(data),
    (err, written) => err ? reject(err) : resolve(written)
  )
})

export { read, write }

module.exports = { read, write }
