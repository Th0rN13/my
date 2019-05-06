//Some utils
let fs = require('fs');
const defineFilePath = __dirname + '\\..\\defines.json';

const read = () => {
  return new Promise( (resolve, reject) => {
    fs.readFile(defineFilePath, 'utf8', (err, data) => {
      if (err) {
        console.log('Error read file');
        resolve([]);
      } else {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          console.log(`Error parsing file: ${e}`)
          parsed = [];
        }
        resolve(parsed);
      }
    })
  })
}

const write = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(defineFilePath, JSON.stringify(data), (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    })
  })

}

exports.read = read;
exports.write = write;
