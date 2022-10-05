'use strict'

module.exports = app => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema

  const UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    projects: {
      type: Array,
      default: [{
        name: 'Aplus',
        detail: 'Aplus 是一个服务于老师同学的科研论文管理系统'
      }],
      required: true
    }
  }, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })
  return mongoose.model('User', UserSchema)
}
