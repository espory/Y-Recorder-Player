const path = require('path');

module.exports = {
  mode:'development',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: 'yrecord.js',
    path: path.resolve(__dirname, '../dist')
  }
}