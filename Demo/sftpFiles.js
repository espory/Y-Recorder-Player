const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require('path');

module.exports = async function sftpFiles(sourcePathList, distDir, config) {

  const sftp = new Client();
  sftp
    .connect(config)
    .then(() => {
      const resList = sourcePathList.map(source => {
        return sftp.put(fs.createReadStream(source), path.join(distDir, path.basename(source)));
      });
      return Promise.all(resList);
    })
    .then(() => {
      return sftp.end();
    })
    .catch(err => {
      console.error(err.message);
    });
};
