const md5 = require('md5')
const salt = 'y-record'
function md5Pwd (source) {
  return md5(`${source}${salt}`)
}

// export const STATUS = {
//   SUCCESS: 1000,
//   FAILD: 2000
// }

module.exports = {
  md5Pwd
}
