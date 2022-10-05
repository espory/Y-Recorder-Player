// app/middleware/auth.js
module.exports = () => {
  return async function (ctx, next) {
    let token = ''
    if (
      ctx.headers.authorization && ctx.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = ctx.headers.authorization.split(' ')[1]
    } else if (ctx.query.accesstoken) {
      token = ctx.query.accesstoken
    } else if (ctx.request.body.accesstoken) {
      token = ctx.request.body.accesstoken
    }
    let user
    try {
      user = await ctx.checkToken(token)
      console.log(user)
    } catch (e) {
      ctx.finish(false, 'Token 无效，请重新登录')
    }
    if (!user) {
      ctx.finish(false, 'Token 无效，请重新登录')
      return
    }
    ctx.request.user = user
    await next()
  }
}
