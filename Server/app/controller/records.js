// app/controller/auth.js
const Controller = require('egg').Controller
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const fs = require('fs/promises')
const path = require('path')
const HOME = process.env.HOME
const filesDir = path.join(HOME, 'yrecord_files')
class RecordController extends Controller {
  async getAll () {
    const { ctx } = this
    const { projectId } = ctx.request.body
    try {
      const res = await ctx.model.Record.find({ projectId })
      ctx.finish(true, res)
    } catch (error) {
      console.log(error.message)
      ctx.finish(false, error.message)
    }
  }

  async get () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const res = await ctx.model.Record.find({ _id: ObjectId(_id) })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async getTime () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const data = await ctx.model.Record.find({ _id: ObjectId(_id) })
      if (data.length) {
        const { startTime } = data[0]
        // const { fetchRecord } = snapshot

        ctx.finish(true, startTime)
      } else {
        throw new Error('无数据')
      }
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async delete () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const res = await ctx.model.Record.remove({ _id: ObjectId(_id) })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async create () {
    const { ctx } = this
    const { username, project, ...rest } = ctx.request.body
    console.log(rest)
    try {
      const res = await ctx.model.Record.create({ username, project, ...rest })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async update () {
    const { ctx } = this
    const { _id, ...rest } = ctx.request.body
    console.log(ctx.request.body)
    try {
      const res = await ctx.model.Record.findOneAndUpdate({ _id: ObjectId(_id) }, { ...rest }, { new: true })
      ctx.finish(true, res)
    } catch (error) {
      ctx.finish(false, error.message)
    }
  }

  async getFetchRecord () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const data = await ctx.model.Record.find({ _id: ObjectId(_id) })
      if (data.length) {
        const { fetchRecord } = data[0]
        // const { fetchRecord } = snapshot

        ctx.finish(true, fetchRecord)
      } else {
        throw new Error('无数据')
      }
    } catch (error) {
      console.error(error)
      ctx.finish(false, error.message)
    }
  }

  async getFiles () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const data = await ctx.model.Record.find({ _id: ObjectId(_id) })
      if (data.length) {
        const { files } = data[0]
        // const { fetchRecord } = snapshot

        ctx.finish(true, files)
      } else {
        throw new Error('无数据')
      }
    } catch (error) {
      console.error(error)
      ctx.finish(false, error.message)
    }
  }

  async insertFetchRecord () {
    const { ctx } = this
    const { _id, k, v } = ctx.request.body
    try {
      const data = await ctx.model.Record.find({ _id: ObjectId(_id) })
      if (data.length) {
        const { fetchRecord } = data[0]
        // const { fetchRecord } = snapshot
        if (k in fetchRecord) {
          fetchRecord[k].push(v)
        } else {
          fetchRecord[k] = [v]
        }
        const res = await ctx.model.Record.findOneAndUpdate({ _id: ObjectId(_id) }, { fetchRecord }, { new: true })
        ctx.finish(true, res)
      } else {
        throw new Error('无数据')
      }
    } catch (error) {
      console.error(error)
      ctx.finish(false, error.message)
    }
  }

  async clear () {
    const { ctx } = this
    const { _id } = ctx.request.body
    try {
      const data = await ctx.model.Record.find({ _id: ObjectId(_id) })
      if (data.length) {
        // const { snapshot } = data[0]
        await ctx.model.Record.findOneAndUpdate({ _id: ObjectId(_id) }, { fetchRecord: {}, files: [] }, { new: true })
        ctx.finish(true)
      } else {
        throw new Error('无数据')
      }
    } catch (error) {
      console.error(error)
      ctx.finish(false, error.message)
    }
  }

  async upload () {
    const { ctx } = this
    const { _id } = ctx.request.body
    const { files } = ctx.request
    try {
      const data = await ctx.model.Record.find({ _id: ObjectId(_id) })
      if (data.length) {
        const { files: files_ } = data[0]
        const newFiles = files_
        for (const file of files) {
          const { filepath, field, filename } = file
          const temp = filename.split('.')
          let destName = field
          if (temp.length > 1) {
            destName = `${field}.${temp[1]}`
          }
          fs.copyFile(filepath, path.join(filesDir, destName))
          newFiles.push(destName)
        }
        await ctx.model.Record.findOneAndUpdate({ _id: ObjectId(_id) }, { files: newFiles }, { new: true })
        ctx.finish(true, newFiles)
      } else {
        throw new Error('无数据')
      }
    } catch (error) {
      console.error(error)
      ctx.finish(false, error.message)
    }
  }
}

module.exports = RecordController
