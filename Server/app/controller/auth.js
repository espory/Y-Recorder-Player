// app/controller/auth.js
const { md5Pwd } = require('../common/helper')
const Controller = require('egg').Controller
class AuthController extends Controller {
  async login () {
    // const { username, password } = ctx.request.body
    const { ctx } = this
    const { username, password } = ctx.request.body
    const res = await ctx.model.User.find({ username })
    if (res.length > 0 && res[0].password === md5Pwd(password)) {
      // 生成token
      const token = await ctx.getToken(username)
      const { projects } = res[0]
      console.log(res[0])
      ctx.finish(true, { access_token: token, username, projects })
    } else {
      ctx.finish(false)
    }
  }

  async register () {
    const { ctx } = this
    const { username, password } = ctx.request.body
    const hasUser = await ctx.model.User.find({ username })
    if (hasUser.length > 0) {
      ctx.finish(false, { msg: '该用户已存在' })
      return
    }
    const res = await ctx.model.User.create({ username, password: md5Pwd(password) })
    if (res) {
      const token = await ctx.getToken(username)
      ctx.finish({ access_token: token })
    } else {
      ctx.finish(false)
    }
  }
}

module.exports = AuthController
