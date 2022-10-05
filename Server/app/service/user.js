// app/service/user.js
const Service = require('egg').Service

class UserService extends Service {
  async find (username) {
    try {
      return await this.ctx.model.User.find({ username })
    } catch (error) {
      throw new Error(error)
    }
  }

  async create ({ username, password }) {
    try {
      return await this.ctx.model.User.create({ username, password })
    } catch (error) {
      throw new Error(error)
    }
  }

  async update (oldData, newData) {
    try {
      return await this.ctx.model.User.findOneAndUpdate(oldData, newData, { new: true })
    } catch (error) {
      throw new Error(error)
    }
  }

  async delete (username) {
    try {
      return await this.ctx.model.User.remove({ username })
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = UserService
