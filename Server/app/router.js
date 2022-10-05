'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { controller, router } = app
  router.get('/', controller.home.index)

  // auth
  router.post('/auth/register', controller.auth.register)
  router.post('/auth/login', controller.auth.login)

  // projects
  router.post('/projects/get', app.jwt, controller.projects.get)
  router.post('/projects/getAll', app.jwt, controller.projects.getAll)
  router.post('/projects/delete', app.jwt, controller.projects.delete)
  router.post('/projects/create', app.jwt, controller.projects.create)
  router.post('/projects/update', app.jwt, controller.projects.update)

  // record
  router.post('/records/get', app.jwt, controller.records.get)
  router.post('/records/getAll', app.jwt, controller.records.getAll)
  router.post('/records/delete', app.jwt, controller.records.delete)
  router.post('/records/create', app.jwt, controller.records.create)
  router.post('/records/update', app.jwt, controller.records.update)

  router.post('/records/getFetchRecord', app.jwt, controller.records.getFetchRecord)
  router.post('/records/clear', app.jwt, controller.records.clear)
  router.post('/records/insertFetchRecord', app.jwt, controller.records.insertFetchRecord)

  router.post('/records/upload', app.jwt, controller.records.upload)
  router.post('/records/getFiles', app.jwt, controller.records.getFiles)
  router.post('/records/getTime', app.jwt, controller.records.getTime)
  // 只有在需要验证 token 的路由上添加jwt
  // router.post('/user/info', jwt, controller.user.info)
}
