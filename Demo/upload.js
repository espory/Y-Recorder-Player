// const compressing = require('compressing');
// const needle = require('needle');
// const sftpFiles = require('./sftpFiles');
// const fs = require('fs');
// const path = require('path');
// const hostList = [ '47.117.122.40:80' ]; // [ aplus ]
// const distFileNameList = fs.readdirSync('./dist');
// let sourcePathList = distFileNameList.filter(str => (/^commons.|^markdown./.test(str)));
// sourcePathList = sourcePathList.map(fileName => (path.join('./dist/', fileName)));
// const distDir = '/var/www/html/aplusFiles';
// const config = {
//   host: 'aplus2.y-droid.com',
//   username: 'aplus',
// };
// async function deploy() {
//   try {
//     sftpFiles(sourcePathList, distDir, config);
//     await compressing.zip.compressDir('./dist', './source.gz', { ignoreBase: true });
//     const data = {
//       file: { file: './source.gz', content_type: 'application/x-gzip' },
//     };
//     await Promise.all(hostList.map(host => {
//       return needle.post(`${host}/upload`, data, { multipart: true });
//     }));
//     fs.unlinkSync('./source.gz');
//   } catch (e) {
//     console.log(e);
//   }
// }

// deploy();
