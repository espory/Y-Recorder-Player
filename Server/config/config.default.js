/* eslint valid-jsdoc: "off" */

'use strict'

const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = module.exports = {
  }

  config.bodyParser = {
    jsonLimit: '50mb',
    formLimit: '50mb'
  }
  config.mongoose = {
    client: {
      url: 'mongodb://101.43.119.45:27017/yrecord',
      options: {
        user: 'yrecord',
        pass: 'curidemo'
      }
    }
  }
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.HOME, 'yrecord_files'),
    dynamic: true, // 如果当前访问的静态资源没有缓存，则缓存静态文件，和`preload`配合使用；
    preload: false,
    maxAge: 31536000, // in prod env, 0 in other envs
    // 修改为false
    buffer: false // in prod env, false in other envs
  }

  // 开启gzip压缩
  config.compress = {
    threshold: 2048, // 2K
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    br: false // disable brotli
  }

  config.multipart = {
    fileSize: '50mb',
    mode: 'file',
    whitelist: [
      '.dump',
      '.js',
      '.css',
      '.png',
      '.xls',
      '.xlsx',
      '.csv',
      '.ppt',
      '.pptx',
      '.doc',
      '.docx',
      '.jpg',
      '.jpeg',
      '.pdf',
      '.md',
      '.json',
      '.gz',
      '.zip',
      '.bib'
    ]
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://localhost:3000']
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650422725448_6697'

  // add your middleware config here
  config.middleware = []

  config.security = {
    csrf: {
      enable: false
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.jwt = {
    secret: 'curidemo' // 自定义 token 的加密条件字符串
  }

  return {
    ...config,
    ...userConfig
  }
}
