// app/controller/auth.js
const Controller = require('egg').Controller
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
class DemoController extends Controller {
  async get () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const res = await ctx.model.Project.find({ _id: ObjectId(_id) })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async getAll () {
    const { ctx } = this
    const { username } = ctx.request.body
    try {
      const res = await ctx.model.Project.find({ username })
      ctx.finish(true, res)
    } catch (error) {
      console.log(error.message)
      ctx.finish(false, error.message)
    }
  }

  async delete () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const res = await ctx.model.Project.remove({ _id: ObjectId(_id) })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async create () {
    const { ctx } = this
    const { username, projectName, ...rest } = ctx.request.body
    const hasItem = await ctx.model.Project.find({ username, projectName })
    if (hasItem.length > 0) {
      ctx.finish(false, '该项目已存在，请修改项目名')
      return
    }
    try {
      const res = await ctx.model.Project.create({ username, projectName, ...rest })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async update () {
    const { ctx } = this
    const { _id, ...rest } = ctx.request.body
    console.log(rest)
    try {
      const res = await ctx.model.Project.findOneAndUpdate({ _id: ObjectId(_id) }, { ...rest }, { new: true })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }
}

module.exports = DemoController
